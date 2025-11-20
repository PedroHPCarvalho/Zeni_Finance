import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import styles from "../../styles/Login/Login.module.css";
import { useLogin } from "../../hooks/useLogin";
import Logo from "../../assets/Logo.png";

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
      
      <section className={styles.left_side}>
        <div className={styles.hero_content}>
           
           <div className={styles.zen_brand_container}>
             <img src={Logo} alt="Logo Zeni" className={styles.hero_logo_img} />
             <h1 className={styles.zen_title}>ZENI</h1>
           </div>
           
        </div>
      </section>

      <main className={styles.right_side}>
        <div className={styles.form_container}>
            
          <div className={styles.brand_header}>
            <img src={Logo} alt="Logo Zeni" className={styles.logo_img_small} />
          </div>

          <div className={styles.welcome_header}>
            <h2>Bem-vindo ao Painel</h2>
            <span className={styles.accent_line}></span>
          </div>

          <form onSubmit={handleSubmit} className={styles.login_form}>
            
            <div className={styles.input_group}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email do usuário"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input_field}
              />
            </div>

            <button type="submit" className={styles.login_btn} disabled={loading}>
              {loading ? "ENTRANDO..." : "ENTRAR"}
            </button>

            {error && <p className={styles.login_error}>{error}</p>}

            <p className={styles.register_loginText}>
              Não tem conta? <a href="/register">Registre-se</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}