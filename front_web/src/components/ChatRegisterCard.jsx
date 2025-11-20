import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Card/ChatRegisterCard.module.css";

export default function ChatRegisterCard({ onSubmit }) {
  const [messages, setMessages] = useState([]); // histórico de mensagens
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Aqui você chamaria a função de IA para processar a mensagem
      // Ex: const responseText = await sendToAI(input);
      const responseText = `Processado IA: "${input}"`; // mock temporário

      const aiMessage = { sender: "ai", text: responseText };
      setMessages(prev => [...prev, aiMessage]);

      // Exemplo de criar registro a partir da resposta
      onSubmit([
        {
          description: "Gasto detectado IA",
          category: "ALIMENTACAO",
          value: 100,
          typeRegister: "DESPESA",
          dateRegister: new Date().toISOString(),
        }
      ]);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.card}>
      <span className={styles.title}>Registrar gastos via Chatbot</span>
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.userMessage : styles.aiMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputArea}>
        <textarea
          placeholder="Digite seu gasto..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Processando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
