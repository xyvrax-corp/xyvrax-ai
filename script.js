// --- Configuration ---
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";


// --- Sélecteurs DOM ---
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// --- Fonction pour afficher un message ---
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight; // scroll automatique
}

// --- Fonction principale d'appel IA ---
async function getAIResponse(prompt) {
  const thinkingMsg = document.createElement("div");
  thinkingMsg.classList.add("message", "bot");
  thinkingMsg.textContent = "💭 Réflexion en cours...";
  chatBox.appendChild(thinkingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch(
      `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(prompt)}`
    );
    const data = await response.json();

    chatBox.removeChild(thinkingMsg);
    const text = data.response || "Je n'ai pas compris 😅";
    addMessage(text.trim(), "bot");
  } catch (error) {
    chatBox.removeChild(thinkingMsg);
    addMessage("Erreur de connexion à l'IA 😕", "bot");
    console.error(error);
  }
}



// --- Envoi message utilisateur ---
function handleSend() {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  getAIResponse(text);
}

// --- Événements ---
sendBtn.addEventListener("click", handleSend);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});


