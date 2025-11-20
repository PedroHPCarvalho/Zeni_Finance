import React from "react";
import styles from "../styles/Card/ContentCard.module.css";

export default function Card({ title, value, icon, children }) {
  return (
    <div className={styles.card}>

      {/* Header só aparece se houver título ou ícone */}
      {(title || icon) && (
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
      )}

      {/* Se tiver value, mostra */}
      {value && <div className={styles.value}>{value}</div>}

      {/* Children (gráficos, listas, etc.) */}
      {children && (
        <div className={styles.children}>
          {children}
        </div>
      )}

    </div>
  );
}
