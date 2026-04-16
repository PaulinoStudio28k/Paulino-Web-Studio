const reMenuBtn = document.querySelector(".re-menu-btn");
const reMenuPanel = document.querySelector(".re-menu-panel");
const backdrop = document.querySelector(".re-menu-backdrop");

// OPEN / CLOSE BUTTON
reMenuBtn.addEventListener("click", () => {
  reMenuPanel.classList.toggle("active");
  backdrop.classList.toggle("active");
});

// CLOSE WHEN CLICK BACKDROP
backdrop.addEventListener("click", () => {
  reMenuPanel.classList.remove("active");
  backdrop.classList.remove("active");
});

// CLOSE WHEN CLICK OUTSIDE MENU
document.addEventListener("click", (e) => {
  if (
    !reMenuPanel.contains(e.target) &&
    !reMenuBtn.contains(e.target)
  ) {
    reMenuPanel.classList.remove("active");
    backdrop.classList.remove("active");
  }
});

// CLOSE WHEN CLICK LINK
document.querySelectorAll(".re-menu-link").forEach(link => {
  link.addEventListener("click", () => {
    reMenuPanel.classList.remove("active");
    backdrop.classList.remove("active");
  });
});

const closeBtn = document.querySelector(".re-menu-close");

closeBtn.addEventListener("click", () => {
  reMenuPanel.classList.remove("active");
  backdrop.classList.remove("active");
});


// ===============================
// UNIVERSAL DARK MODE SYSTEM
// ===============================
const toggles = document.querySelectorAll("#theme-toggle, #re-theme-toggle-mobile");

function applyTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

applyTheme();

toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});







const blocks = document.querySelectorAll(".case-block");

const observer = new IntersectionObserver(entries => {
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

blocks.forEach(block => observer.observe(block));


const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if(window.scrollY > 300){
    backToTopBtn.classList.add("show");
  }else{
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookingModal");
  const openBtns = document.querySelectorAll(".open-booking");
  const closeBtn = document.querySelector(".booking-modal__close");
  const overlay = document.querySelector(".booking-modal__overlay");
  const form = document.getElementById("bookingForm");
  const successBox = document.getElementById("bookingSuccess");
  const cookiePopup = document.getElementById("cookiePopup");
  const acceptBtn = document.getElementById("acceptCookies");

  // --- MODAL LOGIC ---
  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // --- FORM SUBMISSION & WHATSAPP REDIRECT ---
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successBox.classList.add("active");

        const name = form.name.value;
        const service = form.service.value;
        const message = form.message.value;
        
        const whatsappMsg = `Hello, my name is ${name}. I am interested in ${service}. ${message}`;
        const whatsappURL = `https://wa.me/250790003339?text=${encodeURIComponent(whatsappMsg)}`;

        setTimeout(() => {
          window.open(whatsappURL, "_blank");
        }, 1500);

        form.reset();
        
        setTimeout(() => {
          successBox.classList.remove("active");
          closeModal();
          submitBtn.innerText = originalText;
        }, 3000);
        
      } else {
        alert("Oops! There was a problem.");
        submitBtn.innerText = originalText;
      }
    } catch (error) {
      alert("Error sending message.");
      submitBtn.innerText = originalText;
    }
  });

  // --- COOKIE POPUP ---
  const accepted = localStorage.getItem("cookiesAccepted");
  if (!accepted && cookiePopup) {
    cookiePopup.style.display = "flex";
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookiePopup.style.opacity = "0";
      setTimeout(() => {
        cookiePopup.style.display = "none";
      }, 300);
    });
  }
}); // THIS CLOSES THE DOMCONTENTLOADED BLOCK
