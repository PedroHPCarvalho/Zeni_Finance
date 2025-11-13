import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import styles from "../../styles/Login/Login.module.css";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const { ok, result } = await login({
      email: formData.email,
      password: formData.password
    });

    if (ok && result.token) {
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } else {
      alert(result?.error || "Credenciais inválidas!");
    }
  };


  return (
    <div className={styles.login_root}>
      <main className={styles.login_container}>
        <h1>Logar-se</h1>

        <form onSubmit={handleSubmit} className={styles.login_form}>
          <div className={styles.login_inputBox}>
            <input
              type="email"
              placeholder="Email do usuário"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user" />
          </div>

          <div className={styles.login_inputBox}>
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt" />
          </div>

          <button type="submit" className={styles.login_btn} disabled={loading}>
            {loading ? "Logando..." : "Logar"}
          </button>

          {error && <p className={styles.login_error}>{error}</p>}

          <div className={styles.login_registerLink}>
            <p>
              Não tem conta? <a href="/register">Cadastre-se</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}