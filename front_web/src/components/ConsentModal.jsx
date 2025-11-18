import React from "react";
import styles from "../styles/ConsentModal.module.css";

export default function ConsentModal({ isOpen, onAccept, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2>Autorização de Dados</h2>
        </div>

        <div className={styles.modal_body}>
          <p className={styles.modal_disclaimer}>
            Para continuar, precisamos de sua autorização para utilização de seus dados. Seus dados serão utilizados apenas para análise financeira pessoal e nunca serão compartilhados com terceiros sem sua autorização explícita.
          </p>
        </div>

        <div className={styles.modal_footer}>
          <button 
            className={styles.modal_btnCancel} 
            onClick={onCancel}
          >
            Recusar
          </button>
          <button 
            className={styles.modal_btnAccept} 
            onClick={onAccept}
          >
            Autorizar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
