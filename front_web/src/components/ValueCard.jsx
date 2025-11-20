import React from "react";
import styles from "../styles/Card/ValueCard.module.css";

export default function StatCard({ title, value, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>

      <div className={styles.value}>
        {value}
      </div>
    </div>
  );
}
