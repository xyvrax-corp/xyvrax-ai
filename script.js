// --- Configuration ---
const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-small";

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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();
    chatBox.removeChild(thinkingMsg);

    // 🧠 Diagnostic : on affiche dans la console ce que renvoie le modèle
    console.log("Réponse Hugging Face :", data);

    let text = "Je n'ai pas compris 😅";

    // Certains modèles renvoient directement un texte dans generated_text
    if (Array.isArray(data) && data[0]) {
      text =
        data[0].generated_text ||
        data[0].summary_text ||
        data[0].output_text ||
        JSON.stringify(data[0]);
    } else if (data.generated_text) {
      text = data.generated_text;
    } else if (data.error) {
      text = "⚠️ Le modèle est en cours de chargement, réessaie dans 10 secondes.";
    }

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
