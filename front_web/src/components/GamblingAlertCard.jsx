import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import styles from "../styles/Card/GamblingAlertCard.module.css";

export default function GamblingAlertCard({ amount, onClose }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.alertTitle}>
          <AlertTriangle size={18} />
          <span>Atenção: Gastos com Apostas</span>
        </div>

        <button onClick={handleClose}>
          <X size={16} />
        </button>
      </div>

      <div className={styles.content}>
        <p>
          Você registrou despesas em apostas somando 
          <strong> R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>.
        </p>

        <p>
          <strong>Apostas não são investimentos. </strong>  
          <span>Ganhos são incertos</span> e só aparecem depois de muitas perdas. Não são uma forma segura de aumentar <strong>seu patrimônio</strong> e podem gerar <strong>prejuízos financeiros</strong>, afetar sua <strong>vida pessoal</strong> e <strong>profissional</strong>, além de causar <span>estresse e impactos emocionais</span>. Mesmo valores pequenos podem se acumular e trazer consequências sérias ao longo do tempo.
        </p>

        <p className={styles.helpText}>
          Se estiver difícil controlar, procure apoio. Você não está sozinho:
        </p>

        <div className={styles.links}>
          <a href="https://jogoresponsavel.org.br/" target="_blank">Jogo Responsável</a>
          <a href="https://www.jogadoresanonimos.org.br/" target="_blank">Jogadores Anônimos</a>
          <a href="https://cvv.org.br/" target="_blank">CVV — Apoio 24h</a>
        </div>
      </div>
    </div>
  );
}
