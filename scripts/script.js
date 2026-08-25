let index = Number(localStorage.getItem("index") || 1);

let lang = localStorage.getItem("lang") || "en";

let welcomed = localStorage.getItem("welcomed") || "false";

function scrollDownIntoView(btn, element) {
  lang = localStorage.getItem("lang") || "en";
  if (index === 6) {
    notify(
      "bi-whatsapp",
      lang == "en"
        ? "For emergency, contact me on WhatsApp."
        : "Pour urgence, contacte-moi sur WhatsApp.",
    );
  }
  if (index === 1) {
    notify(
      "bi-question-circle-fill",
      lang == "en"
        ? "I can learn any new technologie easily and quickly."
        : "Pour urgence, contacte-moi sur WhatsApp.",
    );
  }
  if (index == 2) {
    notify(
      "bi-info-circle-fill",
      lang == "en"
        ? "I am always working on new projects"
        : "Je travaille toujours sur de nouveaux projets.",
    );
    selectCard(document.getElementById("more-projects"));
  }
  const section = document.getElementById(`section${element}`);
  // lock input while smooth scrolling to prevent multiple section moves
  isAnimatingScroll = true;
  clearTimeout(_scrollSafetyTimeout);
  _scrollSafetyTimeout = setTimeout(() => {
    isAnimatingScroll = false;
  }, 1200);

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index++;
  localStorage.setItem("index", String(index));
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
  // lock input while smooth scrolling to prevent multiple section moves
  isAnimatingScroll = true;
  clearTimeout(_scrollSafetyTimeout);
  _scrollSafetyTimeout = setTimeout(() => {
    isAnimatingScroll = false;
  }, 1200);

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index--;
  localStorage.setItem("index", String(index));
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
  lang = localStorage.getItem("lang") || "en";
  const indexes =
    lang == "en"
      ? [
          "PROFILE",
          "ABOUT",
          "PROJECTS",
          "EXPERIENCE",
          "SERVICES",
          "STATS",
          "CONTACT",
        ]
      : [
          "PROFIL",
          "À PROPOS",
          "PROJETS",
          "EXPÉRIENCE",
          "SERVICES",
          "STATS",
          "CONTACT",
        ];
  document.getElementById("index").innerHTML = indexes[index - 1];
  if (index > 1 && index < 7) {
    if (document.getElementById("lineFull2")) {
      document.getElementById("lineFull2").outerHTML =
        lang == "en"
          ? `
                <div class="line-half" id="lineHalf2">
                    <div class="next-index"></div>
                    <p class="next-index-text index-text" id="next-index">HOME</p>
                </div>
            `
          : `
                <div class="line-half" id="lineHalf2">
                    <div class="next-index"></div>
                    <p class="next-index-text index-text" id="next-index">Acceuil</p>
                </div>
            `;
    }
    if (document.getElementById("lineFull")) {
      document.getElementById("lineFull").outerHTML =
        lang == "en"
          ? `
                <div class="line-half-prev" id="lineHalf">
                    <div class="prev-index"></div>
                    <p class="prev-index-text index-text" id="prev-index">HOME</p>
                </div>
            `
          : `
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

let _isTouching = false;
// Wheel accumulation & throttle to avoid multi-section jumps on sensitive touchpads
let _wheelAccum = 0;
let _lastWheelTime = 0;
const WHEEL_THRESHOLD = 100; // accumulated deltaY required to trigger
const WHEEL_COOLDOWN = 450; // ms cooldown after triggering

// Lock while a smooth scroll animation is in progress to avoid double-triggers
let isAnimatingScroll = false;
let _scrollEndTimeout = null;
let _scrollSafetyTimeout = null;

// Allow toggling the custom scroll behaviour (wheel/touch) when native scrolling is preferred.
// It is desktop-only: phones/tablets should use the normal page scroll.
let customScrollEnabled = true;
function setCustomScrollEnabled(enabled) {
  customScrollEnabled = window.innerWidth >= 828 && !!enabled;
}

document.addEventListener(
  "wheel",
  (e) => {
    // ignore wheel events during an active touch gesture
    if (_isTouching) return;
    if (window.innerWidth < 828) return;

    const now = Date.now();
    // ignore wheel events when custom scroll is disabled or on phones
    if (!customScrollEnabled || window.innerWidth < 828) return;
    // ignore wheel events during cooldown
    if (now - _lastWheelTime < WHEEL_COOLDOWN) return;

    // ignore wheel events while a programmatic smooth scroll is animating
    if (isAnimatingScroll) return;

    // accumulate deltaY
    _wheelAccum += e.deltaY;

    // if accumulation exceeds threshold, trigger one section and reset
    if (Math.abs(_wheelAccum) >= WHEEL_THRESHOLD) {
      if (_wheelAccum > 0 && index < 7) {
        document.getElementById("down").click();
      } else if (_wheelAccum < 0 && index > 1) {
        document.getElementById("up").click();
      }
      _wheelAccum = 0;
      _lastWheelTime = now;
    }
    // clear accumulation shortly after inactivity to avoid long memory
    clearTimeout(document._wheelAccumTimeout);
    document._wheelAccumTimeout = setTimeout(() => {
      _wheelAccum = 0;
    }, 150);
  },
  { passive: true },
);

// call the function scrollDownIntoView() when keydown event is triggered

document.addEventListener("keydown", (e) => {
  if (window.innerWidth < 828) return;
  if (!customScrollEnabled) return;
  if (e.key === "ArrowDown" && index < 7) {
    document.getElementById("down").click();
  } else if (e.key === "ArrowUp" && index > 1) {
    document.getElementById("up").click();
  }
});

// Touch handling: detect swipe and move one section per swipe (throttled)
let _touchStartY = null;
let _lastTouchTime = 0;
const _SWIPE_THRESHOLD = 50; // px
const _SWIPE_COOLDOWN = 200; // ms between swipes

// Improved touch handling: prevent native scroll during gesture and ensure single action per swipe
let _touchMoved = false;
document.addEventListener(
  "touchstart",
  (e) => {
    if (window.innerWidth < 828) return;
    if (e.touches && e.touches.length > 1) return; // ignore multi-touch
    if (!customScrollEnabled) return;
    _touchStartY = e.touches[0].clientY;
    _touchMoved = false;
    _isTouching = true;
  },
  { passive: true },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (window.innerWidth < 828) return;
    if (!customScrollEnabled) return;
    if (_touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const delta = Math.abs(_touchStartY - currentY);
    // small movement threshold to decide when to lock scrolling
    if (delta > 10 && !_touchMoved) {
      // prevent native scrolling so the page doesn't jump multiple sections
      try {
        e.preventDefault();
      } catch (err) {}
      _touchMoved = true;
    }
  },
  { passive: false },
);

document.addEventListener(
  "touchend",
  (e) => {
    try {
      if (window.innerWidth < 828) return;
      if (!customScrollEnabled) return;
      if (_touchStartY === null) return;
      const touch = (e.changedTouches && e.changedTouches[0]) || null;
      if (!touch) {
        _touchStartY = null;
        _isTouching = false;
        return;
      }
      const touchEndY = touch.clientY;
      const deltaY = _touchStartY - touchEndY;
      const now = Date.now();
      // if a programmatic smooth scroll is happening, ignore this gesture
      if (isAnimatingScroll) {
        _touchStartY = null;
        _isTouching = false;
        return;
      }
      if (now - _lastTouchTime < _SWIPE_COOLDOWN) {
        _touchStartY = null;
        _isTouching = false;
        return;
      }

      if (Math.abs(deltaY) > _SWIPE_THRESHOLD) {
        if (deltaY > 0 && index < 7) {
          const downBtn = document.getElementById("down");
          if (downBtn) downBtn.click();
          _lastTouchTime = now;
        } else if (deltaY < 0 && index > 1) {
          const upBtn = document.getElementById("up");
          if (upBtn) upBtn.click();
          _lastTouchTime = now;
        }
      }
    } finally {
      _touchStartY = null;
      _touchMoved = false;
      // small delay before clearing _isTouching to avoid wheel events immediately after
      setTimeout(() => (_isTouching = false), 80);
    }
  },
  { passive: true },
);

// Automatically disable custom scroll when both navigation arrows are hidden (native scrolling expected)
function watchArrowVisibility() {
  const up = document.getElementById("up");
  const down = document.getElementById("down");
  if (!up || !down) return;

  const checkAndToggle = () => {
    // Only react when inline styles are used (script-driven). Avoid reacting to CSS media queries.
    const upHasInline = up.hasAttribute("style");
    const downHasInline = down.hasAttribute("style");
    if (!upHasInline && !downHasInline) return; // no script-driven change detected

    const upHidden = up.style.display === "none";
    const downHidden = down.style.display === "none";
    // if both hidden -> disable custom scroll; otherwise enable
    setCustomScrollEnabled(!(upHidden && downHidden));
  };

  // initial check
  checkAndToggle();

  // observe attribute changes on both buttons
  const obs = new MutationObserver(checkAndToggle);
  obs.observe(up, { attributes: true, attributeFilter: ["style", "class"] });
  obs.observe(down, { attributes: true, attributeFilter: ["style", "class"] });

  // fallback: periodic check in case styles are changed via CSS classes
  const intervalId = setInterval(checkAndToggle, 800);
  // stop interval when page unloads
  window.addEventListener("beforeunload", () => clearInterval(intervalId));
}

// wire watcher on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    watchArrowVisibility();
  } catch (e) {}
});

// Listen for scroll events and treat a lack of scroll activity as scroll-end
window.addEventListener(
  "scroll",
  () => {
    if (!isAnimatingScroll) return;
    clearTimeout(_scrollEndTimeout);
    _scrollEndTimeout = setTimeout(() => {
      isAnimatingScroll = false;
      clearTimeout(_scrollSafetyTimeout);
    }, 250);
  },
  { passive: true },
);

// on window load , go to view section 1 mandatory

// if (window.innerWidth > 828) {
//   const section = document.getElementById(`section1`);
//   section.scrollIntoView({ behavior: "smooth", block: "start" });
// }

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
      },
    );
  });
});

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(
    function () {
      btn.innerHTML =
        lang == "en"
          ? "Copied <i class='bi bi-clipboard-check'></i>"
          : "Copié <i class='bi bi-clipboard-check'></i>";
      setTimeout(() => {
        btn.innerHTML =
          lang == "en"
            ? "Copy Email <i class='bi bi-clipboard'></i>"
            : "Copier l'Email <i class='bi bi-clipboard'></i>";
      }, 1000);
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    },
  );
}

function toSection(index2) {
  const target = Math.max(1, Math.min(7, Number(index2) || 1));
  const current = Number(index) || 1;

  if (target === current) {
    const section = document.getElementById(`section${target}`);
    if (section) {
      isAnimatingScroll = true;
      clearTimeout(_scrollSafetyTimeout);
      _scrollSafetyTimeout = setTimeout(() => {
        isAnimatingScroll = false;
      }, 1200);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  const section = document.getElementById(`section${target}`);
  if (!section) return;

  isAnimatingScroll = true;
  clearTimeout(_scrollSafetyTimeout);
  _scrollSafetyTimeout = setTimeout(() => {
    isAnimatingScroll = false;
  }, 1200);

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  index = target;
  localStorage.setItem("index", String(index));

  if (document.getElementById("down")) {
    document.getElementById("down").style.display =
      index < 7 ? "block" : "none";
  }
  if (document.getElementById("up")) {
    document.getElementById("up").style.display = index > 1 ? "block" : "none";
  }

  indexDown();
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
      navigator.userAgent,
    )
  ) {
    if (window.innerWidth < 828 && window.innerHeight < 680) {
      notify(
        "bi-pc-display",
        lang == "en"
          ? "For the best experience, visit this website from a computer or a laptop."
          : "Pour une meilleure expérience, visitez ce site depuis un ordinateur ou un portable.",
      );
    }
  }
}

// window.onload = () => {
//   checkIfUserWithPhoneOrTablet();
// };
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
    notificationElement,
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
    lang == "en"
      ? "If you like this website and want to use it, contact me and we can make a deal."
      : "Si ce site vous plaît et que vous souhaitez l’utiliser, contactez-moi et on peut faire un accord.",
  );
}, 40000);

function checkResolutionAndNotify() {
  if (window.innerHeight > 828 && window.innerHeight > window.innerWidth) {
    notify(
      "bi-pc-display",
      lang == "en"
        ? "For the best experience, visit this website from a computer or a laptop."
        : "Pour une meilleure expérience, visitez ce site depuis un ordinateur ou un portable.",
    );
  } else if (window.innerHeight > 800 && window.innerWidth < 565) {
    notify(
      "bi-pc-display",
      lang == "en"
        ? "For the best experience, visit this website from a computer or a laptop."
        : "Pour une meilleure expérience, visitez ce site depuis un ordinateur ou un portable.",
    );
  }
}

function toggleContributions(btn, action) {
  try {
    const inner = btn.closest(".inner");
    if (!inner) return;

    const header = inner.querySelector(".experience-card-header");
    const bottom = inner.querySelector(".project-card-bottom");
    const contributionsWrapper = inner.querySelector(".contributions-hidden");
    const contributionsCard = contributionsWrapper
      ? contributionsWrapper.querySelector(".contributions-card")
      : null;

    if (action === "show") {
      if (header) header.style.display = "none";
      if (bottom) bottom.style.display = "none";
      if (contributionsWrapper) {
        contributionsWrapper.style.display = "flex";
        if (contributionsCard) {
          contributionsCard.style.animationName = "modal-animation";
          setTimeout(() => {
            contributionsCard.style.animationName = "none";
          }, 400);
        }
      }
    } else if (action === "hide") {
      if (contributionsWrapper) {
        contributionsWrapper.style.display = "none";
      }
      if (header) header.style.display = "flex";
      if (bottom) bottom.style.display = "block";
      // return focus to the first visit button if available
      const backToBtn = inner.querySelector(".project-btns .visit-btn");
      if (backToBtn) backToBtn.focus();
    }
  } catch (e) {
    console.error("toggleContributions error:", e);
  }
}

// Hide contributions on mouseleave for each experience card
function hideContributionsForInner(inner) {
  const header = inner.querySelector(".experience-card-header");
  const bottom = inner.querySelector(".project-card-bottom");
  const contributionsWrapper = inner.querySelector(".contributions-hidden");
  if (contributionsWrapper) {
    contributionsWrapper.style.display = "none";
  }
  if (header) header.style.display = "flex";
  if (bottom) bottom.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".experience-card").forEach((card) => {
    card.addEventListener("mouseleave", () => {
      const inner = card.querySelector(".inner");
      if (inner) hideContributionsForInner(inner);
    });
  });

  // Wire mobile sidebar toggle button
  try {
    const mobileSidebar = document.querySelector(".mobile-sidebar");
    if (mobileSidebar) {
      const sbBtn = mobileSidebar.querySelector(".sidebar-button");
      if (sbBtn) {
        sbBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          toggleMobileSidebar();
        });
      }
    }
  } catch (e) {}
});

function toggleMobileSidebar() {
  const sidebar = document.querySelector(".mobile-sidebar");
  if (!sidebar) return;
  // toggle via helper so icon/state stay consistent
  const collapsed = !sidebar.classList.contains("collapsed");
  setMobileSidebarCollapsed(collapsed);
}

function setMobileSidebarCollapsed(collapsed) {
  const sidebar = document.querySelector(".mobile-sidebar");
  if (!sidebar) return;
  const btn = sidebar.querySelector(".sidebar-button");
  const icon = btn ? btn.querySelector("i") : null;

  if (collapsed) {
    sidebar.classList.add("collapsed");
    if (icon) icon.className = "bi bi-chevron-double-left";
    if (btn) btn.setAttribute("aria-expanded", "false");
  } else {
    sidebar.classList.remove("collapsed");
    if (icon) icon.className = "bi bi-list";
    if (btn) btn.setAttribute("aria-expanded", "true");
  }
}

// Collapse sidebar when clicking outside or after interacting with any item inside (except the toggle button)
document.addEventListener(
  "pointerdown",
  (e) => {
    try {
      const sidebar = document.querySelector(".mobile-sidebar");
      if (!sidebar) return;
      // if already collapsed, nothing to do
      if (sidebar.classList.contains("collapsed"))
        setMobileSidebarCollapsed(true);
      // if click/tap is inside sidebar or on the toggle button, ignore here
      if (
        sidebar.contains(e.target) ||
        (e.target && e.target.closest && e.target.closest(".sidebar-button"))
      )
        return;
      // otherwise collapse
      setMobileSidebarCollapsed(false);
    } catch (err) {}
  },
  { passive: true },
);

// Any interaction inside the sidebar (links, buttons, touches) should collapse it — except the toggle button
document.addEventListener(
  "pointerup",
  (e) => {
    try {
      const sidebar = document.querySelector(".mobile-sidebar");
      if (!sidebar) return;
      // if the interaction originated inside the sidebar
      if (sidebar.contains(e.target)) {
        // ignore clicks on the toggle button itself
        if (e.target.closest && e.target.closest(".sidebar-button")) return;
        // collapse after a tiny timeout to allow link navigation/default actions
        setTimeout(() => setMobileSidebarCollapsed(true), 50);
      }
    } catch (err) {}
  },
  { passive: true },
);

/* Text animate initializer
   - Detects elements with `.text-animate`
   - When element enters viewport, adds an absolute overlay that covers the text
   - After 0.3s delay the overlay shrinks (width -> 0) creating a reveal effect
*/
function initTextAnimate() {
  const elems = Array.from(document.querySelectorAll(".text-animate"));
  if (!elems.length) return;
  const animateElement = (el) => {
    // prevent overlapping animations while one is running
    if (el.dataset.__animating === "true") return;
    // Ensure positioning context
    const cs = getComputedStyle(el);
    if (cs.position === "static") {
      el.style.position = "relative";
    }
    el.style.overflow = "hidden";

    // create overlay
    const overlay = document.createElement("div");
    overlay.className = "text-animate__overlay";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.top = "0";

    // direction: default is mirrored (anchor to right). Accept data-reveal-direction="ltr" to anchor left.
    const dir = (
      el.getAttribute("data-reveal-direction") || "mirror"
    ).toLowerCase();
    if (dir === "ltr" || dir === "left") {
      overlay.style.left = "0";
      overlay.style.right = "auto";
    } else {
      overlay.style.right = "0";
      overlay.style.left = "auto";
    }

    el.appendChild(overlay);

    // start shrink after 0.3s
    setTimeout(() => {
      requestAnimationFrame(() => {
        overlay.classList.add("shrinking");
      });
    }, 300);

    overlay.addEventListener(
      "transitionend",
      () => {
        try {
          overlay.remove();
        } catch (e) {}
        // clear animating flag so the element can animate again next time
        try {
          delete el.dataset.__animating;
        } catch (e) {}
      },
      { once: true },
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateElement(entry.target);
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.15 },
  );

  elems.forEach((e) => {
    // animate immediately if already in viewport, but keep observing for future entries
    const rect = e.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      animateElement(e);
    }
    observer.observe(e);
  });
}

// initialize on DOM ready
document.addEventListener("DOMContentLoaded", initTextAnimate);

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
    loader.innerHTML =
      lang == "en"
        ? `
      <div class="wrapper">
        <div class="typing-demo welcome">
          Welcome to my portfolio.
        </div>
      </div>
      `
        : `
      <div class="wrapper">
        <div class="typing-demo2 welcome">
          Bienvenue sur mon portfolio.
        </div>
      </div>
      `;
    let tutorials = localStorage.getItem("tutorial");
    const isMobileViewport = window.innerWidth < 828;
    if (!isMobileViewport && tutorials !== "done") {
      setTimeout(() => {
        tutorial();
      }, 3000);
    }
    setTimeout(() => {
      stopAnimation();
    }, 3000);
  }, 1000);
}
if (welcomed !== "true") {
  localStorage.setItem("welcomed", "true");
  animation();
} else {
  document.querySelector(".loading-animation").style.display = "none";
}
animation();

function tutorial() {
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
    tutoModal.innerText =
      lang == "en"
        ? `Or use the arrow keys on your keyboard to navigate.`
        : `Ou utilisez les flèches de votre clavier pour naviguer.`;
    includes.innerHTML = `<img src="./assets/images/arrows2.png" alt="arrow keys" class="includes-img" />`;
    tuto.style.top = "80%";
  } else if (step == 2) {
    includes.innerHTML = "";
    tutoModal.innerText =
      lang == "en"
        ? `You can also use the navbar to navigate.`
        : "Vous pouvez aussi utiliser la barre de navigation pour naviguer.";
    tuto.style.top = "10%";
    tuto.style.left = "unset";
    tuto.style.right = "-140px";

    document.querySelectorAll(".page").forEach((el) => {
      highlightElement(el);
    });
  } else if (step == 3) {
    tutoModal.innerText =
      lang == "en"
        ? `Watch for the notifications in this corner.`
        : `Surveillez les notifications dans ce coin.`;
    tuto.style.top = "85%";
    tuto.style.right = "-140px";
    notify(
      "bi-info-circle-fill",
      lang == "en" ? "This is a notification" : "Ceci est une notification.",
    );
    highlightElement(document.querySelector(".notification"));
  } else if (step == 4) {
    tuto.style.top = "35%";
    tuto.style.right = "10%";
    toSection(2);
    tutoModal.innerText =
      lang == "en"
        ? `Search here for technologies.`
        : `Recherchez ici les technologies.`;
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

let langModal = false;
function chooseLang() {
  document.getElementById("langModal").style.display = langModal
    ? "none"
    : "flex";
  langModal = !langModal;
}

async function setLang(lang) {
  if (localStorage.getItem("lang")) {
    localStorage.removeItem("lang");
    localStorage.setItem("lang", lang);
  } else {
    localStorage.setItem("lang", lang);
  }

  notify(
    "bi-globe2",
    lang === "fr"
      ? "La langue a été définie sur le français"
      : "Language has been set to English",
  );

  const response = await fetch(`./lang/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    el.innerHTML = translations[key] || key;
  });

  // Optionally store lang in localStorage
  localStorage.setItem("lang", lang);
  // update current language circle in header
  try {
    const current = document.getElementById("currentLang");
    if (current) {
      const map = { en: "fi fi-us", fr: "fi fi-fr", ar: "fi fi-sa" };
      const cls = map[lang] || "fi fi-us";
      current.innerHTML = `<span class="${cls}"></span>`;
    }
  } catch (e) {}
}
// Load language from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  document.documentElement.setAttribute("lang", savedLang);

  setLang(savedLang);
});

// Restore navigation index on load and wire navigation buttons
window.addEventListener("DOMContentLoaded", () => {
  // ensure index variable is in range
  if (!index || isNaN(index) || index < 1) index = 1;
  if (index > 7) index = 7;

  // update labels and UI
  indexDown();

  const downBtn = document.getElementById("down");
  const upBtn = document.getElementById("up");

  if (index > 1 && upBtn) upBtn.style.display = "block";
  else if (upBtn) upBtn.style.display = "none";

  if (index < 7 && downBtn) downBtn.style.display = "block";
  else if (downBtn) downBtn.style.display = "none";

  // set initial click handlers so they move relative to current index
  if (downBtn)
    downBtn.onclick = () => scrollDownIntoView(downBtn, Math.min(7, index + 1));
  if (upBtn)
    upBtn.onclick = () => scrollUpIntoView(upBtn, Math.max(1, index - 1));
});
