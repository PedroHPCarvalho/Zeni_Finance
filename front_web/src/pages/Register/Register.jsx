import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Register/Register.module.css";
import { useRegister } from "../../hooks/useRegister";
import Logo from "../../assets/Logo.png";

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

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: onlyNums }));
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
            <h1 className={styles.title_text}>Crie sua conta</h1>
            <span className={styles.accent_line}></span>
          </div>

          <form onSubmit={handleSubmit} className={styles.register_form}>
            
            <div className={styles.input_group}>
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                placeholder="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="phone">Celular</label>
              <input
                id="phone"
                type="tel"
                placeholder="(99) 99999-9999"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
                className={styles.input_field}
              />
            </div>

            <div className={styles.row_inputs}>
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

              <div className={styles.input_group}>
                <label htmlFor="password_confirmed">Confirmar</label>
                <input
                  id="password_confirmed"
                  type="password"
                  placeholder="Confirmar senha"
                  name="password_confirmed"
                  value={formData.password_confirmed}
                  onChange={handleChange}
                  required
                  className={styles.input_field}
                />
              </div>
            </div>

            <button type="submit" className={styles.register_btn} disabled={loading}>
              {loading ? "CADASTRANDO..." : "CADASTRAR"}
            </button>

            {error && <p className={styles.register_error}>{error}</p>}

            <p className={styles.register_loginText}>
              Já tem conta? <a href="/login">Faça login</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}