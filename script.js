let index = 1;

function scrollDownIntoView(btn, element) {
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
  console.log(index);

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
  if (e.deltaY > 0 && index < 6) {
    document.getElementById("down").click();
  } else if (e.deltaY < 0 && index > 1) {
    document.getElementById("up").click();
  }
});

// call the function scrollDownIntoView() when keydown event is triggered

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" && index < 6) {
    document.getElementById("down").click();
  } else if (e.key === "ArrowUp" && index > 1) {
    document.getElementById("up").click();
  }
});

// on window load , go to view section 1 mandatory

// window.onload = () => {
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
