import { CreateMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

// 🔹 Charge un modèle local (petit pour démarrer)
const engine = await CreateMLCEngine("Llama-3-8B-Instruct-q4f16_1", {

  initProgressCallback: (progress) => {
    messages.innerHTML = `<p>Chargement du modèle... ${Math.round(progress.progress * 100)}%</p>`;
  },
});

messages.innerHTML = "<p>✅ Modèle chargé ! Commence à discuter 👇</p>";

// 🔹 Liste de messages (contexte)
let chatHistory = [];

async function handleSend() {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  // Affiche le message utilisateur
  addMessage(text, "user");

  chatHistory.push({ role: "user", content: text });

  // 🔹 Génère une réponse IA
  addMessage("...", "bot");
  const replyIndex = messages.children.length - 1;

  const reply = await engine.chat.completions.create({
    messages: chatHistory,
  });

  const botResponse = reply.choices[0].message.content;
  messages.children[replyIndex].textContent = botResponse;

  chatHistory.push({ role: "assistant", content: botResponse });
}

sendBtn.addEventListener("click", handleSend);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSend();
});

function addMessage(content, cls) {
  const div = document.createElement("div");
  div.classList.add("message", cls);
  div.textContent = content;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

