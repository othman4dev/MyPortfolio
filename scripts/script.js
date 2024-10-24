let index = 1;

function scrollDownIntoView(btn, element) {
  if (index === 5) {
    notify("bi-whatsapp", "I recommend contacting me via whatsapp if urgent.");
  }
  if (index === 3) {
    notify(
      "bi-question-circle-fill",
      "If you come with some new technology and make the right offer, I am ready to learn it."
    );
  }
  if (index == 2) {
    notify("bi-info-circle-fill", "I am always working on something new.");
  }
  const section = document.getElementById(`section${element}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index++;
  if (index === 6) {
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
  if (index < 6) {
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
  document
    .querySelector(".current-sidebar-index")
    .classList.remove("current-sidebar-index");
  document
    .querySelectorAll(".sidebar-index")
    [index - 1].classList.add("current-sidebar-index");
  const indexes = [
    "PROFILE",
    "ABOUT",
    "PROJECTS",
    "SERVICES",
    "STATS",
    "CONTACT",
  ];
  document.getElementById("index").innerHTML = indexes[index - 1];
  if (index > 1 && index < 6) {
    if (document.getElementById("lineFull2")) {
      document.getElementById("lineFull2").outerHTML = `
                <div class="line-half" id="lineHalf2">
                    <div class="next-index"></div>
                    <p class="next-index-text index-text" id="next-index">HOME</p>
                </div>
            `;
    }
    if (document.getElementById("lineFull")) {
      document.getElementById("lineFull").outerHTML = `
                <div class="line-half-prev" id="lineHalf">
                    <div class="prev-index"></div>
                    <p class="prev-index-text index-text" id="prev-index">HOME</p>
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
  } else if (index > 5) {
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
  if (e.deltaY > 0 && index < 6) {
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
  if (e.key === "ArrowDown" && index < 6) {
    document.getElementById("down").click();
  } else if (e.key === "ArrowUp" && index > 1) {
    document.getElementById("up").click();
  }
});

// on window load , go to view section 1 mandatory

// window.onload = () => {
// if (window.innerWidth < 828) {
//   return;
// }
//   const section = document.getElementById(`section1`);
//   section.scrollIntoView({ behavior: "smooth", block: "start" });
// };

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
      btn.innerHTML = "Copied <i class='bi bi-clipboard-check'></i>";
      setTimeout(() => {
        btn.innerHTML = "Copy Email <i class='bi bi-clipboard'></i>";
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
    console.log("User is on phone or tablet");

    return true;
  }
}

window.onload = () => {
  checkIfUserWithPhoneOrTablet();
};
window.addEventListener("resize", () => {
  checkIfUserWithPhoneOrTablet();
});

function makeNotification(icon, message, id) {
  return `
  <div class="notification" id ="${id}" style="animation-name: notification">
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
  let id = "id" + Math.floor(Math.random() * 1000);
  let notificationHTML = makeNotification(icon, message, id);
  let tempDiv = document.createElement("div");
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

setTimeout(() => {
  notify("bi-emoji-smile-fill", "Welcome to my portfolio");
}, 1000);
setTimeout(() => {
  notify(
    "bi-puzzle-fill",
    "If you like this website and want to use it, contact me and we can make a deal."
  );
}, 10000);

function checkResolutionAndNotify() {
  if (checkIfUserWithPhoneOrTablet()) {
    if (window.innerHeight > 828 && window.innerHeight > window.innerWidth) {
      notify(
        "bi-arrow-repeat",
        "For better experience, please rotate you screen."
      );
    } else if (window.innerHeight > 800 && window.innerWidth < 565) {
      notify(
        "bi-info-circle-fill",
        "For better experience, visit this website in portrait mode."
      );
    } else if (window.innerWidth < 828) {
      notify(
        "bi-pc-display",
        "For better experience, visit this website from a pc or a tablet."
      );
    }
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
