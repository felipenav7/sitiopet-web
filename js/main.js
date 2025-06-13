// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el chat de WhatsApp
  const whatsappChat = new WhatsAppChat();

  // Aquí puedes añadir cualquier otra inicialización
  console.log("Widget de WhatsApp inicializado correctamente");
});

// Efecto de revelación para secciones al hacer scroll
const revealSections = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down, .reveal-zoom, .reveal-zoom-large"
);

function revealOnScroll() {
  revealSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Verifica si la sección está dentro del área visible de la ventana

    if (sectionTop < windowHeight - 50) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Llamar a la función al cargar la página

// Boton de menu-toggle ///////////////////////////////////////////////////////////////////////////
const menuToggle = document.querySelector(".menu-togglev2");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// menuToggle.addEventListener("click", () => {
//   menuToggle.classList.toggle("active");
// });

// menuToggle.addEventListener("click", () => {
//   navMenu.classList.toggle("active");
// });

// navLinks.forEach((link) => {
//   link.addEventListener("click", () => {
//     navMenu.classList.remove("active");
//   });
// });

// Función para cerrar el menú y restablecer el botón
const closeNavMenu = () => {
  navMenu.classList.remove("active"); // Oculta el menú
  menuToggle.classList.remove("active"); // Restablece el botón de hamburguesa
};

// Manejador de eventos para el clic del botón de hamburguesa
menuToggle.addEventListener("click", () => {
  // Alterna la clase 'active' tanto en el menú como en el botón.
  // Esto asegura que ambos estados estén siempre sincronizados.
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Agregamos un event listener a cada enlace del menú para cerrarlo al hacer clic
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeNavMenu(); // Llama a la función que cierra el menú y restablece el botón
  });
});

// Opcional: Cerrar el menú si se hace clic fuera de él
// Aseguramos que solo funcione en móvil (cuando el menú está desplegado)
document.addEventListener("click", (event) => {
  // Obtenemos el ancho de la ventana para verificar si estamos en móvil
  const isMobileView = window.innerWidth <= 768; // Usa el mismo breakpoint que tu CSS

  if (isMobileView && navMenu.classList.contains("active")) {
    // Si el clic no es dentro del menú ni en el botón de toggle
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeNavMenu();
    }
  }
});

// Opcional: Cerrar el menú al presionar la tecla 'Escape'
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("active")) {
    closeNavMenu();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Efecto de escritura y borrado continuo para el texto "Envianos un mensaje"

const texto = "Envíanos un mensaje";
const typewriter = document.getElementById("typewriter");
let index = 0;
let escribiendo = true; // true = escribiendo, false = borrando

function escribirBorrar() {
  if (escribiendo) {
    // Escribiendo letra por letra
    if (index < texto.length) {
      typewriter.textContent += texto.charAt(index);
      index++;
      setTimeout(escribirBorrar, 100); // Velocidad de escritura
    } else {
      escribiendo = false;
      setTimeout(escribirBorrar, 2500); // Esperar 2.5 segundos antes de borrar
    }
  } else {
    // Borrando letra por letra
    if (index > 0) {
      typewriter.textContent = texto.substring(0, index - 1);
      index--;
      setTimeout(escribirBorrar, 50); // Velocidad de borrado (más rápido)
    } else {
      escribiendo = true;
      setTimeout(escribirBorrar, 1500); // Esperar 1.5 segundos antes de escribir otra vez
    }
  }
}

// Limpia primero el texto del h3
typewriter.textContent = "";
escribirBorrar();

// Espera a que todo el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los botones flotantes o íconos relevantes
  const targets = [];

  // Agregamos el botón flotante de WhatsApp si existe
  const floatBtn = document.querySelector(".whatsapp-float");
  if (floatBtn) targets.push(floatBtn);

  // Agregamos todos los íconos dentro de la lista de redes sociales
  document.querySelectorAll(".social-links a").forEach((el) => {
    targets.push(el);
  });

  // Para cada botón o ícono que queremos afectar
  targets.forEach((btn) => {
    const icon = btn.querySelector("i");
    let hovered = false;

    // Cuando el mouse entra, activamos la bandera
    btn.addEventListener("mouseenter", () => {
      hovered = true;
    });

    // Cuando el mouse sale
    btn.addEventListener("mouseleave", () => {
      if (!hovered) return;

      // Esperamos un frame para asegurarnos de que se aplicó la animación
      requestAnimationFrame(() => {
        const style = getComputedStyle(btn);
        const matrix = new WebKitCSSMatrix(style.transform);

        // Verificamos si el botón subió al menos -7.5px (el pico)
        if (matrix.m42 <= -8) {
          icon.classList.add("rotate-on-peak");
          setTimeout(() => icon.classList.remove("rotate-on-peak"), 300);
        }
      });

      hovered = false;
    });
  });
});

const mainHeader = document.querySelector(".header");

let lastScroll = 0;

// Función para verificar si está en vista móvil
function isMobile() {
  return window.innerWidth <= 768;
}

window.addEventListener("scroll", () => {
  if (isMobile()) return; // ⛔ Salir si es móvil

  const currentScroll = window.scrollY;

  if (currentScroll > 200 && lastScroll <= currentScroll) {
    mainHeader.classList.remove("slideup");
    mainHeader.classList.add("slidedown");
  } else if (currentScroll < 200 && lastScroll > currentScroll) {
    mainHeader.classList.remove("slidedown");
    mainHeader.classList.add("slideup");
  }

  if (currentScroll < 100) {
    mainHeader.classList.remove("slidedown", "slideup");
  }

  lastScroll = currentScroll;
});

// Cambio de horario en topbar

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".slider-clock .slider-item");
  let currentItem = 0;

  function showItem(index) {
    // Primero ocultar todos inmediatamente
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.display = "none";
      item.classList.remove("active");
    });

    // Después, mostrar solo el activo
    const activeItem = items[index];
    activeItem.style.display = "inline";

    // Un pequeño delay para que el navegador registre el cambio de display
    setTimeout(() => {
      activeItem.style.opacity = "1";
      activeItem.classList.add("active");
    }, 10);
  }

  showItem(currentItem);

  setInterval(() => {
    currentItem = (currentItem + 1) % items.length;
    showItem(currentItem);
  }, 10000);
});

// const form = document.getElementById("contact-form");

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   emailjs.sendForm("service_8etcdzj", "template_1phjia1", this).then(
//     () => {
//       alert("Mensaje enviado con éxito. ¡Gracias!");
//       form.reset();
//     },
//     (error) => {
//       alert("Error al enviar el mensaje: " + JSON.stringify(error));
//     }
//   );
// });
