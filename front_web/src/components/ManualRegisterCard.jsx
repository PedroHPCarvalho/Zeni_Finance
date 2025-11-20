import React, { useState } from "react";
import styles from "../styles/Card/ManualRegisterCard.module.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !category || !typeRegister || !value) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const date = dateRegister || new Date().toISOString().split("T")[0];

    const payload = [
      {
        description,
        category,
        value: Number(value),
        typeRegister,
        dateRegister: date
      }
    ];

    onSubmit(payload);

    // Resetar campos
    setDescription("");
    setCategory("");
    setTypeRegister("");
    setValue("");
    setDateRegister("");
  };

  return (
    <div className={styles.card}>
      <span className={styles.title}>Registrar gasto manualmente</span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Categoria</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={typeRegister}
          onChange={(e) => setTypeRegister(e.target.value)}
          required
        >
          <option value="">Tipo de Registro</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateRegister}
          onChange={(e) => setDateRegister(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
