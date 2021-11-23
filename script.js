function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /*or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /*or $(window).width() */
  );
}

function highlightAnchor(hash) {
  let anchors = document.querySelectorAll(".nav a");

  [...anchors].forEach((element) => {
    if (element.hash === hash) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", function () {
  let slides = document.querySelectorAll(".slide");

  [...slides].forEach((element) => {
    let title = element.querySelector(".title");

    if (isElementInViewport(title)) {
      if (window.history.pushState) {
        let hash = `#${element.id}`;
        window.history.pushState(null, null, hash);

        highlightAnchor(hash);
      }
    }
  });
});
