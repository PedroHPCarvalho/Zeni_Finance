import React from "react";
import styles from "../../styles/DeletePage/ModalConfirmDelete.module.css";
import { X, Trash2 } from "lucide-react";

export default function ModalConfirmDelete({ visible, onClose, onConfirm }) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <Trash2 size={40} className={styles.iconTrash} />

        <h2>Confirmar exclusão</h2>
        <p>Você tem certeza que deseja excluir este registro? Essa ação não pode ser desfeita.</p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>

          <button className={styles.confirm} onClick={onConfirm}>
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}
