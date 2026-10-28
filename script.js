/* ===== GALLERY SETTINGS ===== */

const TOTAL = 40;
const EXT = "jpeg";
const FIRST_LOAD = 40;

const FEATURED = [1, 8, 15, 22, 29, 36];

/* ===== PHOTO CAPTIONS: 40 PHOTOS ===== */

const CAPTIONS = {
  1: "Portraits",
  2: "Lifestyle",
  3: "Friends",
  4: "Places",
  5: "Events",
  6: "Lifestyle",
  7: "Friends",
  8: "Places",
  9: "Portraits",
  10: "Lifestyle",
  11: "Friends",
  12: "Events",
  13: "Places",
  14: "Portraits",
  15: "Friends",
  16: "Lifestyle",
  17: "Events",
  18: "Places",
  19: "Portraits",
  20: "Friends",
  21: "Lifestyle",
  22: "Places",
  23: "Portraits",
  24: "Events",
  25: "Friends",
  26: "Lifestyle",
  27: "Places",
  28: "Portraits",
  29: "Friends",
  30: "Events",
  31: "Lifestyle",
  32: "Places",
  33: "Portraits",
  34: "Friends",
  35: "Events",
  36: "Lifestyle",
  37: "Places",
  38: "Portraits",
  39: "Friends",
  40: "Events"
};

/* ===== PHOTO CATEGORIES ===== */

const CATEGORIES = {
  1: "portraits",
  2: "lifestyle",
  3: "friends",
  4: "places",
  5: "events",
  6: "lifestyle",
  7: "friends",
  8: "places",
  9: "portraits",
  10: "lifestyle",
  11: "friends",
  12: "events",
  13: "places",
  14: "portraits",
  15: "friends",
  16: "lifestyle",
  17: "events",
  18: "places",
  19: "portraits",
  20: "friends",
  21: "lifestyle",
  22: "places",
  23: "portraits",
  24: "events",
  25: "friends",
  26: "lifestyle",
  27: "places",
  28: "portraits",
  29: "friends",
  30: "events",
  31: "lifestyle",
  32: "places",
  33: "portraits",
  34: "friends",
  35: "events",
  36: "lifestyle",
  37: "places",
  38: "portraits",
  39: "friends",
  40: "events"
};

/* ===== GALLERY ===== */

const gallery = document.getElementById("photo-gallery");
const loadMore = document.getElementById("load-more");
const photoCount = document.getElementById("photo-count");
const categoryButtons = document.querySelectorAll(".category");

let selectedCategory = "all";
let visibleCount = FIRST_LOAD;
let current = 0;

const photos = Array.from({ length: TOTAL }, (_, i) => {
  const n = i + 1;

  return {
    number: n,
    src: `photo${n}.${EXT}`,
    caption: CAPTIONS[n] || `Photo ${n}`,
    category: CATEGORIES[n] || "lifestyle",
    featured: FEATURED.includes(n)
  };
});

let availablePhotos = [];

function renderGallery() {
  gallery.innerHTML = "";

  availablePhotos = photos.filter(photo =>
    selectedCategory === "all" ||
    photo.category === selectedCategory
  );

  const displayedPhotos = availablePhotos.slice(0, visibleCount);

  displayedPhotos.forEach(photo => {
    const fig = document.createElement("figure");

    if (photo.featured) {
      fig.classList.add("featured");
    }

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = `${photo.caption} - Cabdi Salaam`;
    img.loading = "lazy";
    img.decoding = "async";

    const caption = document.createElement("figcaption");
    const tag = document.createElement("span");

    tag.className = "photo-tag";
    tag.textContent = photo.caption;

    caption.appendChild(tag);
    fig.append(img, caption);

    img.addEventListener("error", () => {
      fig.remove();
      updatePhotoCount();
    });

    gallery.appendChild(fig);
  });

  updatePhotoCount();
  updateLoadMore();
}

function updatePhotoCount() {
  const shown = gallery.querySelectorAll("figure").length;

  photoCount.textContent =
    `${shown} photos displayed`;
}

function updateLoadMore() {
  const remaining = availablePhotos.length - visibleCount;

  loadMore.hidden = remaining <= 0;
  loadMore.disabled = remaining <= 0;

  loadMore.textContent = remaining > 0
    ? `▦ Load More Photos (${remaining})`
    : "All Photos Loaded";
}

/* ===== CATEGORY FILTERS ===== */

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    selectedCategory = button.dataset.category;
    visibleCount = FIRST_LOAD;

    renderGallery();
  });
});

/* ===== LOAD MORE ===== */

loadMore.addEventListener("click", () => {
  visibleCount += 8;
  renderGallery();
});

/* ===== FOOTER YEAR ===== */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* ===== LIGHTBOX ===== */

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbCap = document.getElementById("lightbox-cap");
const counter = document.getElementById("counter");

function getVisibleFigures() {
  return Array.from(
    gallery.querySelectorAll("figure")
  ).filter(fig => fig.querySelector("img"));
}

function showPhoto(index) {
  const figures = getVisibleFigures();

  if (!figures.length) return;

  current = (index + figures.length) % figures.length;

  const fig = figures[current];
  const img = fig.querySelector("img");

  lbImg.src = img.src;
  lbImg.alt = img.alt;

  lbCap.textContent =
    fig.querySelector("figcaption").innerText;

  counter.textContent =
    `${current + 1} / ${figures.length}`;

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function hideLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Open selected photo */

gallery.addEventListener("click", event => {
  const fig = event.target.closest("figure");

  if (!fig) return;

  const figures = getVisibleFigures();
  showPhoto(figures.indexOf(fig));
});

/* Close photo */

document.getElementById("close").addEventListener(
  "click",
  hideLightbox
);

/* Previous and next */

document.getElementById("prev").addEventListener(
  "click",
  () => showPhoto(current - 1)
);

document.getElementById("next").addEventListener(
  "click",
  () => showPhoto(current + 1)
);

/* Close when background is clicked */

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    hideLightbox();
  }
});

/* Keyboard controls */

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") hideLightbox();
  if (event.key === "ArrowLeft") showPhoto(current - 1);
  if (event.key === "ArrowRight") showPhoto(current + 1);
});

/* Swipe controls for mobile */

let startX = 0;

lightbox.addEventListener("touchstart", event => {
  startX = event.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", event => {
  const distance =
    event.changedTouches[0].clientX - startX;

  if (Math.abs(distance) > 50) {
    showPhoto(current + (distance < 0 ? 1 : -1));
  }
}, { passive: true });

/* ===== START WEBSITE ===== */

renderGallery();
