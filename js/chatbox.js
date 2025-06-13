/**
 * WhatsApp Chatbox - Funcionalidad
 * Script para manejar la interacción del chat de WhatsApp
 */
class WhatsAppChat {
  constructor() {
    // Elementos del DOM
    this.bubble = document.getElementById("whatsapp-float"); // Botón flotante
    this.chatbox = document.getElementById("whatsapp-chatbox"); // Ventana de chat
    this.closeBtn = document.getElementById("close-chatbox"); // Botón para cerrar
    this.sendBtn = document.getElementById("send-message"); // Botón para abrir WhatsApp real
    this.chatContent = document.getElementById("chatbox-content"); // Área de mensajes

    this.isOpen = false; // Estado del chat

    this.whatsappNumber = "56923878557"; // Teléfono al que se enviarán los mensajes

    this.initEvents(); // Inicializar eventos
  }

  // Inicializa los eventos de clic
  initEvents() {
    this.bubble.addEventListener("click", () => this.toggleChat()); // Mostrar/ocultar chat
    this.closeBtn.addEventListener("click", () => this.toggleChat()); // Cerrar chat
    this.sendBtn.addEventListener("click", () => this.openWhatsApp()); // Enviar mensaje real a WhatsApp
  }

  // Alternar apertura/cierre del chat
  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.chatbox.classList.add("active");
      this.bubble.classList.add("clicked"); // Añadir 'clicked' al abrir

      // Solo simular conversación una vez
      if (!this.chatbox.dataset.initiated) {
        this.chatbox.dataset.initiated = "true";
        this.simulateConversation();
      }
    } else {
      this.chatbox.classList.remove("active");
      this.bubble.classList.remove("clicked"); // Remover 'clicked' al cerrar
    }
  }

  // Abrir enlace a WhatsApp real
  openWhatsApp() {
    const whatsappURL = `https://api.whatsapp.com/send?phone=${
      this.whatsappNumber
    }&text=${encodeURIComponent("¡Hola! Quisiera obtener más información.")}`;
    window.open(whatsappURL, "_blank");
  }

  // Simulación de conversación automática
  simulateConversation() {
    this.showTypingIndicator(); // Mostrar "escribiendo..."

    setTimeout(() => {
      this.removeTypingIndicator(); // Quitar indicador
      this.addMessage(
        "¡Hola! 👋 Bienvenido a SitioPet 🐾 ¿En qué puedo ayudarte?",
        "received"
      );

      // Simular mensaje del usuario con efecto de escritura
      setTimeout(() => {
        this.simulateUserMessage("¿Tienen alimento para gatos esterilizados?");

        // Continuar conversación automática
        setTimeout(() => {
          this.showTypingIndicator();

          setTimeout(() => {
            this.removeTypingIndicator();
            this.addMessage(
              "¡Sí! Tenemos varias marcas como Royal Canin y ProPlan. ¿Deseas una recomendación?",
              "received"
            );
          }, 1500);
        }, 2500);
      }, 2000);
    }, 1500);
  }

  // Simula el mensaje del usuario con efecto de "escribiendo..."
  simulateUserMessage(text) {
    this.showTypingIndicator("sent"); // Mostrar escribiendo del usuario

    setTimeout(() => {
      this.removeTypingIndicator(); // Quitar escribiendo
      this.addMessage(text, "sent"); // Mostrar mensaje como enviado
    }, 1200);
  }

  // Mostrar indicador de escritura (por defecto como recibido)
  showTypingIndicator(type = "received") {
    const typingDiv = document.createElement("div");
    typingDiv.className = `message ${type} typing-indicator`;
    typingDiv.id = "typing-indicator";

    const typingTextDiv = document.createElement("div");
    typingTextDiv.className = "message-text";

    // Tres puntos animados
    const dots = document.createElement("span");
    dots.className = "typing-dots";
    dots.innerHTML = `<span>.</span><span>.</span><span>.</span>`;

    typingTextDiv.appendChild(dots);
    typingDiv.appendChild(typingTextDiv);

    this.chatContent.appendChild(typingDiv);
    this.scrollToBottom(); // Hacer scroll al fondo
  }

  // Eliminar indicador de escritura
  removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Agrega un mensaje al chat con hora y tipo (sent/received)
  addMessage(text, type = "received") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${type}`;

    const textDiv = document.createElement("div");
    textDiv.className = "message-text";
    const p = document.createElement("p");
    p.innerText = text;
    textDiv.appendChild(p);

    const timeSpan = document.createElement("span");
    timeSpan.className = "message-time";
    timeSpan.innerText = this.getCurrentTime();

    msgDiv.appendChild(textDiv);
    msgDiv.appendChild(timeSpan);

    this.chatContent.appendChild(msgDiv);
    this.scrollToBottom(); // Desplazar hacia el fondo
  }

  // Obtener la hora actual en formato HH:MM
  getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Hacer scroll automático al fondo del chat
  scrollToBottom() {
    this.chatContent.scrollTop = this.chatContent.scrollHeight;
  }
}
