import React from "react";
import styles from "../styles/Card/TableCard.module.css";
import { getCategoryLabel } from "../utils/categories";

export default function TableCard({ title, icon, columns = [], data = [] }) {
  const formatDate = (value) => {
    if (!value) return value;
    const datePart = value.split("T")[0];
    const [year, month, day] = datePart.split("-");

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

                let rowClass = "";
                if (type === "DESPESA" || type === "CASA_DE_APOSTA") rowClass = styles.typeExpenseRow;
                else if (type === "RECEITA") rowClass = styles.typeRevenueRow;
                else if (type === "INVESTIMENTO") rowClass = styles.typeInvestmentRow;

                return (
                  <tr key={i} className={rowClass}>
                    {row.map((value, j) => {
                      const label = columns[j] || "";

                      if (j === 3) {
                        return (
                          <td key={j} className={styles.valueCell} data-label={label}>
                            R$
                            {Number(value).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        );
                      }

                      if (j === 4) {
                        return <td key={j} data-label={label}>{formatDate(value)}</td>;
                      }

                      // 👇 CORREÇÃO AQUI — NOME BONITO
                      if (j === 1) {
                        return (
                          <td key={j} data-label={label}>
                            {getCategoryLabel(value)}
                          </td>
                        );
                      }

                      return <td key={j} data-label={label}>{value}</td>;
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
