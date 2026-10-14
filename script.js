/**
 * Khushi Mehta — Developer Portfolio JavaScript
 * Clean, lightweight, accessible client-side interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. Navigation, Mobile Drawer & Active Link Tracking
  // -------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky Navbar Styling on Scroll
  const handleScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Drawer Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile drawer when clicking a navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close when clicking outside drawer
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active Section Spy with IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 2. Scroll Reveal Animations
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add("show"));
  }

  // -------------------------------------------------------------------------
  // 3. Contact Form Client-Side Validation & Transmission
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const submitFormBtn = document.getElementById("submitFormBtn");
  const btnText = document.getElementById("btnText");
  const formFeedback = document.getElementById("formFeedback");

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const messageInput = document.getElementById("userMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let isValid = true;
      if (nameError) nameError.textContent = "";
      if (emailError) emailError.textContent = "";
      if (messageError) messageError.textContent = "";
      if (formFeedback) {
        formFeedback.className = "form-feedback";
        formFeedback.style.display = "none";
      }

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const messageVal = messageInput ? messageInput.value.trim() : "";

      if (!nameVal) {
        if (nameError) nameError.textContent = "Please enter your name.";
        isValid = false;
      }

      if (!emailVal) {
        if (emailError)
          emailError.textContent = "Please enter your email address.";
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        if (emailError)
          emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (!messageVal) {
        if (messageError)
          messageError.textContent = "Please write a brief message.";
        isValid = false;
      }

      if (!isValid) return;

      if (btnText) btnText.textContent = "Sending...";
      if (submitFormBtn) submitFormBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);

        const response = await fetch(
          "https://formsubmit.co/ajax/khushimehta1409@gmail.com",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          },
        );

        if (response.ok) {
          if (formFeedback) {
            formFeedback.textContent =
              "Thank you! Your message has been sent to Khushi Mehta (khushimehta1409@gmail.com). I will get back to you soon!";
            formFeedback.classList.add("success");
            formFeedback.style.display = "block";
          }
          contactForm.reset();
        } else {
          throw new Error("Form submission response error");
        }
      } catch (err) {
        // Fallback to mailto link
        const subject = encodeURIComponent(
          document.getElementById("userSubject")?.value ||
            "Portfolio Message for Khushi Mehta",
        );
        const body = encodeURIComponent(
          `Hi Khushi,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`,
        );
        window.location.href = `mailto:khushimehta1409@gmail.com?subject=${subject}&body=${body}`;

        if (formFeedback) {
          formFeedback.textContent =
            "Your email client was opened to complete the transmission directly to khushimehta1409@gmail.com.";
          formFeedback.classList.add("success");
          formFeedback.style.display = "block";
        }
      } finally {
        if (btnText) btnText.textContent = "Send Message";
        if (submitFormBtn) submitFormBtn.disabled = false;
      }
    });
  }
});
