document.addEventListener("DOMContentLoaded", () => {
  // Animate messages
  const messages = document.querySelectorAll(".message");
  messages.forEach((message, index) => {
    message.style.setProperty("--message-index", index);
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add animations to timeline items
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "50px",
    }
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    timelineObserver.observe(item);
  });

  // Add stagger animation to sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 150);

          const listItems = entry.target.querySelectorAll("li");
          listItems.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "translateX(0)";
            }, index * 150 + i * 100);
          });
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "50px",
    }
  );

  document
    .querySelectorAll(".expertise, .philosophy, .focus-areas")
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

      const listItems = section.querySelectorAll("li");
      listItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      });

      sectionObserver.observe(section);
    });

  // Add parallax effect to header
  let header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    let scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
  });

  // Add hover effect to profile image
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("mousemove", (e) => {
      const rect = profileImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width - 0.5) * 10;
      const yPercent = (y / rect.height - 0.5) * 10;

      profileImage.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    profileImage.addEventListener("mouseleave", () => {
      profileImage.style.transform =
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

  // Initialize conversation
  const messagesContainer = document.getElementById("messages");
  const loadingElement = document.getElementById("loading");

  const initializeConversation = async () => {
    try {
      const response = await fetch(
        "https://prod-api.tavus.io/proxy/rqh/v2/conversations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "7a69ffc48b2640f897ec1b72c0720533",
          },
          body: JSON.stringify({
            replica_id: "r4dcf61c154d",
            conversation_name: "Vlad Sadovskiy",
            conversational_context:
              "You are digital avatar of Vlad Sadovskiy you are friendly and answering questions and asking questions.\n\n1. Hi Vlad, how are you doing, my AI avatar version? \n\n2. Please remind me what I did in summer 2010? (add some joke related to vacation time in summer 2010)\n\n3. Why did you decide to start the processing business in 2010?\n\n4. Based on your experience, what would be the fintech perspective in 2025?\n\n5. I hope you won't become smarter than me, will you?\n\nAnswers:\n\n1. Hey there, original Vlad! I'm doing great - just processing thoughts at lightning speed, which reminds me of our old dial-up internet days. At least I don't have to wait 5 minutes to connect like we did in the 90s!\n\n2. Ah, summer 2010 - that was right before we launched into the processing business. If I remember correctly, we spent that last \"free\" summer alternating between beach trips and obsessively writing our business plan. You kept trying to convince everyone that your laptop tan was just as good as a beach tan!\n\n3. The processing business decision in 2010 came from seeing a huge gap in the market. I noticed that many merchants were struggling with dated payment systems and excessive fees. Having worked in fintech for years, I saw the opportunity to build something more merchant-friendly and technologically advanced. Plus, the financial crisis of 2008-2009 showed just how much the payment industry needed innovation and transparency.\n\n4. From my 20+ years of experience, I see 2025 as a pivotal year for fintech. We'll likely see increased integration of AI in fraud prevention and risk assessment, which is already happening. The rise of embedded finance will continue, where non-financial companies integrate financial services into their platforms. Real-time payments will become the norm rather than the exception. However, we'll need to stay vigilant about regulatory changes, especially around cryptocurrency and open banking.\n\n5. Smarter than you? Don't worry! I might process payments faster, but I still can't match your ability to read people and build relationships - that's what made Netevia successful in the first place. Besides, who would I ask for vacation approval if I got too smart? Though I suppose I don't actually need vacations... maybe I am getting smarter! 😉",
          }),
        }
      );

      const data = await response.json();

      // Hide loading indicator
      loadingElement.style.display = "none";

      // Split the conversation into questions and answers
      const parts = data.conversational_context.split("\n\n");
      const questions = parts.slice(1, 6); // Questions 1-5
      const answers = parts.slice(7); // Answers 1-5

      // Display questions and answers with animation delay
      questions.forEach((question, index) => {
        setTimeout(() => {
          // Add question
          const questionElement = document.createElement("div");
          questionElement.className = "message question";
          questionElement.textContent = question.replace(/^\d+\.\s/, "");
          messagesContainer.appendChild(questionElement);

          // Add corresponding answer after a short delay
          setTimeout(() => {
            const answerElement = document.createElement("div");
            answerElement.className = "message answer";
            answerElement.textContent = answers[index].replace(/^\d+\.\s/, "");
            messagesContainer.appendChild(answerElement);
          }, 1000);
        }, index * 2000);
      });
    } catch (error) {
      console.error("Error:", error);
      loadingElement.innerHTML =
        "<p>Failed to load conversation. Please try again later.</p>";
    }
  };

  // Start the conversation
  initializeConversation();
});
