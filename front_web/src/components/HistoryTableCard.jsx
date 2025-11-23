import React from "react";
import styles from "../styles/Card/HistoryTableCard.module.css";
import { Edit, Trash2 } from "lucide-react";

export default function HistoryTableCard({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const content = data?.content || [];

  const handlePrev = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  // Verifica se algum registro tem categoria "Investimentos"
  const hasInvestmentCategory = content.some(
    (r) => r.category?.toUpperCase() === "INVESTIMENTOS"
  );

  return (
    <div className={`${styles.card} ${hasInvestmentCategory ? styles.cardInvestment : ""}`}>
      <span className={styles.title}>Histórico de Registros</span>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>

         <tbody>
            {content.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyText}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              content.map((row) => {
                // Checa apenas a categoria para investimentos
                const isInvestmentCategory = row.category?.toUpperCase() === "INVESTIMENTOS";

                let rowClass = "";
                if (isInvestmentCategory) rowClass = styles.typeInvestmentRow;
                else if (row.typeRegister?.toUpperCase() === "DESPESA") rowClass = styles.typeExpenseRow;
                else if (row.typeRegister?.toUpperCase() === "RECEITA") rowClass = styles.typeRevenueRow;

                return (
                  <tr key={row.id} className={rowClass}>
                    <td>{row.description}</td>
                    <td>{row.category}</td>
                    <td>{row.typeRegister}</td>
                    <td className={styles.valueCell}>
                      R${" "}
                      {Number(row.value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>{row.dateRegister?.split("T")[0]}</td>
                    <td className={styles.actionsCell}>
                      <button onClick={() => onEdit(row)} className={styles.iconBtn}>
                        <Edit size={18} />
                      </button>
                      <button onClick={() => onDelete(row.id)} className={styles.iconBtnDelete}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Anterior
        </button>
        <span>
          Página {currentPage + 1} de {totalPages || 1}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>
          Próxima
        </button>
      </div>
    </div>
  );
}
