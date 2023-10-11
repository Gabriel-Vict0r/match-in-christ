let slider = document.getElementById("slides"),
  slideBar = document.getElementById("slidebar"),
  slideThumb = document.getElementById("slidethumb"),
  slides = slider.querySelectorAll(".card"),
  slideWidth = slides[0].offsetWidth,
  visibleSlides = Math.floor(window.innerWidth / slideWidth);

let startX = 0,
  endX = 0,
  drag = false,
  prevX = 0,
  currentState = 0,
  lastIndent = 20;

initSlideBar();
initTouchEvents();
initMouseEvents();

function initSlideBar() {
  // Set thumb width
  slideThumb.style.width =
    (slideBar.offsetWidth / (slides.length - visibleSlides + 1)).toString() +
    "px";
}

// Listeners para smartphones
function initTouchEvents() {
  slider.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;
    // Direciona para a direita
    if (endX < startX) {
      if (currentState < slides.length - visibleSlides) currentState++;
    }
    // Direciona para a esquerda
    if (endX > startX) {
      if (currentState > 0) currentState--;
    }
    // Run slider
    scrollSlides(currentState);
    scrollSlideThumb(currentState);
  });
}

// Listeners para o mouse da página desktop
function initMouseEvents() {
  slider.addEventListener("mousedown", (e) => {
    prevX = e.pageX;
    drag = false;
  });
  slider.addEventListener("mousemove", () => {
    drag = true;
  });
  slider.addEventListener("mouseup", (e) => {
    if (drag === true && e.pageX < prevX) {
      if (currentState < slides.length - visibleSlides) currentState++;
    } else if (drag === true && e.pageX > prevX) {
      if (currentState > 0) currentState--;
    }
    scrollSlides(currentState);
    scrollSlideThumb(currentState);
  });
}

function scrollSlides(currentState) {
  let translate = currentState * slideWidth;
  // Indents for the last slide
  if (window.innerWidth > 768) lastIndent = 50;
  if (currentState === slides.length - visibleSlides)
    translate = translate - lastIndent;
  // Do sliding
  slider.style.transform = `translateX(-${translate}px)`;
}

function scrollSlideThumb(currentState) {
  let translate = currentState * slideThumb.offsetWidth;
  slideThumb.style.transform = `translateX(${translate}px)`;
}