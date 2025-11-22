import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Card/ChatRegisterCard.module.css";
import { useChatRegister } from "../hooks/useChatRegister";

export default function ChatRegisterCard({ onSubmit }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { sendToIA, loading: loadingIA } = useChatRegister();

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loadingIA) return;

    const userText = input;

    // adiciona msg do usuário
    const userMessage = {
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // =============== CHAMADA REAL PARA IA ==================
    const iaResult = await sendToIA(userText);

    // caso a IA não entenda
    if (!iaResult) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Desculpe, não consegui entender o registro.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setLoading(false);
      return;
    }

    // Mensagem de sucesso da IA
    const aiMessage = {
      sender: "ai",
      text: "Registro detectado! Já inseri no seu Histórico.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, aiMessage]);

    // retorna o registro para ser inserido no histórico
    onSubmit(iaResult);

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
