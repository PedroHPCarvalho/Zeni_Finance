import React from "react";
import styles from "../styles/Card/TableCard.module.css";

export default function CardTable({ title, icon, columns = [], data = [] }) {
  // Função para formatar data por extenso
  const formatDate = (value) => {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return value;
    }
  };

  return (
    <div className={`${styles.card} contentCard`}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>

      {/* Table */}
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
                let rowClass = "";
                const type = typeof row[2] === "string" ? row[2].toUpperCase() : "";

                switch (type) {
                  case "DESPESA":
                  case "CASA_DE_APOSTA":
                    rowClass = styles.typeExpenseRow;
                    break;
                  case "RECEITA":
                    rowClass = styles.typeRevenueRow;
                    break;
                  case "INVESTIMENTO":
                    rowClass = styles.typeInvestmentRow;
                    break;
                  default:
                    rowClass = "";
                }

                return (
                  <tr key={i} className={rowClass}>
                    {row.map((value, j) => {
                      // Coluna de valor
                      if (j === 3) {
                        return (
                          <td key={j} className={styles.valueCell}>
                            R$ {Number(value).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        );
                      }

                      // Coluna de data
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
