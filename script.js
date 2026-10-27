const photos = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function openPhoto(index) {
    currentIndex = index;
    lightboxImg.src = photos[currentIndex].src;
    lightbox.classList.add("active");
}

function closePhoto() {
    lightbox.classList.remove("active");
}

function showNext() {
    currentIndex = (currentIndex + 1) % photos.length;
    openPhoto(currentIndex);
}

function showPrevious() {
    currentIndex =
        (currentIndex - 1 + photos.length) % photos.length;
    openPhoto(currentIndex);
}

photos.forEach((photo, index) => {
    photo.addEventListener("click", () => openPhoto(index));
});

closeBtn.addEventListener("click", closePhoto);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closePhoto();
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closePhoto();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrevious();
});
