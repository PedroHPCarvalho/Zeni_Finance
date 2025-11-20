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
      {/* Header padrão */}
      <div className={styles.header}>
        <span className={styles.title}>Filtrar Data Registros</span>
      </div>

      {/* Área de conteúdo padrão */}
      <div className={styles.children}>
        <div className={styles.filters}>

          <input
            type="month"
            className={styles.input}
            value={month && year ? `${year}-${month}` : ""}
            onChange={(e) => {
              const [y, m] = e.target.value.split("-");
              setYear(y);
              setMonth(m);
            }}
          />

          <button className={styles.applyBtn} onClick={handleApply}>
            Aplicar
          </button>

        </div>
      </div>
    </div>
  );
}
