import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Card/ChatRegisterCard.module.css";
import { useChatRegister } from "../hooks/useChatRegister";

export default function ChatRegisterCard({ onRefetch }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const chatWindowRef = useRef(null); // ref do container de mensagens

  const { sendToIA } = useChatRegister();

  // scroll automático apenas do chat
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]); // roda sempre que mensagens mudarem

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    // mensagem do usuário
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    // envia para IA
    const success = await sendToIA(userText);

    // mensagem do bot
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: success ? "Registro detectado! Já inseri no seu Histórico." : "Ops! Não consegui processar o registro.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    // refetch do histórico
    if (success && onRefetch) await onRefetch();

    setLoading(false);

    // mantém o foco no textarea
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
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

      {/* Container do chat com scroll */}
      <div className={styles.chatWindow} ref={chatWindowRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.aiMessage}`}
          >
            <div className={styles.msgText}>{msg.text}</div>
            <div className={styles.msgTime}>{msg.time}</div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.aiMessage}`}>
            <div className={styles.typing}><span></span><span></span><span></span></div>
          </div>
        )}
      </div>

      <div className={styles.inputArea}>
        <textarea
          ref={inputRef}
          placeholder="Descreva seu gasto... (Ex: 'gastei 30 reais no mercado')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading} onMouseDown={(e) => e.preventDefault()}>
          {loading ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
