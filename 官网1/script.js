// 初始化AOS动画
AOS.init({
  duration: 800,
  easing: "ease",
  once: false,
  offset: 100,
});

// 滚动时改变导航栏样式
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.padding = "15px 50px";
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  } else {
    navbar.style.padding = "20px 50px";
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
