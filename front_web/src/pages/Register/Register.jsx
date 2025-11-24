import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Register/Register.module.css";
import { useRegister } from "../../hooks/useRegister";
import Logo from "../../assets/Logo.png";

export default function Cadastro() {
  const navigate = useNavigate();
  const { register, loading, error } = useRegister();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_confirmed: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: onlyNums }));
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmed) {
      alert("As senhas não coincidem.");
      return;
    }

    setShowModal(true);
  };

  const handleConfirmRegister = async () => {
    const response = await register(formData);

    if (response.ok) {
      setShowModal(false);
      navigate("/login");
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.register_root}>
      {showModal && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_container}>
            <div className={styles.modal_header}>
              <h3>Autorização de Dados</h3>
            </div>

            <div className={styles.modal_content}>
              <h4>Obtenção de Consentimento</h4>

              <p className={styles.modal_desc}>
                Antes do usuário começar a usar o assistente financeiro, uma
                mensagem que receberá o consentimento do usuário será disparada.
                Sem esse consentimento, o serviço não será iniciado.
              </p>

              <div className={styles.modal_quote_box}>
                <p>
                  "Para continuar, precisamos de sua autorização para usar seus
                  dados com o objetivo de organizar suas finanças. Seus dados
                  não serão compartilhados com terceiros. Deseja continuar?"
                </p>
              </div>

              <div className={styles.modal_privacy_box}>
                <p>
                  <strong>Privacidade: </strong>Seus dados serão utilizados
                  apenas para análise financeira pessoal e nunca serão
                  compartilhados com terceiros sem sua autorização explícita.
                </p>
              </div>
            </div>

            <div className={styles.modal_footer}>
              <button
                className={styles.btn_refuse}
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Recusar
              </button>

              <button
                className={styles.btn_accept}
                onClick={handleConfirmRegister}
                disabled={loading}
              >
                {loading ? "Carregando..." : "Autorizar e Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}

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

          <form onSubmit={handlePreSubmit} className={styles.register_form}>
            <div className={styles.input_group}>
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="phone">Celular</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(99) 99999-9999"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
              />
            </div>

            <div className={styles.row_inputs}>
              <div className={styles.input_group}>
                <label htmlFor="password">Senha</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.input_group}>
                <label htmlFor="password_confirmed">Confirmar senha</label>
                <input
                  id="password_confirmed"
                  type="password"
                  name="password_confirmed"
                  placeholder="Confirmar"
                  value={formData.password_confirmed}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.register_btn} disabled={loading}>
              CADASTRAR
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
