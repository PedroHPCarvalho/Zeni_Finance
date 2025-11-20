import React from "react";
import { Trophy } from "lucide-react";
import styles from "../styles/Card/TopCategoriesCard.module.css";

export default function TopCategoriesCard({ title, data = [], type = "DESPESA" }) {
  // Calcular total geral
  const total = data.reduce((sum, item) => sum + item.total, 0);

  // Função para cor do tipo
  const getTypeColor = () => {
    switch (type.toUpperCase()) {
      case "DESPESA":
        return "#F44336"; // vermelho
      case "RECEITA":
        return "#4CAF50"; // verde
      case "INVESTIMENTO":
        return "#2196F3"; // azul
      default:
        return "#999";
    }
  };

  const color = getTypeColor();

  // Ordenar do maior para o menor
  const sorted = [...data].sort((a, b) => b.total - a.total);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.list}>
        {sorted.map((item, index) => {
          const percent = ((item.total / total) * 100).toFixed(1);
          return (
            <div key={index} className={styles.item}>
              <div className={styles.icon}>
                {index === 0 && <Trophy size={20} className={styles.gold} />}
                {index === 1 && <Trophy size={20} className={styles.silver} />}
                {index === 2 && <Trophy size={20} className={styles.bronze} />}
              </div>

              <div className={styles.info}>
                <span className={styles.category}>{item.category}</span>
                <span className={styles.value}>
                  R${" "}
                  {Number(item.total).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  ({percent}%)
                </span>
              </div>

              <div className={styles.barWrapper}>
                <div
                  className={styles.bar}
                  style={{ width: `${percent}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
