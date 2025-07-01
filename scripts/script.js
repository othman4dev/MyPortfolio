let index = 1;

let lang = localStorage.getItem('lang') || 'en';

function scrollDownIntoView(btn, element) {
  if (index === 6) {
    notify("bi-whatsapp", lang == "en" ? "For emergency, contact me on WhatsApp." : "Pour urgence, contacte-moi sur WhatsApp.");
  }
  if (index === 1) {
    notify(
      "bi-question-circle-fill",
      lang == "en" ?
      "I can learn any new technologie easily and quickly." : "Pour urgence, contacte-moi sur WhatsApp."
    );
  }
  if (index == 2) {
    notify("bi-info-circle-fill", lang == "en" ? "I am always working on new projects" : "Je travaille toujours sur de nouveaux projets.");
    selectCard(document.getElementById("more-projects"));
  }
  const section = document.getElementById(`section${element}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index++;
  if (index === 7) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }
  if (index > 1) {
    document.getElementById("up").style.display = "block";
  }
  btn.onclick = () => scrollDownIntoView(btn, element + 1);
  document.getElementById("up").onclick = () =>
    scrollUpIntoView(document.getElementById("up"), element - 1);
  document.getElementById("lens-effect").style.animationDirection = "reverse";
  document.getElementById("lens-effect").style.animationName = "lens-effect";
  setTimeout(() => {
    document.getElementById("lens-effect").style.animationName = "none";
  }, 600);
  indexDown();
}

function scrollUpIntoView(btn, element) {
  const section = document.getElementById(`section${element}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index--;
  if (index === 1) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }
  if (index < 7) {
    document.getElementById("down").style.display = "block";
  }
  btn.onclick = () => scrollUpIntoView(btn, element - 1);
  document.getElementById("down").onclick = () =>
    scrollDownIntoView(document.getElementById("down"), element + 1);
  document.getElementById("lens-effect").style.animationDirection = "normal";

  document.getElementById("lens-effect").style.animationName = "lens-effect";
  setTimeout(() => {
    document.getElementById("lens-effect").style.animationName = "none";
  }, 600);
  indexDown();
}

function indexDown() {
  const indexes = lang == 'en' ? [
    "PROFILE",
    "ABOUT",
    "PROJECTS",
    "EXPERIENCE",
    "SERVICES",
    "STATS",
    "CONTACT",
  ] : [
    "PROFIL",
    "À PROPOS",
    "PROJETS",
    "EXPÉRIENCE",
    "SERVICES",
    "STATS",
    "CONTACT"
  ];
  document.getElementById("index").innerHTML = indexes[index - 1];
  if (index > 1 && index < 7) {
    if (document.getElementById("lineFull2")) {
      document.getElementById("lineFull2").outerHTML = lang == "en" ? `
                <div class="line-half" id="lineHalf2">
                    <div class="next-index"></div>
                    <p class="next-index-text index-text" id="next-index">HOME</p>
                </div>
            ` : `
                <div class="line-half" id="lineHalf2">
                    <div class="next-index"></div>
                    <p class="next-index-text index-text" id="next-index">Acceuil</p>
                </div>
            `;
    }
    if (document.getElementById("lineFull")) {
      document.getElementById("lineFull").outerHTML = lang == "en" ? `
                <div class="line-half-prev" id="lineHalf">
                    <div class="prev-index"></div>
                    <p class="prev-index-text index-text" id="prev-index">HOME</p>
                </div>
            ` : `
                <div class="line-half-prev" id="lineHalf">
                    <div class="prev-index"></div>
                    <p class="prev-index-text index-text" id="prev-index">Acceuil</p>
                </div>
            `;
    }
    document.querySelector("#prev-index").innerText = indexes[index - 2];
    document.querySelector("#next-index").innerText = indexes[index];

    document.querySelectorAll(".index-text").forEach((el) => {
      el.style.animationName = "index-text-animation";
    });
    setTimeout(() => {
      document.querySelectorAll(".index-text").forEach((el) => {
        el.style.animationName = "none";
      });
    }, 301);
  } else if (index > 6) {
    if (document.getElementById("lineHalf")) {
      document.getElementById("lineHalf2").outerHTML = `
                <div class="line-full" id="lineFull2"></div>
            `;
    }
    document.querySelector("#prev-index").innerText = indexes[index - 2];
    document.querySelector("#next-index").innerText = "CONTACT";
    document.querySelectorAll(".index-text").forEach((el) => {
      el.style.animationName = "index-text-animation";
    });
    setTimeout(() => {
      document.querySelectorAll(".index-text").forEach((el) => {
        el.style.animationName = "none";
      });
    }, 301);
  } else {
    if (document.getElementById("lineHalf")) {
      document.getElementById("lineHalf").outerHTML = `
                <div class="line-full" id="lineFull"></div>
            `;
    }
    if (index == 1) {
      document.querySelector("#next-index").innerText = "ABOUT";
    } else {
      document.querySelector("#prev-index").innerText = indexes[index - 2];
      document.querySelector("#next-index").innerText = indexes[index];
    }
  }

  document.querySelectorAll(".index-text").forEach((el) => {
    el.style.animationName = "index-text-animation";
  });
  setTimeout(() => {
    document.querySelectorAll(".index-text").forEach((el) => {
      el.style.animationName = "none";
    });
  }, 301);
}

