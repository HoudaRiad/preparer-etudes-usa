// ---- DARK MODE ----
const toggleDarkMode = document.getElementById("darkModeToggle");

// Vérifie si l'utilisateur avait déjà activé le mode sombre
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    toggleDarkMode.textContent = "☀️ Mode clair";
  } else {
    localStorage.setItem("darkMode", "disabled");
    toggleDarkMode.textContent = "🌙 Mode sombre";
  }
});
document.addEventListener('DOMContentLoaded', () => {

  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    // afficher/cacher en fonction du scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    // action au clic
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
function setupGallery() {
  const images = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt;
      lightbox.classList.add('show');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
    }
  });
}
function setupFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = form.querySelector('[name="from_name"]');
  const emailInput = form.querySelector('[name="reply_to"]');
  const messageInput = form.querySelector('[name="message"]');
  const status = document.getElementById('form-status');

  // Regex stricte pour email (style international)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.removeAttribute("aria-invalid");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    // Vérifie Nom
    if (nameInput.value.trim() === "") {
      showError(nameInput, "error-name", "Veuillez entrer votre nom.");
      valid = false;
    } else {
      clearError(nameInput, "error-name");
    }

    // Vérifie Email
    if (emailInput.value.trim() === "") {
      showError(emailInput, "error-email", "Veuillez entrer votre email.");
      valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "error-email", "Adresse email invalide.");
      valid = false;
    } else {
      clearError(emailInput, "error-email");
    }

    // Vérifie Message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "error-message", "Veuillez entrer un message.");
      valid = false;
    } else {
      clearError(messageInput, "error-message");
    }

    // Si valide → Envoi EmailJS
    if (valid) {
      status.textContent = "⏳ Envoi en cours...";
      status.style.color = "blue";

      emailjs.sendForm("service_houda2004", "template_nrlkdjm", form, "RZ-gzyhpRYGDSohWc")
        .then(() => {
          status.textContent = "✅ Message envoyé avec succès !";
          status.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          console.error("Erreur:", error);
          status.textContent = "❌ Erreur lors de l’envoi : " + error.text;
          status.style.color = "red";
        });
    } else {
      status.textContent = "❌ Merci de corriger les erreurs avant de continuer.";
      status.style.color = "red";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupFormValidation();
});

