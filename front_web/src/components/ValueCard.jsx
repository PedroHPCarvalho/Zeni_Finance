import React from "react";
import styles from "../styles/Card/ValueCard.module.css";

export default function StatCard({ title, value, icon, variant = "income" }) {
  const variantClasses = {
    income: styles.income,
    expense: styles.expense,
    balance: styles.balance,
    alert: styles.alert,
  };

  return (
    <div className={`${styles.card} ${variantClasses[variant]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>

        {icon && (
          <span className={styles.iconContainer}>
            {icon}
          </span>
        )}
      </div>

      <div className={styles.value}>
        {value}
      </div>
    </div>
  );
}
