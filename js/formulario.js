document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos referencias a los elementos del DOM
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("submit-button");
  const buttonText = submitButton.querySelector(".button-text");
  // Si tienes un icono dentro del botón y quieres controlarlo, déjalo. Si no, puedes eliminar esta línea.
  const buttonIcon = submitButton.querySelector(".button-icon"); // Asegúrate de que este elemento exista en tu HTML si lo usas
  const spinner = submitButton.querySelector(".spinner-border"); // Asume que estás usando clases de Bootstrap para el spinner
  const loadingText = submitButton.querySelector(".loading-text");
  const formMessages = document.getElementById("form-messages"); // El div para mostrar mensajes de estado

  // ** TUS IDs REALES DE EMAILJS **
  // Asegúrate de que estos valores coincidan exactamente con los de tu cuenta de EmailJS.
  const SERVICE_ID = "service_ai83nji"; // Tu Service ID de EmailJS (ej. "Gmail")
  const TEMPLATE_ID = "template_f3yqtis"; // Tu Template ID de la plantilla de EmailJS ("Contáctenos")
  const PUBLIC_KEY = "sGuX6BIXcQayFWDnK"; // Tu Public Key (también conocida como User ID) de EmailJS

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
      buttonIcon.classList.add("d-none");
    }
    spinner.classList.remove("d-none");
    loadingText.classList.remove("d-none");

    // 3. Limpiar cualquier mensaje de estado anterior.
    formMessages.textContent = "";
    formMessages.classList.remove("alert", "alert-success", "alert-danger"); // Limpia clases de estilo de Bootstrap
    // --- FIN: Control de UI durante el envío ---

    // Recopilamos los datos de los campos del formulario.
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      textarea: document.getElementById("textarea").value,
    };

    // Enviamos el correo usando EmailJS.
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData)
      .then(
        function () {
          // Si el envío fue exitoso:
          formMessages.innerHTML = `
            <div class="alert alert-success d-flex align-items-center justify-content-center" role="alert">
                <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span> <i class="bi bi-check-circle-fill ms-1"></i>
            </div>
          `;

          // formMessages.textContent =
          //   "¡Mensaje enviado con éxito! Te contactaremos pronto.";
          // formMessages.classList.add("alert", "alert-success"); // Añade clases para un estilo de éxito (Bootstrap)

          // Deshabilitar todos los campos del formulario
          const formElements = form.elements;
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.type !== "submit") {
              element.disabled = true;
            }
          }

          // ** NUEVO: Cambiar el texto del botón a "Enviado" y ocultar spinner/texto de carga **
          buttonText.textContent = "Enviado"; // Cambia el texto del botón
          buttonText.classList.remove("d-none"); // Muestra el texto "Enviado"
          spinner.classList.add("d-none"); // Oculta el spinner
          loadingText.classList.add("d-none"); // Oculta el texto "Enviando..."
          // El botón ya está deshabilitado, y queremos que siga así.
        },
        function (error) {
          // Si hubo un error durante el envío:
          console.error("Error al enviar el mensaje:", error);
          formMessages.textContent =
            "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.";
          formMessages.classList.add("alert", "alert-danger"); // Añade clases para un estilo de error (Bootstrap)

          // Restaurar UI solo en caso de error para permitir reintentar
          submitButton.disabled = false; // Habilita el botón
          buttonText.textContent = "Enviar"; // Vuelve el texto del botón a "Enviar"
          buttonText.classList.remove("d-none"); // Muestra el texto "Enviar"
          if (buttonIcon) {
            buttonIcon.classList.remove("d-none"); // Muestra el icono si existe
          }
          spinner.classList.add("d-none"); // Oculta el spinner
          loadingText.classList.add("d-none"); // Oculta el texto "Enviando..."
        }
      )
      .finally(function () {
        // Este bloque ahora no hace nada si el envío fue exitoso,
        // ya que la lógica de restauración para éxito y error se maneja
        // directamente en sus respectivos bloques .then() y .catch().
        // Podrías eliminar este bloque 'finally' si quieres, ya que no tiene código útil aquí.
      });
  });
});
