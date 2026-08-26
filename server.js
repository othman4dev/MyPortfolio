const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");

const root = __dirname;
const envFile = path.join(root, ".env");
if (fs.existsSync(envFile)) {
  fs.readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const separator = line.indexOf("=");
      if (separator > 0) {
        const key = line.slice(0, separator).trim();
        const value = line.slice(separator + 1).trim();
        if (!process.env[key]) process.env[key] = value;
      }
    });
}
const port = Number(process.env.PORT) || 3000;
const languages = new Set(["en", "fr", "ar"]);
const backupDirectory = path.join(root, "backups");
const adminUser = process.env.ADMIN_USER || "admin";
let adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";
const sessions = new Set();
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(data));
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.cookie || "")
      .split(";")
      .filter(Boolean)
      .map((cookie) => {
        const separator = cookie.indexOf("=");
        return [
          cookie.slice(0, separator).trim(),
          cookie.slice(separator + 1).trim(),
        ];
      }),
  );
}

function verifyPassword(password) {
  return new Promise((resolve) => {
    const [salt, storedKey] = adminPasswordHash.split(":");
    if (!salt || !storedKey || !password) return resolve(false);
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return resolve(false);
      const expected = Buffer.from(storedKey, "hex");
      resolve(
        expected.length === derivedKey.length &&
          crypto.timingSafeEqual(expected, derivedKey),
      );
    });
  });
}

function createPasswordHash(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) return reject(error);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

function isSessionAuthenticated(request) {
  return sessions.has(parseCookies(request).admin_session);
}

async function authenticateApiRequest(request) {
  return verifyPassword(request.headers["x-admin-password"]);
}

function handleLogin(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", async () => {
    try {
      const credentials = JSON.parse(body);
      const valid =
        credentials.username === adminUser &&
        (await verifyPassword(credentials.password));
      if (!valid) {
        sendJson(response, 401, { error: "Invalid credentials" });
        return;
      }
      const session = crypto.randomBytes(32).toString("hex");
      sessions.add(session);
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Set-Cookie": `admin_session=${session}; HttpOnly; SameSite=Strict; Path=/`,
      });
      response.end(JSON.stringify({ authenticated: true }));
    } catch (error) {
      sendJson(response, 400, { error: "Invalid login request" });
    }
  });
}

function handleLogout(request, response) {
  const session = parseCookies(request).admin_session;
  if (session) sessions.delete(session);
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Set-Cookie":
      "admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
  });
  response.end(JSON.stringify({ loggedOut: true }));
}

function handleServerStatus(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
  sendJson(response, 200, { running: true, admin: true });
}

function handlePasswordChange(request, response) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", async () => {
    try {
      const data = JSON.parse(body);
      if (!data.currentPassword || !data.newPassword || data.newPassword.length < 6) {
        return sendJson(response, 400, { error: "Invalid password data" });
      }
      if (!(await verifyPassword(data.currentPassword))) {
        return sendJson(response, 401, { error: "Current password is incorrect" });
      }
      const newHash = await createPasswordHash(data.newPassword);
      const envContent = fs.readFileSync(envFile, "utf8");
      const updatedEnv = envContent.replace(
        /^ADMIN_PASSWORD_HASH=.*$/m,
        `ADMIN_PASSWORD_HASH=${newHash}`,
      );
      fs.writeFile(`${envFile}.tmp`, updatedEnv, "utf8", (writeError) => {
        if (writeError) return sendJson(response, 500, { error: "Could not update .env" });
        fs.rename(`${envFile}.tmp`, envFile, (renameError) => {
          if (renameError) return sendJson(response, 500, { error: "Could not replace .env" });
          adminPasswordHash = newHash;
          sendJson(response, 200, { changed: true });
        });
      });
    } catch (error) {
      sendJson(response, 400, { error: "Invalid password request" });
    }
  });
}

function languageFile(language) {
  return path.join(root, "lang", `${language}.json`);
}

function backupFile(language) {
  return path.join(backupDirectory, `${language}.json`);
}

function readBackups(language, callback) {
  fs.readFile(backupFile(language), "utf8", (error, content) => {
    if (error) return callback(null, []);
    try {
      const backups = JSON.parse(content);
      callback(null, Array.isArray(backups) ? backups : []);
    } catch (parseError) {
      callback(null, []);
    }
  });
}

function writeLanguageFile(language, data, callback) {
  const file = languageFile(language);
  const temporaryFile = `${file}.tmp`;
  fs.writeFile(
    temporaryFile,
    `${JSON.stringify(data, null, 4)}\n`,
    "utf8",
    (writeError) => {
      if (writeError) return callback(writeError);
      fs.rename(temporaryFile, file, callback);
    },
  );
}

