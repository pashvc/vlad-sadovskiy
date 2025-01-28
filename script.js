document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add stagger animation to sections
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "50px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger delay based on index
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 150);

        // Animate list items within the section
        const listItems = entry.target.querySelectorAll("li");
        listItems.forEach((item, i) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, index * 150 + i * 100);
        });
      }
    });
  }, observerOptions);

  // Initialize sections with starting styles
  document
    .querySelectorAll(".expertise, .philosophy, .focus-areas")
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

      // Initialize list items
      const listItems = section.querySelectorAll("li");
      listItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      });

      observer.observe(section);
    });

  // Add parallax effect to header
  let header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    let scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
  });

  // Add hover effect to avatar container
  const avatarContainer = document.querySelector(".avatar-container");
  if (avatarContainer) {
    avatarContainer.addEventListener("mousemove", (e) => {
      const rect = avatarContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width - 0.5) * 20;
      const yPercent = (y / rect.height - 0.5) * 20;

      avatarContainer.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    avatarContainer.addEventListener("mouseleave", () => {
      avatarContainer.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  }

  // Add initial animation to the title
  const title = document.querySelector("h1");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-20px)";
    title.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 300);
  }
});
