import React, { useState, useEffect } from "react";
import styles from "../styles/Card/HistoryTableCard.module.css";
import { Edit, Trash2 } from "lucide-react";

export default function HistoryTableCard({ data, onEdit, onDelete }) {
  const content = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const pageSize = data?.pageable?.pageSize || 10;

  const [currentPage, setCurrentPage] = useState(0);
  const [pageContent, setPageContent] = useState([]);

  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setPageContent(content.slice(start, end));
  }, [currentPage, pageSize, content]);

  const totalPages = Math.ceil(totalElements / pageSize);

  const handlePrev = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);

  return (
    <div className={styles.card}>
      <span className={styles.title}>Histórico de Registros</span>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pageContent.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyText}>
                  Nenhum registro encontrado.
                </td>
              </tr>
            ) : (
              pageContent.map((row) => {
                let rowClass = "";
                const type = row.typeRegister?.toUpperCase();
                switch (type) {
                  case "DESPESA": rowClass = styles.typeExpenseRow; break;
                  case "RECEITA": rowClass = styles.typeRevenueRow; break;
                  case "INVESTIMENTO": rowClass = styles.typeInvestmentRow; break;
                  default: rowClass = "";
                }

                return (
                  <tr key={row.id} className={rowClass}>
                    <td>{row.id}</td>
                    <td>{row.description}</td>
                    <td>{row.category}</td>
                    <td>{row.typeRegister}</td>
                    <td className={styles.valueCell}>
                      R$ {Number(row.value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td>{row.dateRegister?.split("T")[0]}</td>
                    <td className={styles.actions}>
                      <button onClick={() => onEdit(row)} className={styles.editBtn}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => onDelete(row.id)} className={styles.deleteBtn}>
                        <Trash2 size={16} />
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
        <button onClick={handlePrev} disabled={currentPage === 0}>Anterior</button>
        <span>Página {currentPage + 1} de {totalPages || 1}</span>
        <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>Próxima</button>
      </div>
    </div>
  );
}
