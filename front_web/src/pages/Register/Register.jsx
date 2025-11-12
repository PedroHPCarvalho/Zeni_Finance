import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Register/Register.module.css";
import { useRegister } from "../../hooks/useRegister";

export default function Cadastro() {
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_confirmed: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(formData);
    if (response && response.ok) {
      navigate("/login");
    }
  };

  return (
    <div className={styles.register_root}>
      <div className={styles.register_container}>
        <h1 className={styles.register_h1}>Cadastrar-se</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.register_inputBox}>
            <input
              type="text"
              placeholder="Nome completo"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.register_inputBox}>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.register_inputBox}>
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.register_inputBox}>
            <input
              type="password"
              placeholder="Confirmar senha"
              name="password_confirmed"
              value={formData.password_confirmed}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.register_inputBox}>
            <input
              type="tel"
              placeholder="Celular (DDD+Número)"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value.replace(/\D/g, ""),
                }))
              }
              required
            />
          </div>

          <button type="submit" className={styles.register_btn} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          {error && <p className={styles.register_error}>{error}</p>}

          <p className={styles.register_loginText}>
            Já tem conta? <a href="/login">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
}