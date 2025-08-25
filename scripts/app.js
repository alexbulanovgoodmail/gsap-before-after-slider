const dragger = document.querySelector(".dragger");
const afterImgContainer = document.querySelector(".img-container.is-after");
const beforeAfterWrap = document.querySelector(".before-after__wrapper");

window.gsap.registerPlugin(window.Draggable);

let draggableInstance;
let positionPercent = 0.5;

function updateClip(x) {
  const wrapWidth = beforeAfterWrap.offsetWidth;
  const clipX = wrapWidth - x;
  afterImgContainer.style.clipPath = `inset(0px ${clipX}px 0px 0px)`;
  positionPercent = x / wrapWidth;
}

function initDraggable() {
  if (draggableInstance) draggableInstance[0].kill();
  draggableInstance = window.Draggable.create(dragger, {
    type: "x",
    bounds: beforeAfterWrap,
    onDrag: function () {
      updateClip(window.gsap.getProperty(this.target, "x"));
    },
  });

  const wrapWidth = beforeAfterWrap.offsetWidth;
  const x = wrapWidth * positionPercent;
  window.gsap.set(dragger, { x });
  updateClip(x);
}

initDraggable();
window.addEventListener("resize", initDraggable);
