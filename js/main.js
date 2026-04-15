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

    const ctaBtn = document.querySelector(".nav-cta");

if (ctaBtn) {
  if (current === "contact") {
    ctaBtn.classList.add("active");
  } else {
    ctaBtn.classList.remove("active");
  }
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
  const scrollY = window.scrollY;

  // navbar
  navbar.classList.toggle("scrolled", scrollY > 50);

  // progress bar
  const docHeight = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollY / docHeight) * 100 + "%";

  // back to top
  backToTopBtn.classList.toggle("show", scrollY > 300);
});

const glow = document.querySelector(".cursor-glow");

hero.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

if (window.innerWidth > 768) {
  hero.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ===============================
// DARK MODE TOGGLE
// ===============================
const toggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

applyTheme();

// APPLY CLICK TO BOTH BUTTONS
toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
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


document.querySelectorAll(".faq-item").forEach(item => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {

    // close others (premium behavior)
    document.querySelectorAll(".faq-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});

// ===============================
// CONTACT FORM SUBMISSION
// ===============================
const form = document.getElementById("contactForm");
const success = document.getElementById("contactSuccess");
const button = document.querySelector(".contact-submit");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Add loading spinner to button
    button.classList.add("loading");
    button.style.color = "transparent"; // Hide text while spinning

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

if (response.ok) {
  // 1. Show the premium success modal
  success.classList.add("active");

  // 2. Prepare data for WhatsApp
  const name = form.name.value;
  const service = form.service.value; // Adding the service to the message makes it more pro
  const whatsappMsg = `Hello, my name is ${name}. I am interested in ${service}.`;
  const whatsappURL = `https://wa.me/250790003339?text=${encodeURIComponent(whatsappMsg)}`;

  // 3. Reset form
  form.reset();

  // 4. Wait 3 seconds (so they read the message) then open WhatsApp
  setTimeout(() => {
    window.open(whatsappURL, "_blank");
  }, 3000);

  // 5. Hide the modal after 5 seconds total
  setTimeout(() => {
    success.classList.remove("active");
  }, 5000);
}

      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (err) {
      alert("Error sending message. Please check your connection.");
    }

    // Remove loading state
    button.classList.remove("loading");
    button.style.color = ""; // Restore text color
  });
}



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
