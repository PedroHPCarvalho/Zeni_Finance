import React from "react";
import styles from "../styles/Card/TableCard.module.css";

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
                // Tenta identificar o tipo (assumindo que está na coluna 2, índice 2)
                // Se a ordem das colunas mudar, ajuste este índice
                const type = String(row[2] || "").toUpperCase();

                let rowClass = "";
                if (type === "DESPESA" || type === "CASA_DE_APOSTA") rowClass = styles.typeExpenseRow;
                else if (type === "RECEITA") rowClass = styles.typeRevenueRow;
                else if (type === "INVESTIMENTO") rowClass = styles.typeInvestmentRow;

                return (
                  <tr key={i} className={rowClass}>
                    {row.map((value, j) => {
                      // Pega o nome da coluna para usar no mobile (Ex: "Valor", "Data")
                      const label = columns[j] || "";

                      // Formatação específica para Valor (coluna 3)
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

                      // Formatação específica para Data (coluna 4)
                      if (j === 4) {
                        return <td key={j} data-label={label}>{formatDate(value)}</td>;
                      }

                      // Padrão
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