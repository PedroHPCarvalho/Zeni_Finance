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
      <div className={styles.header}>Filtrar Data Registros</div>
      <div className={styles.filters}>

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
