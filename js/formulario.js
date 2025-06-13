document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos referencias a los elementos del DOM
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-button");
  const buttonText = submitButton.querySelector(".button-text");
  // Si tienes un icono dentro del botón y quieres controlarlo, déjalo. Si no, puedes eliminar esta línea.
  const buttonIcon = submitButton.querySelector(".button-icon");
  const spinner = submitButton.querySelector(".spinner-border"); // Asume que estás usando clases de Bootstrap para el spinner
  const loadingText = submitButton.querySelector(".loading-text");
  const formMessages = document.getElementById("form-messages"); // El div para mostrar mensajes de estado

  // ** TUS IDs REALES DE EMAILJS **
  // Asegúrate de que estos valores coincidan exactamente con los de tu cuenta de EmailJS.
  const SERVICE_ID = "service_uyyvcvm"; // Tu Service ID de EmailJS (ej. "Gmail")
  const TEMPLATE_ID = "template_1phjia1"; // Tu Template ID de la plantilla de EmailJS ("Contáctenos")
  const PUBLIC_KEY = "s0x5mSbli-8I09f0h"; // Tu Public Key (también conocida como User ID) de EmailJS

  // Inicializa la librería de EmailJS con tu Public Key.
  // Esto se hace una única vez al cargar la página.
  emailjs.init(PUBLIC_KEY);

  // Añadimos un "escuchador de eventos" al formulario para cuando se intente enviar.
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga la página).

    // --- INICIO: Control de UI durante el envío ---
    // 1. Deshabilitar el botón de envío para evitar clics múltiples.
    submitButton.disabled = true;

    // 2. Ocultar el texto y el icono del botón, y mostrar el spinner y el texto de carga.
    buttonText.classList.add("d-none");
    if (buttonIcon) {
      // Verificamos si el icono existe antes de intentar ocultarlo
      buttonIcon.classList.add("d-none");
    }
    spinner.classList.remove("d-none");
    loadingText.classList.remove("d-none");

    // 3. Limpiar cualquier mensaje de estado anterior.
    formMessages.textContent = "";
    formMessages.classList.remove("alert", "alert-success", "alert-danger"); // Limpia clases de estilo de Bootstrap
    // --- FIN: Control de UI durante el envío ---

    // Recopilamos los datos de los campos del formulario.
    // Los nombres de las propiedades (name, phone, email, textarea) deben coincidir con los placeholders {{...}} en tu plantilla de EmailJS.
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      textarea: document.getElementById("textarea").value,
    };

    // Enviamos el correo usando EmailJS.
    // send(serviceID, templateID, templateParams)
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData)
      .then(
        function () {
          // Si el envío fue exitoso:
          formMessages.textContent =
            "¡Mensaje enviado con éxito! Te contactaremos pronto.";
          formMessages.classList.add("alert", "alert-success"); // Añade clases para un estilo de éxito (Bootstrap)

          // ** MODIFICADO: Deshabilitar todos los campos del formulario **
          const formElements = form.elements; // Obtiene todos los elementos del formulario (inputs, textareas, selects, etc.)
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            // Deshabilita todos los elementos excepto los que son de tipo 'submit'
            // El botón de submit ya está deshabilitado por `submitButton.disabled = true;` al inicio.
            if (element.type !== "submit") {
              element.disabled = true;
            }
          }

          // ** ELIMINADO: form.reset(); ** (Para que los valores se mantengan)

          // El botón de envío se mantendrá deshabilitado y en estado "Enviando..."
          // para forzar la recarga de la página si se quiere enviar otro.
          // No necesitamos habilitarlo de nuevo en caso de éxito.
        },
        function (error) {
          // Si hubo un error durante el envío:
          console.error("Error al enviar el mensaje:", error);
          formMessages.textContent =
            "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
          formMessages.classList.add("alert", "alert-danger"); // Añade clases para un estilo de error (Bootstrap)

          // ** MODIFICADO: Restaurar UI solo en caso de error para permitir reintentar **
          submitButton.disabled = false;
          buttonText.classList.remove("d-none");
          if (buttonIcon) {
            buttonIcon.classList.remove("d-none");
          }
          spinner.classList.add("d-none");
          loadingText.classList.add("d-none");
        }
      )
      .finally(function () {
        // Este bloque se ejecuta SIEMPRE, ya sea éxito o error.
        // Si el envío fue exitoso, ya no restauramos el UI del botón aquí,
        // porque queremos que el botón y los campos se queden deshabilitados.
        // La lógica de restauración en caso de error ya se movió al bloque 'function(error)'.
      });
  });
});
