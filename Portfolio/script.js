document.addEventListener("DOMContentLoaded", () => {
  // Highlight active navigation link
  const links = document.querySelectorAll("nav ul li a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // 2-Step Verification Logic
  const signinForm = document.getElementById("signinForm");
  const sendCodeButton = document.getElementById("sendCodeButton");
  const verificationSection = document.getElementById("verificationSection");
  const formMessage = document.getElementById("formMessage");

  let generatedCode = null;

  // Simulate sending a verification code
  sendCodeButton.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();

    if (!email) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    // Generate a random 6-digit verification code
    generatedCode = Math.floor(100000 + Math.random() * 900000);
    console.log(`Verification code sent to ${email}: ${generatedCode}`); // Simulate email sending

    formMessage.textContent = "Verification code sent to your email.";
    formMessage.style.color = "green";
    verificationSection.style.display = "block";
  });

  // Handle form submission
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredCode = document.getElementById("verificationCode").value.trim();

    if (enteredCode === generatedCode.toString()) {
      formMessage.textContent = "Sign-In successful!";
      formMessage.style.color = "green";
      verificationSection.style.display = "none";
      signinForm.reset();
    } else {
      formMessage.textContent = "Invalid verification code. Please try again.";
      formMessage.style.color = "red";
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Scroll animations
  const fadeInElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInElements.forEach(el => observer.observe(el));

  // Back to top button
  const backToTopButton = document.createElement("button");
  backToTopButton.id = "backToTop";
  backToTopButton.textContent = "↑";
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #f39c12;
    color: #000;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Scroll Progress Bar
  const progressBar = document.getElementById("progressBar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  });

  // AI Chatbot
  const chatbot = document.getElementById("chatbot");
  const openChatbot = document.getElementById("openChatbot");
  const closeChatbot = document.getElementById("closeChatbot");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotQuery = document.getElementById("chatbotQuery");
  const sendChatbotQuery = document.getElementById("sendChatbotQuery");

  openChatbot.addEventListener("click", () => {
    chatbot.style.display = "flex";
  });

  closeChatbot.addEventListener("click", () => {
    chatbot.style.display = "none";
  });

  sendChatbotQuery.addEventListener("click", () => {
    const userMessage = chatbotQuery.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    const userMessageElement = document.createElement("div");
    userMessageElement.textContent = `You: ${userMessage}`;
    chatbotMessages.appendChild(userMessageElement);

    // Simulate AI response
    const aiMessageElement = document.createElement("div");
    aiMessageElement.textContent = "AI: I'm here to help! How can I assist you?";
    chatbotMessages.appendChild(aiMessageElement);

    // Clear input
    chatbotQuery.value = "";
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  });
});
