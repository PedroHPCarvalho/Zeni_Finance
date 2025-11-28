import React, { useState, useEffect } from "react";
import styles from "../../styles/EditRegister/EditRegister_page.module.css";

// Mesmas categorias do ManualRegister
const CATEGORIES = [
  "ALIMENTACAO", "TRANSPORTE", "MORADIA", "SAUDE", "EDUCACAO",
  "LAZER_E_ENTRETENIMENTO", "BETS_E_JOGOS_DE_AZAR", "VESTUARIO",
  "SERVICOS", "IMPOSTOS_E_TAXAS", "SALARIO", "FREELANCE_E_SERVICOS_PRESTADOS",
  "INVESTIMENTOS", "PRESENTES_E_DOACOES_RECEBIDAS", "REEMBOLSOS_E_RESTITUICOES"
];

// **IMPORTANTE:** aqui você só permite DESPESA e RECEITA igual o manual
const TYPES = ["DESPESA", "RECEITA"];

export default function EditRegisterModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    description: "",
    category: "",
    value: 0,
    typeRegister: "",
    dateRegister: ""
  });

  useEffect(() => {
    if (item) {
      setForm({
        description: item.description,
        category: item.category,
        value: item.value,
        typeRegister: item.typeRegister,
        dateRegister: item.dateRegister?.split("T")[0]
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(item.id, form);
  };

  if (!item) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <h2 className={styles.title}>Editar Registro</h2>

        <div className={styles.form}>
          <div className={styles.field}>
            <label>Descrição</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ex: Mercado, Uber..."
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Categoria</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Tipo</label>
              <select
                name="typeRegister"
                value={form.typeRegister}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Valor</label>
              <input
                type="number"
                name="value"
                value={form.value}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Data</label>
              <input
                type="date"
                name="dateRegister"
                value={form.dateRegister}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <button onClick={onClose} className={styles.cancel}>
            Cancelar
          </button>
          <button onClick={handleSubmit} className={styles.save}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
