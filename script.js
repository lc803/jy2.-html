// 控制首页轮播图与移动端导航菜单
const slides = Array.from(document.querySelectorAll(".hero-slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector(".carousel-arrow.previous");
const nextButton = document.querySelector(".carousel-arrow.next");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const hero = document.querySelector(".hero");
let activeSlide = 0;
let autoplayTimer;

// 更新轮播画面及当前指示点
function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeSlide);
    });

    dots.forEach((dot, dotIndex) => {
        const isCurrent = dotIndex === activeSlide;
        dot.classList.toggle("is-active", isCurrent);

        if (isCurrent) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

// 用户操作后重新开始自动播放
function restartAutoplay() {
    window.clearInterval(autoplayTimer);
    autoplayTimer = window.setInterval(() => {
        showSlide(activeSlide + 1);
    }, 6000);
}

previousButton.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    restartAutoplay();
});

nextButton.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    restartAutoplay();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showSlide(index);
        restartAutoplay();
    });
});

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
});

mainNav.addEventListener("click", (event) => {
    if (event.target.closest(".nav-link")) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "打开导航菜单");
    }
});

// 鼠标悬停时暂停轮播，离开后继续自动播放
hero.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
hero.addEventListener("mouseleave", restartAutoplay);

restartAutoplay();
