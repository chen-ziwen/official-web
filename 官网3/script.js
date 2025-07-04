// 等待DOM加载完成
document.addEventListener("DOMContentLoaded", function () {
  // 获取导航栏元素
  const navbar = document.querySelector(".navbar");

  // 获取所有需要观察的元素
  const stickyHeaders = document.querySelectorAll(".sticky-header");
  const blocks = document.querySelectorAll(".block");
  const cards = document.querySelectorAll(".card");
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const contactForm = document.querySelector(".contact-form");
  const contactInfo = document.querySelector(".contact-info");

  // 导航栏滚动效果
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // 初始化滚动观察器
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  // 为每个元素添加观察
  stickyHeaders.forEach((header) => observer.observe(header));
  blocks.forEach((block) => observer.observe(block));
  cards.forEach((card) => observer.observe(card));
  showcaseItems.forEach((item) => observer.observe(item));
  observer.observe(contactForm);
  observer.observe(contactInfo);

  // 滚动视差效果
  const parallaxElements = document.querySelectorAll("[data-speed]");

  window.addEventListener("scroll", function () {
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-speed"));
      const yOffset = window.scrollY * speed;

      element.style.transform = `translateY(${yOffset}px)`;
    });
  });

  // 顺序显示服务卡片
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
  });

  // "了解更多"按钮点击事件
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        window.scrollTo({
          top: aboutSection.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  }

  // 创建鼠标跟随效果
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      const moveX = (mouseX - 0.5) * 30;
      const moveY = (mouseY - 0.5) * 30;

      document.querySelector(
        ".hero-background"
      ).style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  }

  // 动画数字计数器
  function animateCounter(element, target, duration) {
    let start = 0;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);

      element.textContent = value;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    };

    window.requestAnimationFrame(step);
  }

  // 表单验证
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      let isValid = true;

      // 简单验证
      if (!nameInput.value.trim()) {
        markInvalid(nameInput, "请输入您的姓名");
        isValid = false;
      } else {
        markValid(nameInput);
      }

      if (!emailInput.value.trim()) {
        markInvalid(emailInput, "请输入您的邮箱");
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        markInvalid(emailInput, "请输入有效的邮箱地址");
        isValid = false;
      } else {
        markValid(emailInput);
      }

      if (!messageInput.value.trim()) {
        markInvalid(messageInput, "请输入您的留言");
        isValid = false;
      } else {
        markValid(messageInput);
      }

      if (isValid) {
        // 在实际应用中，这里会发送表单数据到服务器
        // 这里仅做演示
        form.reset();

        // 显示成功消息
        const submitButton = form.querySelector(".submit-button");
        const originalText = submitButton.textContent;

        submitButton.textContent = "发送成功！";
        submitButton.style.backgroundColor = "#10b981";

        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.backgroundColor = "";
        }, 3000);
      }
    });
  }

  function markInvalid(input, message) {
    input.classList.add("invalid");

    // 添加或更新错误消息
    let errorMessage = input.parentElement.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      input.parentElement.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
    errorMessage.style.color = "#ef4444";
    errorMessage.style.fontSize = "0.875rem";
    errorMessage.style.marginTop = "0.5rem";
  }

  function markValid(input) {
    input.classList.remove("invalid");

    // 移除错误消息
    const errorMessage = input.parentElement.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // 添加视差滚动效果
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 为每个区块添加滚动效果
    document.querySelectorAll("section").forEach((section, index) => {
      // 计算每个区块的位置
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // 检查该区块是否在视窗中
      if (
        scrollTop >= sectionTop - window.innerHeight / 2 &&
        scrollTop <= sectionTop + sectionHeight - window.innerHeight / 2
      ) {
        // 根据滚动位置设置透明度和变换
        const progress =
          (scrollTop - (sectionTop - window.innerHeight / 2)) /
          (sectionHeight + window.innerHeight);

        // 应用不同的效果到不同的区块
        if (index % 2 === 0) {
          section.style.backgroundColor = `rgba(248, 249, 250, ${
            1 - progress * 0.1
          })`;
        } else {
          section.style.backgroundColor = `rgba(255, 255, 255, ${
            1 - progress * 0.1
          })`;
        }
      }
    });
  });

  // 添加页面预加载效果
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });
});

// 添加页面滚动进度指示器
window.addEventListener("scroll", function () {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // 创建或更新进度条
  let progressBar = document.querySelector(".scroll-progress");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "4px";
    progressBar.style.backgroundColor = "#2563eb";
    progressBar.style.zIndex = "9999";
    progressBar.style.transition = "width 0.1s";
    document.body.appendChild(progressBar);
  }

  progressBar.style.width = scrolled + "%";
});
