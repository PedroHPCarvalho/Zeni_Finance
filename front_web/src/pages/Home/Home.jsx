import React from "react";
import styles from "../../styles/Home/Home.module.css";
import Logo from "../../assets/Logo.png";
import Hero from "../../assets/Hero.jpg";
import Relatorios from "../../assets/Relatorios.png";
import WhatsApphatsapp from "../../assets/Whatsapp.png";
import Gastos from "../../assets/Gastos.png";
import { useNavigate } from "react-router-dom";
import { BarChart3, MessageSquare, PieChart } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home_root}>
      {/* ===== HEADER ===== */}
      <header className={styles.home_header}>
        <div className={styles.home_logo}>
          <img src={Logo} alt="Logo Zeni" />
          <h1>Zeni</h1>
        </div>

        <div className={styles.home_buttons}>
          <button className={styles.home_button} onClick={()=>navigate("/login")}>Entrar</button>
          <button className={styles.home_button} onClick={()=>navigate("/register")}>Cadastrar-se</button>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        className={styles.home_hero}
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className={styles.home_heroContent}>
          <h1>Comece agora a organizar suas finanças</h1>
          <button className={styles.home_cta} onClick={()=>navigate("/register")}>Cadastre-se</button>
        </div>
      </section>

      {/* ===== CARDS ===== */}
      <section className={styles.home_cards}>
        <div className={styles.home_card}>
          <BarChart3 size={48} className="icon" /> {/* tamanho parecido com a imagem */}
          <p>
            Registre gastos e peça relatórios direto no WhatsApp. Rápido e prático, sem complicações.
          </p>
        </div>

        <div className={styles.home_card}>
          <MessageSquare size={48} className="icon" />
          <p>
            Tenha acesso a análises completas de suas finanças pela web ou WhatsApp, sempre que precisar.
          </p>
        </div>

        <div className={styles.home_card}>
          <PieChart size={48} className="icon" />
          <p>
            Descubra onde e com o que você mais gasta para tomar decisões mais conscientes.
          </p>
        </div>
      </section>

      {/* ===== HISTÓRIA ===== */}
      <section className={styles.home_historia}>
        <h2>A História da Zeni Finanças</h2>
        <p>
          A Zeni nasceu de uma ideia simples: ajudar pessoas comuns a entender melhor o próprio dinheiro. Tudo começou com um grupo de amigos cansados de planilhas confusas e aplicativos cheios de anúncios, decidiram criar uma ferramenta diferente.
        </p>
        <p>
          O objetivo era claro - tornar o controle financeiro algo fácil, rápido e acessível a todos. Com o tempo, a Zeni cresceu e transformou-se em uma plataforma inteligente que conecta tecnologia, praticidade e propósito. Hoje, ela é o resultado de muitas noites de café, códigos e sonhos. Surgindo uma aliada para quem quer alcançar estabilidade e liberdade financeira.
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.home_footer}>
        © 2025 Zeni Finanças — Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default Home;