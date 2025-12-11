let index = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

// Tạo dot
slides.forEach((_, i) => {
    let dot = document.createElement("span");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

// Cập nhật slide
function updateSlider() {
    document.querySelector(".slider-wrapper").style.transform =
        `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Next / prev
document.querySelector(".next").onclick = () => {
    index = (index + 1) % slides.length;
    updateSlider();
};

document.querySelector(".prev").onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
};

// Click dots
dots.forEach(dot => {
    dot.onclick = () => {
        index = Number(dot.dataset.index);
        updateSlider();
    };
});

// Auto
setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
}, 4000);

// Mobile swipe
let startX = 0;
document.querySelector(".hero-slider").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});
document.querySelector(".hero-slider").addEventListener("touchend", e => {
    if (e.changedTouches[0].clientX < startX - 50) document.querySelector(".next").click();
    if (e.changedTouches[0].clientX > startX + 50) document.querySelector(".prev").click();
});

updateSlider();
