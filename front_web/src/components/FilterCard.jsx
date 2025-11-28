// FilterCard.jsx
import React, { useState } from "react";
import styles from "../styles/Card/FilterCard.module.css";

/**
 * FilterCard: envia null quando o usuário limpa o filtro.
 * Envia formato: { mes: 'Sep', ano: 2025 } ao aplicar.
 */
export default function FilterCard({ onFilter }) {
  // guarda valor do input type="month" (yyyy-mm)
  const [monthInput, setMonthInput] = useState("");

  const MONTH_NORM = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const handleApply = () => {
    if (!monthInput) {
      // envia null para limpar
      onFilter(null);
      return;
    }
    const [year, month] = monthInput.split("-");
    const monthIndex = Number(month) - 1;
    const mes = MONTH_NORM[monthIndex];
    onFilter({ mes, ano: Number(year) });
  };

  const clearFilters = () => {
    setMonthInput("");
    onFilter(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}><span className={styles.title}>Filtrar Data Registros</span></div>
      <div className={styles.children}>
        <div className={styles.filters}>
          <input type="month" className={styles.input} value={monthInput} onChange={(e) => setMonthInput(e.target.value)} />
          <button className={styles.applyBtn} onClick={handleApply}>Aplicar</button>
          <button className={styles.clearBtn} onClick={clearFilters}>Limpar</button>
        </div>
      </div>
    </div>
  );
}