function saveBackup(language, currentData, callback) {
  fs.mkdir(backupDirectory, { recursive: true }, (directoryError) => {
    if (directoryError) return callback(directoryError);
    readBackups(language, (readError, backups) => {
      if (readError) return callback(readError);
      const snapshot = JSON.stringify(currentData);
      if (
        backups.length &&
        JSON.stringify(backups[backups.length - 1]) === snapshot
      ) {
        return callback(null);
      }
      backups.push(currentData);
      const trimmedBackups = backups.slice(-3);
      fs.writeFile(
        backupFile(language),
        JSON.stringify(trimmedBackups, null, 2),
        "utf8",
        callback,
      );
    });
  });
}

function undoLanguage(language, response) {
  readBackups(language, (readError, backups) => {
    if (readError || !backups.length) {
      sendJson(response, 404, { error: "No backups available" });
      return;
    }
    const previousData = backups.pop();
    writeLanguageFile(language, previousData, (writeError) => {
      if (writeError) {
        sendJson(response, 500, { error: "Could not restore language file" });
        return;
      }
      fs.writeFile(
        backupFile(language),
        JSON.stringify(backups, null, 2),
        "utf8",
        (backupError) => {
          if (backupError) {
            sendJson(response, 500, {
              error: "Could not update backup history",
            });
            return;
          }
          sendJson(response, 200, {
            undone: true,
            language,
            remaining: backups.length,
          });
        },
      );
    });
  });
}

function handleLanguage(request, response, language) {
  if (!languages.has(language)) {
    sendJson(response, 404, { error: "Unknown language" });
    return;
  }

  const file = languageFile(language);
  if (request.method === "POST" && request.url.endsWith("/undo")) {
    undoLanguage(language, response);
    return;
  }
  if (request.method === "GET") {
    fs.readFile(file, "utf8", (error, content) => {
      if (error)
        return sendJson(response, 500, {
          error: "Could not read language file",
        });
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });
      response.end(content);
    });
    return;
  }

  if (request.method !== "PUT") {
    response.setHeader("Allow", "GET, PUT");
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
    if (body.length > 2 * 1024 * 1024) request.destroy();
  });
  request.on("end", () => {
    try {
      const data = JSON.parse(body);
      if (!data || Array.isArray(data) || typeof data !== "object")
        throw new Error("Invalid JSON object");
      fs.readFile(file, "utf8", (readError, currentContent) => {
        if (readError)
          return sendJson(response, 500, {
            error: "Could not read current language file",
          });
        let currentData;
        try {
          currentData = JSON.parse(currentContent);
        } catch (parseError) {
          return sendJson(response, 500, {
            error: "Current language file is invalid",
          });
        }
        if (JSON.stringify(currentData) === JSON.stringify(data)) {
          return sendJson(response, 200, {
            saved: true,
            language,
            changed: false,
          });
        }
        saveBackup(language, currentData, (backupError) => {
          if (backupError)
            return sendJson(response, 500, {
              error: "Could not create backup",
            });
          writeLanguageFile(language, data, (writeError) => {
            if (writeError)
              return sendJson(response, 500, {
                error: "Could not write language file",
              });
            sendJson(response, 200, { saved: true, language, changed: true });
          });
        });
      });
    } catch (error) {
      sendJson(response, 400, {
        error: "Request must contain a valid JSON object",
      });
    }
  });
}

function serveStatic(request, response, pathname) {
  let requestedPath = pathname === "/" ? "/index.html" : pathname;
  let file = path.normalize(path.join(root, requestedPath));
  if (!file.startsWith(root + path.sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type":
        mimeTypes[path.extname(file).toLowerCase()] ||
        "application/octet-stream",
    });
    fs.createReadStream(file).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(
    request.url,
    `http://${request.headers.host || "localhost"}`,
  );
  if (url.pathname === "/api/admin/login") {
    return handleLogin(request, response);
  }
  if (url.pathname === "/api/admin/logout") {
    return handleLogout(request, response);
  }
  if (url.pathname === "/api/admin/status") {
    return handleServerStatus(request, response);
  }
  if (url.pathname === "/api/admin/password") {
    authenticateApiRequest(request).then((authenticated) => {
      if (!authenticated) return sendJson(response, 401, { error: "Authentication required" });
      handlePasswordChange(request, response);
    });
    return;
  }
  const match = url.pathname.match(
    /^\/api\/lang\/([a-z]{2})\.json(?:\/undo)?$/,
  );
  if (match) {
    authenticateApiRequest(request).then((authenticated) => {
      if (!authenticated) {
        sendJson(response, 401, { error: "Authentication required" });
        return;
      }
      handleLanguage(request, response, match[1]);
    });
    return;
  }
  if (
    url.pathname === "/admin/admin.html" &&
    !isSessionAuthenticated(request)
  ) {
    response.writeHead(302, { Location: "/admin/login.html" });
    response.end();
    return;
  }
  serveStatic(request, response, url.pathname);
});

server.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});
