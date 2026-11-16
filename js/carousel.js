// Coverflow image carousel.
// Usage: createCarousel(containerElement, [{ src, alt }, ...])

var CAROUSEL_AUTOPLAY_MS = 4000; // time between automatic slides

function createCarousel(container, images) {
  if (!images || images.length === 0) return;

  var count = images.length;
  var active = 0;
  var timer = null;

  container.classList.add("carousel");

  var stage = document.createElement("div");
  stage.className = "carousel-stage";
  container.appendChild(stage);

  var slides = images.map(function (image, index) {
    var slide = document.createElement("div");
    slide.className = "carousel-slide";
    var img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "";
    img.draggable = false;
    slide.appendChild(img);
    // Clicking a side image brings it to the center.
    slide.addEventListener("click", function () {
      if (index !== active) { goTo(index); restart(); }
    });
    stage.appendChild(slide);
    return slide;
  });

  function arrow(direction, label, path) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-arrow carousel-arrow-" + direction;
    button.setAttribute("aria-label", label);
    button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"/></svg>';
    container.appendChild(button);
    return button;
  }

  if (count > 1) {
    arrow("prev", "Previous image", "M15 5l-7 7 7 7").addEventListener("click", function () {
      goTo(active - 1); restart();
    });
    arrow("next", "Next image", "M9 5l7 7-7 7").addEventListener("click", function () {
      goTo(active + 1); restart();
    });
  }

  // Position of a slide relative to the center one: 0 = center,
  // -1 = first on the left, 1 = first on the right, and so on (looping).
  function offsetOf(index) {
    var offset = (index - active) % count;
    if (offset < 0) offset += count;
    if (offset > count / 2) offset -= count;
    return offset;
  }

  function render() {
    slides.forEach(function (slide, index) {
      var offset = offsetOf(index);
      var distance = Math.abs(offset);
      slide.style.setProperty("--offset", offset);
      slide.style.setProperty("--distance", distance);
      slide.style.zIndex = String(100 - distance);
      slide.classList.toggle("is-active", offset === 0);
      slide.classList.toggle("is-hidden", distance > 2);
    });
  }

  function goTo(index) {
    active = ((index % count) + count) % count;
    render();
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function start() {
    stop();
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () { goTo(active + 1); }, CAROUSEL_AUTOPLAY_MS);
  }

  function restart() { start(); }

  // Pause autoplay while the mouse is over the carousel.
  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);

  render();
  start();
}
