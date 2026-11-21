import express from "express";
import { knowledge } from "./knowledge.mjs";
/* global console, fetch, process, URL */

const contactReply = "Sorry, I can only help with FlexPulse questions. For anything else, please visit our Contact Us page.";
const safetyReply = "I can share general FlexPulse information, but I can’t provide medical advice. Please review the Contraindications page and speak with a qualified healthcare professional or our support team.";
const scopeTerms = /\b(flexpulse|pemf|pulsed electromagnetic|coil|applicator|gauss|frequency|hz|program|charger|charging|battery|warranty|guarantee|return|refund|shipping|order|delivery|privacy|personal data|cookie|cookies|tracking|terms|international|import duties|rma|blog|research|science|engineering|contraindication|wellness)\b/i;
const medicalTerms = /\b(pacemaker|defibrillator|cochlear implant|implant|pregnan|medical condition|diagnos|treat|cure|prescri|doctor|pain|bleeding|graves|organ transplant)\b/i;
const presentationTypes = new Set(["text", "visual_explanation", "product_overview", "steps", "specifications", "troubleshooting", "safety"]);

function responsePresentation(message) {
  const question = message.toLowerCase();
  if (/\b(safe|safety|contraindication|implant|pregnan)\b/.test(question)) return "safety";
  if (/\b(what is pemf|how does pemf|electromagnetic field|frequency|hertz|hz)\b/.test(question)) return "visual_explanation";
  if (/\b(specification|specs|gauss|dimension|weight|battery life|warranty)\b/.test(question)) return "specifications";
  if (/\b(how do i use|how to use|set up|setup|program)\b/.test(question)) return "steps";
  if (/\b(not working|turn on|won't|wont|troubleshoot|charging issue)\b/.test(question)) return "troubleshooting";
  if (/\b(flexpulse g2|the device|product|cost|price|shop)\b/.test(question)) return "product_overview";
  return "text";
}

export function isFlexPulseQuestion(message) {
  return scopeTerms.test(message) || knowledge.some((item) => item.text.toLowerCase().includes(message.toLowerCase()));
}

export function isMedicalQuestion(message) {
  return medicalTerms.test(message);
}

export function findKnowledge(message) {
  const terms = message.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return knowledge
    .map((item) => ({ ...item, score: terms.reduce((score, term) => score + (item.text.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4);
}

function cleanMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 12) return null;
  const cleaned = messages
    .filter((message) => message && ["user", "assistant"].includes(message.role) && typeof message.content === "string")
    .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 1200) }))
    .filter((message) => message.content);
  return cleaned.length ? cleaned : null;
}

export function createApp() {
  const app = express();
  const requests = new Map();
  app.use(express.json({ limit: "8kb" }));

  app.post("/api/chat", async (req, res) => {
    const messages = cleanMessages(req.body?.messages);
    const latest = messages?.filter((message) => message.role === "user").at(-1)?.content;
    if (!latest) return res.status(400).json({ error: "Send a message to start the chat." });

    const key = req.ip;
    const now = Date.now();
    const recent = (requests.get(key) ?? []).filter((time) => now - time < 60_000);
    if (recent.length >= 15) return res.status(429).json({ error: "Please wait a minute before sending more messages." });
    requests.set(key, [...recent, now]);

    if (isMedicalQuestion(latest)) return res.json({ message: safetyReply, link: "/contraindications", presentation: "safety" });
    if (!isFlexPulseQuestion(latest)) return res.json({ message: contactReply, link: "/contact" });
    if (!process.env.GROQ_API_KEY) return res.status(503).json({ error: "Chat is not configured yet. Please add GROQ_API_KEY to .env." });

    const context = findKnowledge(latest).map((item) => `- ${item.title}: ${item.text}`).join("\n");
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
          temperature: 0.2,
          max_tokens: 350,
          messages: [
            {
              role: "system",
              content: `You are the FlexPulse website assistant. Only answer questions about FlexPulse products, use, support, blogs, science, and engineering. Use only the provided context. Do not diagnose, treat, promise health outcomes, or give personalized medical advice. If the context does not answer a FlexPulse question, say you do not know and direct the user to Contact Us. Keep replies concise.\n\nContext:\n${context}`,
            },
            ...messages,
          ],
        }),
      });
      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content;
      if (!response.ok || !answer) throw new Error(data.error?.message || "Groq did not return an answer.");
       const presentation = responsePresentation(latest);
       return res.json({ message: answer, presentation: presentationTypes.has(presentation) ? presentation : "text" });
    } catch (error) {
      console.error("Chat request failed:", error);
      return res.status(502).json({ error: "The chat is temporarily unavailable. Please try again or visit Contact Us." });
    }
  });

  return app;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  createApp().listen(process.env.CHAT_PORT || 8787, () => console.log(`Chat API listening on http://localhost:${process.env.CHAT_PORT || 8787}`));
}
