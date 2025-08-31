// ---- Configuration EmailJS ----
const EMAILJS_PUBLIC_KEY = "RZ-gzyhpRYGDSohWc";   
const EMAILJS_SERVICE_ID = "service_houda2004";  
const EMAILJS_TEMPLATE_ID = "template_nrlkdjm";   
// --------------------------------

// Initialisation
emailjs.init(EMAILJS_PUBLIC_KEY);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "⏳ Envoi en cours...";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        status.textContent = "✅ Message envoyé avec succès !";
        form.reset();
      })
      .catch((error) => {
        console.error("Erreur:", error);
        status.textContent = "❌ Erreur lors de l’envoi : " + error.text;
      });
  });
});
