import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Card/ChatRegisterCard.module.css";

export default function ChatRegisterCard({ onSubmit }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Mock IA
      const responseText = `Entendi! Vou registrar isso para você:\n"${input}"`;

      setTimeout(() => {
        const aiMessage = {
          sender: "ai",
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setMessages(prev => [...prev, aiMessage]);

        // Registro mockado
        onSubmit([
          {
            description: "Gasto detectado IA",
            category: "ALIMENTACAO",
            value: 42.5,
            typeRegister: "DESPESA",
            dateRegister: new Date().toISOString(),
          }
        ]);

        setLoading(false);
      }, 900);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.botAvatar}>🤖</div>
        <div>
          <p className={styles.botName}>ZeniBot - Inserir Registro</p>
          <span className={styles.botStatus}>Online</span>
        </div>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.msgText}>{msg.text}</div>
            <div className={styles.msgTime}>{msg.time}</div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.aiMessage}`}>
            <div className={styles.typing}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          placeholder="Descreva seu gasto... (Ex: 'gastei 30 reais no mercado')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />

        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
