/* ===== EDIT HERE ===== */
const TOTAL = 20;                  // number of photos: photo1.jpeg ... photo20.jpeg
const EXT = "jpeg";                // file ending: jpeg, jpg or png
const FEATURED = [1, 8, 15];       // photos shown big (wide)
const CAPTIONS = {                 // optional text under a photo
  // 1: "Your caption here",
};
/* ===================== */

const gallery = document.getElementById("gallery");

for (let n = 1; n <= TOTAL; n++) {
  const fig = document.createElement("figure");
  if (FEATURED.includes(n)) fig.classList.add("featured");

  const img = document.createElement("img");
  img.src = `photo${n}.${EXT}`;
  img.alt = CAPTIONS[n] || `Photo ${n}`;
  img.loading = "lazy";
  img.addEventListener("error", () => fig.remove()); // skip missing photos

  const cap = document.createElement("figcaption");
  cap.textContent = CAPTIONS[n] || "";

  fig.append(img, cap);
  gallery.appendChild(fig);
}

/* Lightbox */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCap = document.getElementById("lightbox-cap");
const counter = document.getElementById("counter");
let current = 0;

const items = () => Array.from(gallery.querySelectorAll("figure"));

function show(i) {
  const list = items();
  if (!list.length) return;
  current = (i + list.length) % list.length;
  const fig = list[current];
  const img = fig.querySelector("img");
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = fig.querySelector("figcaption").textContent;
  counter.textContent = `${current + 1} / ${list.length}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function hide() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

gallery.addEventListener("click", (e) => {
  const fig = e.target.closest("figure");
  if (fig) show(items().indexOf(fig));
});

document.getElementById("close").addEventListener("click", hide);
document.getElementById("prev").addEventListener("click", () => show(current - 1));
document.getElementById("next").addEventListener("click", () => show(current + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) hide(); });

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") hide();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

/* Swipe on phones */
let startX = 0;
lightbox.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
}, { passive: true });
