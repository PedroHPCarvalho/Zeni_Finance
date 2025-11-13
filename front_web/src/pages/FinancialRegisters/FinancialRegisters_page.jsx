import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  MessageCircle,
  Send,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "../../styles/FinancialRegisters/FinancialRegisters_page.module.css";

export default function FinancialRegisters_page() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const menuRef = useRef(null);

  const registros = [
    { id: 1, tipo: "Entrada", categoria: "Salário", valor: 3500, data: "2025-09-30" },
    { id: 2, tipo: "Saída", categoria: "Aluguel", valor: 1200, data: "2025-10-04" },
    { id: 3, tipo: "Saída", categoria: "Mercado", valor: 650, data: "2025-10-06" },
    { id: 4, tipo: "Entrada", categoria: "Salário", valor: 3500, data: "2025-09-30" },
    { id: 5, tipo: "Saída", categoria: "Aluguel", valor: 1200, data: "2025-10-04" },
    { id: 6, tipo: "Saída", categoria: "Mercado", valor: 650, data: "2025-10-06" },
    { id: 7, tipo: "Entrada", categoria: "Salário", valor: 3500, data: "2025-09-30" },
    { id: 8, tipo: "Saída", categoria: "Aluguel", valor: 1200, data: "2025-10-04" },
    { id: 9, tipo: "Saída", categoria: "Mercado", valor: 650, data: "2025-10-06" },
    { id: 10, tipo: "Saída", categoria: "Aluguel", valor: 1200, data: "2025-10-04" },
    { id: 11, tipo: "Saída", categoria: "Mercado", valor: 650, data: "2025-10-06" },
  ];

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botResponse = {
      sender: "bot",
      text: "Posso ajudar a organizar suas finanças, criar relatórios ou registrar novas entradas! 💰",
    };
    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        {/* HEADER */}
        <header className={styles.dashboardHeader}>
          <div className={styles.headerLeft}>
            <h1>Bem-vindo, PedroCarvalho2 📅</h1>
            <p>Registros Financeiros</p>
          </div>

          <div className={styles.userMenu} ref={menuRef}>
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className={styles.userButton}
            >
              <Settings size={20} />
              <span>Opções</span>
            </button>

            <div
              className={`${styles.userDropdown} ${
                menuAberto ? styles.show : ""
              }`}
            >
              <ul>
                <li onClick={() => navigate("/dashboard")}>
                  <Settings size={16} /> Resumo Financeiro
                </li>
                <li
                  className={styles.logout}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  <LogOut size={16} /> Sair
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* CARDS RESUMO */}
        <div className={styles.cardsGrid}>
          <div className={styles.cardResumo}>
            <div>
              <p>Entradas</p>
              <h2 style={{ color: "#00ffb3" }}>R$ 3.500,00</h2>
            </div>
            <ArrowUpRight size={22} color="#00ffb3" />
          </div>

          <div className={styles.cardResumo}>
            <div>
              <p>Saídas</p>
              <h2 style={{ color: "#ff7070" }}>R$ 1.850,00</h2>
            </div>
            <ArrowDownRight size={22} color="#ff7070" />
          </div>

          <div className={styles.cardResumo}>
            <div>
              <p>Saldo Atual</p>
              <h2 style={{ color: "#ffd84d" }}>R$ 1.650,00</h2>
            </div>
            <BarChart2 size={22} color="#ffd84d" />
          </div>
        </div>

        {/* CHAT ZENI */}
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <MessageCircle size={20} />
            <h3>Zeni – Sua Assistente Financeira</h3>
          </div>
          <div className={styles.chatMessages}>
            {messages.length === 0 ? (
              <p className={styles.chatPlaceholder}>
                Olá! 👋 Eu sou a Zeni, sua assistente financeira inteligente.  
                Como posso ajudar você hoje?
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.chatBubble} ${
                    msg.sender === "user" ? styles.userBubble : styles.botBubble
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Pergunte algo sobre suas finanças..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* TABELA DE REGISTROS */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div>
              <h2>Registros Financeiros</h2>
              <p>Seus lançamentos mais recentes</p>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TIPO</th>
                  <th>CATEGORIA</th>
                  <th>VALOR</th>
                  <th>DATA</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((r) => (
                  <tr key={r.id} className={styles.tableRow}>
                    <td>{r.id}</td>
                    <td
                      className={
                        r.tipo === "Entrada"
                          ? styles.tipoEntrada
                          : styles.tipoSaida
                      }
                    >
                      {r.tipo}
                    </td>
                    <td>{r.categoria}</td>
                    <td>R$ {r.valor.toFixed(2)}</td>
                    <td className={styles.dataCell}>{formatDate(r.data)}</td>
                    <td className={styles.actionsCell}>
                      <button className={styles.deleteButton}>
                        <X size={18} color="#ff4d4d" strokeWidth={3} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button disabled>◀ Anterior</button>
            <span>Página 1 de 1</span>
            <button disabled>Próxima ▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}
