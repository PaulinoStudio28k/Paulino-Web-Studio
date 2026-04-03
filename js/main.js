// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let current = "";

  const scrollMiddle = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollMiddle >= sectionTop && scrollMiddle < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});



const navbarEl = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbarEl.classList.add("scrolled");
  } else {
    navbarEl.classList.remove("scrolled");
  }
});


const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (hero) {
    hero.style.transform = `translateY(${scroll * 0.2}px)`;
  }
});



// ===============================
// MOBILE MENU (CLEAN VERSION)
// ===============================
const toggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.classList.toggle("menu-open"); // for blur effect
});

// CLOSE MENU WHEN CLICK LINK
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    toggle.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});


// ===============================
// SCROLL PROGRESS BAR
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar.offsetHeight;

    // 🔥 MUCH BETTER OFFSET SYSTEM
    const targetPosition =
      target.offsetTop - navbarHeight - 10; // small breathing space

    if (targetId === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});


const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = progress + "%";
});


// ===============================
// FADE ANIMATION
// ===============================
const faders = document.querySelectorAll(".fade-up");

const appear = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

faders.forEach(el => appear.observe(el));


// ===============================
// SERVICES ANIMATION
// ===============================
const services = document.querySelector(".services");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      services.classList.add("show");
    }
  });
});

if (services) observer.observe(services);


// ===============================
// BACK TO TOP
// ===============================
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



const form = document.getElementById("contactForm");
const success = document.getElementById("contactSuccess");
const button = document.querySelector(".contact-submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  button.classList.add("loading");

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      // SUCCESS UI
      success.classList.add("active");

      // GET VALUES
      const name = form.name.value;
      const message = form.message.value;

      // WHATSAPP AUTO MESSAGE
      const whatsappMsg = `Hello, my name is ${name}. ${message}`;
      const whatsappURL = `https://wa.me/250790003339?text=${encodeURIComponent(whatsappMsg)}`;

      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, 1500);

      form.reset();

      setTimeout(() => {
        success.classList.remove("active");
      }, 3000);

    } else {
      alert("Something went wrong.");
    }

  } catch (err) {
    alert("Error sending message.");
  }

  button.classList.remove("loading");
});



const newsletterForm = document.getElementById("newsletterForm");
const newsletterSuccess = document.getElementById("newsletterSuccess");
const newsletterBtn = document.querySelector(".newsletter-btn");

newsletterForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  newsletterBtn.classList.add("loading");

  const data = new FormData(newsletterForm);

  try {
    const res = await fetch(newsletterForm.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      newsletterSuccess.classList.add("active");
      newsletterForm.reset();

      setTimeout(() => {
        newsletterSuccess.classList.remove("active");
      }, 2500);
    }

  } catch (err) {
    alert("Error subscribing.");
  }

  newsletterBtn.classList.remove("loading");
});
