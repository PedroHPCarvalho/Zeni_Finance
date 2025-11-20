import React, { useState } from "react";
import { X } from "lucide-react";
import styles from "../styles/Card/GamblingAlertCard.module.css";

export default function GamblingAlertCard({ amount, onClose }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>Atenção: Gastos com Casas de Aposta</span>
        <button onClick={() => { setVisible(false); onClose && onClose(); }}>
          <X size={18} />
        </button>
      </div>
      <div className={styles.content}>
        Total gasto: <strong>R$ {amount.toLocaleString("pt-BR", {minimumFractionDigits:2})}</strong>
      </div>
    </div>
  );
}
