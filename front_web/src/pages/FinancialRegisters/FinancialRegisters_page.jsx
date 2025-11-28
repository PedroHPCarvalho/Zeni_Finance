import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";

import ChatRegisterCard from "../../components/ChatRegisterCard.jsx";
import ManualRegisterCard from "../../components/ManualRegisterCard.jsx";
import HistoryTableCard from "../../components/HistoryTableCard.jsx";
import EditRegisterModal from "../../pages/EditRegister/EditRegister_page.jsx";
import ModalConfirmDelete from "../../pages/DeletePage/Delete_Page.jsx";
import api, { API_ENDPOINTS } from "../../../config/api.js";
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch.js";

export default function FinancialRegisters() {
  const [currentPage, setCurrentPage] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { dataRegistries, totalPages, refetch } = usePaginatedFetch(currentPage, 10);

  // -------------------
  // DELETE
  // -------------------
  const requestDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`${API_ENDPOINTS.financialRegisters}/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteModal(false);
      setDeleteId(null);
      await refetch(); // atualiza a tabela
    } catch (err) {
      console.error("Erro ao deletar registro:", err);
      alert("Erro ao excluir registro.");
    }
  };

  // -------------------
  // EDIT
  // -------------------
  const handleSaveEdit = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`${API_ENDPOINTS.update}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditItem(null);
      await refetch(); // atualiza tabela
    } catch (err) {
      console.error("Erro ao atualizar registro:", err);
      alert("Erro ao atualizar registro.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <ChatRegisterCard onRefetch={refetch} />
      <ManualRegisterCard onSubmit={refetch} />
      <HistoryTableCard
        data={dataRegistries}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onEdit={setEditItem}
        onDelete={requestDelete}
      />

      {editItem && <EditRegisterModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSaveEdit} />}
      <ModalConfirmDelete visible={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={confirmDelete} />
    </div>
  );
}
