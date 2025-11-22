import React, { useState } from "react";
import styles from "../styles/Card/ManualRegisterCard.module.css";
import { useManualRegister } from "../hooks/useManualRegister";

const CATEGORIES = [
  "ALIMENTACAO", "TRANSPORTE", "MORADIA", "SAUDE", "EDUCACAO",
  "LAZER_E_ENTRETENIMENTO", "BETS_E_JOGOS_DE_AZAR", "VESTUARIO",
  "SERVICOS", "IMPOSTOS_E_TAXAS", "SALARIO", "FREELANCE_E_SERVICOS_PRESTADOS",
  "INVESTIMENTOS", "PRESENTES_E_DOACOES_RECEBIDAS", "REEMBOLSOS_E_RESTITUICOES"
];

const TYPES = ["DESPESA", "RECEITA"];

export default function ManualRegisterCard({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [typeRegister, setTypeRegister] = useState("");
  const [value, setValue] = useState("");
  const [dateRegister, setDateRegister] = useState("");

  const { sendManualRegister, loading, error } = useManualRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !category || !typeRegister || !value) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const date = dateRegister || new Date().toISOString().split("T")[0];

    const payload = {
        description,
        category,
        value: Number(value),
        typeRegister,
        dateRegister: date,
      };
    

    const result = await sendManualRegister(payload);

    if (result) {
      onSubmit?.(result);
      alert("Registro inserido com sucesso!");

      // limpar inputs
      setDescription("");
      setCategory("");
      setTypeRegister("");
      setValue("");
      setDateRegister("");
    } else {
      alert("Erro ao registrar!");
    }
  };

  return (
    <div className={styles.card}>
      <span className={styles.title}>Registrar gasto manualmente</span>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Mercado, Uber..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Categoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Selecione...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Tipo</label>
            <select value={typeRegister} onChange={(e) => setTypeRegister(e.target.value)} required>
              <option value="">Selecione...</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Valor</label>
            <input
              type="number"
              placeholder="0.00"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Data</label>
            <input
              type="date"
              value={dateRegister}
              onChange={(e) => setDateRegister(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.submit}>
          Registrar
        </button>
      </form>
    </div>
  );
}
