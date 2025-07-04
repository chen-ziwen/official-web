const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      const element = entry.target;
      const animationName = element.dataset.cos;
      const shouldRepeat = element.dataset.cosRepeat === "true";

      if (entry.isIntersecting) {
        // 添加基础动画类 + 自定义动画类
        element.classList.add("cos-init", `${animationName}-animate`);
        // 根据属性设置动画参数
        element.style.setProperty(
          "--cos-delay",
          element.dataset.cosDelay || "0s"
        );
        element.style.setProperty(
          "--cos-duration",
          element.dataset.cosDuration || "0.6s"
        );

        // 单次动画触发后取消监听
        if (!shouldRepeat) observer.unobserve(element);
      } else if (shouldRepeat) {
        // 允许重复触发时移除类名
        element.classList.remove("cos-init", `${animationName}-animate`);
      }
    });
  },
  {
    rootMargin: "0px 0px -20% 0px", // 提前20%区域触发
    threshold: 0.1,
  }
);

// 监听所有带 data-cos 的元素
document.querySelectorAll("[data-cos]").forEach((el) => {
  observer.observe(el);
});
