import React from "react";
import styles from "../styles/Card/TableCard.module.css"; // Card padrão


export default function TableCard({ title, icon, columns = [], data = [] }) {
 const formatDate = (value) => {
    if (!value) return value;

    // Pega só a parte da data, ignorando horário
    const datePart = value.split("T")[0]; // "2025-11-22"
    const [year, month, day] = datePart.split("-");

    // Meses por extenso em pt-BR
    const months = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
  };

  return (
    <div className={styles.card}>
      
      {(title || icon) && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
      )}

      {/* Wrapper correto para tabelas */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyText}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const type = String(row[2] || "").toUpperCase();

                let rowClass =
                  type === "DESPESA" || type === "CASA_DE_APOSTA"
                    ? styles.typeExpenseRow
                    : type === "RECEITA"
                    ? styles.typeRevenueRow
                    : type === "INVESTIMENTO"
                    ? styles.typeInvestmentRow
                    : "";

                return (
                  <tr key={i} className={rowClass}>
                    {row.map((value, j) => {
                      // Valor formatado
                      if (j === 3) {
                        return (
                          <td key={j} className={styles.valueCell}>
                            R$
                            {Number(value).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        );
                      }

                      // Data formatada
                      if (j === 4) {
                        return <td key={j}>{formatDate(value)}</td>;
                      }

                      return <td key={j}>{value}</td>;
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
