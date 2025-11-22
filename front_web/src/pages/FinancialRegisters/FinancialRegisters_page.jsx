import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";

import ChatRegisterCard from "../../components/ChatRegisterCard.jsx";
import ManualRegisterCard from "../../components/ManualRegisterCard.jsx";
import HistoryTableCard from "../../components/HistoryTableCard.jsx";

import { usePaginatedFetch } from "../../hooks/usePaginatedFetch.js";
import api, { API_ENDPOINTS } from "../../../config/api.js";

export default function FinancialRegisters() {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    dataRegistries,
    totalPages,
    loading,
    error,
    refetch
  } = usePaginatedFetch(currentPage, 10);

  // ---------------------------------------------
  // DELETE: AGORA FUNCIONAL E COM TOKEN
  // ---------------------------------------------
  const handleDelete = async (id) => {
    if (!id) return;

    const ok = window.confirm("Deseja realmente excluir este registro?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `${API_ENDPOINTS.financialRegisters}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          }
        }
      );

      // recarrega a tabela
      await refetch();

    } catch (err) {
      console.error("Erro ao deletar registro:", err);
      alert("Erro ao excluir registro.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}
    >
      <ChatRegisterCard
        onSubmit={(items) => console.log("Registro IA:", items)}
      />

      <ManualRegisterCard />

      <HistoryTableCard
        data={dataRegistries}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={null}        // desabilitado
        onDelete={handleDelete}
      />
    </div>
  );
}
