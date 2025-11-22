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

  return (
    <div className={styles.card}>
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
                <td colSpan={7} className={styles.emptyText}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              content.map((row) => {
                let rowClass = "";
                const type = row.typeRegister?.toUpperCase();

                if (type === "DESPESA") rowClass = styles.typeExpenseRow;
                if (type === "RECEITA") rowClass = styles.typeRevenueRow;
                if (type === "INVESTIMENTO") rowClass = styles.typeInvestmentRow;

                return (
                  <tr key={row.id} className={rowClass}>
                    <td>{row.description}</td>
                    <td>{row.category}</td>
                    <td>{row.typeRegister}</td>
                    <td className={styles.valueCell}>
                      R$ {Number(row.value).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>{row.dateRegister?.split("T")[0]}</td>

                    <td className={styles.actionsCell}>
                      <button onClick={() => onEdit(row)} className={styles.iconBtn}>
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(row.id)}
                        className={styles.iconBtnDelete}
                      >
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
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Anterior
        </button>

        <span>
          Página {currentPage + 1} de {totalPages || 1}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
