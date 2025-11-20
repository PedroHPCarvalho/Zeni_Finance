import React, { useState } from "react";
import styles from "../styles/Card/FilterCard.module.css";

export default function FilterCard({ categories = [], onFilter }) {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleApply = () => {
    onFilter({ type, category, month, year });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>Filtrar Registros</div>
      <div className={styles.filters}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Tipo</option>
          <option value="DESPESA">Despesa</option>
          <option value="RECEITA">Receita</option>
          <option value="INVESTIMENTO">Investimento</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categoria</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="month"
          value={month && year ? `${year}-${month}` : ""}
          onChange={(e) => {
            const [y, m] = e.target.value.split("-");
            setYear(y);
            setMonth(m);
          }}
        />

        <button onClick={handleApply}>Aplicar</button>
      </div>
    </div>
  );
}