// call the function scrollDownIntoView() when whell event is triggered

document.addEventListener("wheel", (e) => {
  if (window.innerWidth < 828) {
    return;
  }
  if (e.deltaY > 0 && index < 7) {
    document.getElementById("down").click();
  } else if (e.deltaY < 0 && index > 1) {
    document.getElementById("up").click();
  }
});

// call the function scrollDownIntoView() when keydown event is triggered

document.addEventListener("keydown", (e) => {
  if (window.innerWidth < 828) {
    return;
  }
  if (e.key === "ArrowDown" && index < 7) {
    document.getElementById("down").click();
  } else if (e.key === "ArrowUp" && index > 1) {
    document.getElementById("up").click();
  }
});

// on window load , go to view section 1 mandatory

if (window.innerWidth > 828) {
  const section = document.getElementById(`section1`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function searchTechs(input) {
  var filter, techs, i, imgElement, txtValue;
  filter = input.value.toUpperCase();
  techs = document.getElementById("searchResult").children; // Assuming the container has children

  for (i = 0; i < techs.length; i++) {
    // Assuming each 'tech' container has an 'img' element
    imgElement = techs[i].querySelector("img"); // Find the image element inside the container

    if (imgElement) {
      // Check if img exists
      txtValue = imgElement.getAttribute("alt"); // Get the alt text

      if (txtValue && txtValue.toUpperCase().indexOf(filter) > -1) {
        techs[i].style.display = ""; // Show the container
      } else {
        techs[i].style.display = "none"; // Hide the container
      }
    }
  }
}

const all = document.querySelectorAll(".card");

window.addEventListener("mousemove", (ev) => {
  all.forEach((e) => {
    const blob = e.querySelector(".blob");
    const fblob = e.querySelector(".fakeblob");
    const rec = fblob.getBoundingClientRect();
    blob.style.opacity = "1";

    blob.animate(
      [
        {
          transform: `translate(${ev.clientX - rec.left - rec.width / 2}px,${
            ev.clientY - rec.top - rec.height / 2
          }px)`,
        },
      ],
      {
        duration: 300,
        fill: "forwards",
      }
    );
  });
});

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(
    function () {
      btn.innerHTML = lang == "en" ? "Copied <i class='bi bi-clipboard-check'></i>" : "Copié <i class='bi bi-clipboard-check'></i>";
      setTimeout(() => {
        btn.innerHTML = lang == "en" ? "Copy Email <i class='bi bi-clipboard'></i>" : "Copier l'Email <i class='bi bi-clipboard'></i>";
      }, 1000);
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function toSection(index2) {
  let clickCount = index2 - index;
  if (clickCount > 0) {
    for (let i = 0; i < clickCount; i++) {
      document.getElementById("down").click();
    }
  } else {
    for (let i = 0; i < Math.abs(clickCount); i++) {
      document.getElementById("up").click();
    }
  }
}
function selectCard(card) {
  card.style.animationDelay = "0.7s";
  card.style.animationDuration = "0.8s";
  card.style.animationName = "select-card";
  setTimeout(() => {
    card.style.animationName = "none";
  }, 1500);
}
function checkIfUserWithPhoneOrTablet() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    if (window.innerWidth < 828 && window.innerHeight < 680) {
      notify(
        "bi-pc-display",
        lang == 'en' ? "For the best experience, visit this website from a computer or a laptop." : "Pour une meilleure expérience, visitez ce site depuis un ordinateur ou un portable."
      );
    }
  }
}

window.onload = () => {
  checkIfUserWithPhoneOrTablet();
};
// window.addEventListener("resize", () => {
//   checkIfUserWithPhoneOrTablet();
// });

function makeNotification(icon, message, id) {
  return `
  <div class="notification type-${icon}" id ="${id}" style="animation-name: notification">
      <div class="warning-header">
        <i class="bi ${icon}"></i>
      </div>
      <p class="warning-text">
        ${message}
      </p>
      <button class="note-close" onclick="this.parentNode.remove()">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  `;
}

const notificationContainer = document.getElementById("notification-container");

function notify(icon, message) {
  if (document.querySelectorAll(`.type-${icon}`).length > 0) {
    return;
  }
  let id = "id" + Math.floor(Math.random() * 1000);
  let notificationHTML = makeNotification(icon, message, id);
  let tempDiv = document.createElement("div");
  tempDiv.classList.add("notification");
  tempDiv.innerHTML = notificationHTML.trim();
  let notificationElement = tempDiv.firstChild;

  notificationContainer.insertAdjacentElement(
    "afterbegin",
    notificationElement
  );

  setTimeout(() => {
    notificationElement.style.animationName = "none";
    notificationElement.style.animationName = "notification-close";
    notificationElement.remove();
  }, 5001);
}

// setTimeout(() => {
//   notify("bi-emoji-smile-fill", "Welcome to my portfolio");
// }, 1000);
setTimeout(() => {
  notify(
    "bi-puzzle-fill",
    lang == "en" ? "If you like this website and want to use it, contact me and we can make a deal." : "Si ce site vous plaît et que vous souhaitez l’utiliser, contactez-moi et on peut faire un accord."
  );
}, 40000);

function checkResolutionAndNotify() {
  if (window.innerHeight > 828 && window.innerHeight > window.innerWidth) {
    notify(
      "bi-arrow-repeat", lang == "en" ?
      "For better experience, please rotate you screen." : "Pour une meilleure expérience, veuillez tourner votre écran."
    );
  } else if (window.innerHeight > 800 && window.innerWidth < 565) {
    notify(
      "bi-info-circle-fill", lang == "en" ?
      "For better experience, visit this website in portrait mode." : "Pour une meilleure expérience, visitez ce site en mode portrait."
    );
  }
}

window.onload = () => {
  checkIfUserWithPhoneOrTablet();
  checkResolutionAndNotify();
};

window.addEventListener("resize", () => {
  checkIfUserWithPhoneOrTablet();
  checkResolutionAndNotify();
});

function openEducation(num) {
  document.getElementById("protection").style.display = "block";
  if (num == 1) {
    document.getElementById("youcode").style.display = "block";
  } else if (num == 2) {
    document.getElementById("codecademy").style.display = "block";
  }
}
function animation() {
  const loader = document.querySelector(".loading-animation");

  const stopAnimation = () => {
    loader.style.display = "none";
  };

  setTimeout(() => {
    loader.innerHTML = lang == 'en' ? `
      <div class="wrapper">
        <div class="typing-demo welcome">
          Welcome to my portfolio.
        </div>
      </div>
      ` : `
      <div class="wrapper">
        <div class="typing-demo2 welcome">
          Bienvenue sur mon portfolio.
        </div>
      </div>
      `;
    let tutorials = localStorage.getItem("tutorial");
    if (tutorials !== "done") {
      setTimeout(() => {
        tutorial();
      }, 3000);
    }
    setTimeout(() => {
      stopAnimation();
    }, 3000);
  }, 1000);
}
animation();

function tutorial() {
  console.log(document.getElementById("tutorial"));
  document.getElementById("tutorial").style.display = "block";
  setTimeout(() => {
    highlightElement(document.getElementById("down"));
  }, 500);
}

var tuto = document.getElementById("step1");
var tutoModal = document.getElementById("tuto-text");
var includes = document.getElementById("includes");
var step = 1;

function nextTuto() {
  localStorage.setItem("tutorial", "done");
  if (step == 1) {
    tutoModal.innerText = lang == 'en' ? `Or use the arrow keys on your keyboard to navigate.` : `Ou utilisez les flèches de votre clavier pour naviguer.`;
    includes.innerHTML = `<img src="./assets/images/arrows2.png" alt="arrow keys" class="includes-img" />`;
    tuto.style.top = "80%";
  } else if (step == 2) {
    includes.innerHTML = "";
    tutoModal.innerText = lang == 'en' ? `You can also use the navbar to navigate.` : "Vous pouvez aussi utiliser la barre de navigation pour naviguer.";
    tuto.style.top = "10%";
    tuto.style.left = "unset";
    tuto.style.right = "-140px";

    document.querySelectorAll(".page").forEach((el) => {
      highlightElement(el);
    });
  } else if (step == 3) {
    tutoModal.innerText = lang == 'en' ? `Watch for the notifications in this corner.` : `Surveillez les notifications dans ce coin.`;
    tuto.style.top = "85%";
    tuto.style.right = "-140px";
    notify("bi-info-circle-fill", lang == 'en' ? "This is a notification" : "Ceci est une notification.");
    highlightElement(document.querySelector(".notification"));
  } else if (step == 4) {
    tuto.style.top = "35%";
    tuto.style.right = "10%";
    toSection(2);
    tutoModal.innerText = lang == 'en' ? `Search here for technologies.` : `Recherchez ici les technologies.`;
    document.getElementById("techno-cards").style.zIndex = "100";
    setTimeout(() => {
      highlightElement(document.getElementById("tech-search"));
      const searshed = "javascript";
      let i = 0;
      const intervalId = setInterval(() => {
        document.getElementById("tech-search").value += searshed[i];
        searchTechs(document.getElementById("tech-search"));
        i++;
        if (i >= searshed.length) {
          clearInterval(intervalId);
        }
      }, 100);
    }, 1000);
  } else {
    document.getElementById("techno-cards").style.zIndex = "1";
    document.getElementById("tech-search").value = "";
    searchTechs(document.getElementById("tech-search"));
    tuto.style.display = "none";
    document.getElementById("tutorial").style.display = "none";
    toSection(1);
  }
  step++;
}

function highlightElement(element) {
  element.style.animationName = "highlight";
  element.style.animationDuration = "1s";
  setTimeout(() => {
    element.style.animationName = "none";
  }, 1000);
}

function skipTuto() {
  localStorage.setItem("tutorial", "done");
  step = 5;
  nextTuto();
}

let langModal = false
function chooseLang() {
  document.getElementById('langModal').style.display = langModal ? 'none' : 'flex';
  langModal = !langModal;
}


async function setLang(lang) {
  if (localStorage.getItem('lang')) {
    localStorage.removeItem('lang');
    localStorage.setItem('lang', lang);
  } else {
    localStorage.setItem('lang', lang);
  }

  notify("bi-globe2", lang === 'fr' ? 'La langue a été définie sur le français' : 'Language has been set to English');

  const response = await fetch(`./lang/${lang}.json`);
  console.log(response);
  const translations = await response.json();
  console.log(translations);
  

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    el.innerHTML = translations[key] || key;
  });

  // Optionally store lang in localStorage
  localStorage.setItem('lang', lang);

}
// Load language from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {

  const savedLang = localStorage.getItem('lang') || 'en';
  document.documentElement.setAttribute("lang", savedLang);

  setLang(savedLang);

});
