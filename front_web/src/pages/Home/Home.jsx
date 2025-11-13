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

      {/* ===== CONSCIENTIZAÇÃO SOBRE APOSTAS ===== */}
      <section className={styles.home_gambling}>
        {/* AVISO NO TOPO */}
        <div className={styles.home_gamblingWarning}>
          <div className={styles.home_gamblingWarningContent}>
            <span className={styles.home_warningIcon}>⚠</span>
            <div>
              <h3>Conscientização: Cuidado com as Apostas Online</h3>
              <p>Apostas online podem causar perdas financeiras e impactos pessoais. Nesta seção você encontra informações importantes para sua saúde financeira e bem estar.</p>
            </div>
          </div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <div className={styles.home_gamblingMain}>
          <span className={styles.home_mainIcon}>⚠</span>
          <h2>Atenção aos Riscos das Apostas Online</h2>
          <p>Portanto, as apostas podem gerar uma forma rápida de ganhar dinheiro, mas também apresentam sérios riscos para sua saúde financeira e bem-estar.</p>
        </div>

        {/* CAIXA DE RISCOS */}
        <div className={styles.home_gamblingRiskBox}>
          <span className={styles.home_riskIcon}>⚠</span>
          <h4>Por que as apostas são perigosas?</h4>
          <p>
            Apostadores de apostas em plataformas pouco confiáveis estão sujeitos. Use com cuidado das operações. Ainda das perdas financeiras, o vício em apostas pode danificar carreiras, relacionamentos e criar problemas graves de saúde mental. Muitas pessoas que começam "só por diversão" encontram dificuldades para parar.
          </p>
        </div>

        {/* CARDS DE RISCOS */}
        <div className={styles.home_gamblingCards}>
          <div className={styles.home_riskCard}>
            <span className={styles.home_cardIcon}>💰</span>
            <h5>Perdas Financeiras</h5>
            <p>As apostas podem levar a perdas significativas de dinheiro. O risco financeiro sempre está presente.</p>
          </div>

          <div className={styles.home_riskCard}>
            <span className={styles.home_cardIcon}>💔</span>
            <h5>Impacto emocional</h5>
            <p>O vício em apostas pode causar ansiedade, depressão e afastar relacionamentos. Desesperação para recuperar perdas.</p>
          </div>

          <div className={styles.home_riskCard}>
            <span className={styles.home_cardIcon}>📊</span>
            <h5>Endividamento</h5>
            <p>As dívidas acumulam rapidamente perdendo para conseguir recuperação de posição com apoio da. financeiro.</p>
          </div>
        </div>

        {/* CHAMADA PARA AÇÃO */}
        <div className={styles.home_gamblingCTA}>
          <h4>Proteja suas finanças</h4>
          <p>É um ato de amor em si mesmo, e uma ação educativa. Ao mesmo tempo a educação financeira e controla uma futuro sólido. Organize seus finanças, e manque tomácia base financeiras.</p>
          <div className={styles.home_gamblingButtons}>
            <button className={styles.home_cta} onClick={()=>navigate("/register")}>
              Começar cadastro
            </button>
            <a href="https://wa.me/5511988783882" target="_blank" rel="noopener noreferrer" className={styles.home_ctaLink}>
              Solicitar ajuda
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.home_footer}>
        <div className={styles.home_footerContent}>
          <span>© 2025 Zeni Finanças — Todos os direitos reservados.</span>
          <a
            href="https://projects-of-faculty.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.home_privacyButton}
          >
            Política de Privacidade
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;