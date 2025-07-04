class Cos {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const element = entry.target;
          const animationName = element.dataset.animationName;
          const shouldRepeat = element.dataset.animationRepeat === "true";

          if (entry.isIntersecting) {
            // 添加基础动画类 + 自定义动画类
            element.classList.add("animate-active", `${animationName}-animate`);
            // 根据属性设置动画参数
            element.style.setProperty(
              "--animation-delay",
              element.dataset.animationDelay || "0s"
            );
            element.style.setProperty(
              "--animation-duration",
              element.dataset.animationDuration || "0.6s"
            );

            // 单次动画触发后取消监听
            if (!shouldRepeat) observer.unobserve(element);
          } else if (shouldRepeat) {
            // 允许重复触发时移除类名
            element.classList.remove(
              "animate-active",
              `${animationName}-animate`
            );
          }
        });
      },
      {
        rootMargin: "0px 0px -20% 0px", // 提前20%区域触发
        threshold: 0.1,
      }
    );

    // 监听所有带 data-animation-name 的元素
    document.querySelectorAll("[data-animation-name]").forEach((el) => {
      observer.observe(el);
    });
  }
}

new Cos();
