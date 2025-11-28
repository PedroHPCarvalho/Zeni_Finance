import React from "react";
import styles from "../../styles/Home/Home.module.css";
import Logo from "../../assets/Logo.png";
import Hero2 from "../../assets/content.png";
import qrcode from "../../assets/qrcode2.png";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  MessageSquare, 
  PieChart, 
  AlertTriangle, 
  TrendingDown, 
  HeartCrack, 
  Banknote,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  ScanLine
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.home_root}>
      {/* ===== HEADER ===== */}
      <header className={styles.home_header}>
        <div className={styles.home_logoContainer}>
          <img src={Logo} alt="Logo Zeni" className={styles.home_logoImg} />
          <h1 className={styles.home_logoText}>Zeni</h1>
        </div>

        <div className={styles.home_navButtons}>
          <button className={styles.btn_outline} onClick={() => navigate("/login")}>
            Entrar
          </button>
          <button className={styles.btn_primary} onClick={() => navigate("/register")}>
            Criar conta
          </button>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className={styles.home_hero}
        style={{ backgroundImage: ` url(${Hero2})` }}
      >
        <div className={styles.home_heroContent}>
          <h1>Domine suas finanças com inteligência</h1>
          <p>Controle gastos, visualize relatórios e tome decisões melhores. Tudo em um só lugar, simples e rápido.</p>
          <button className={styles.btn_hero} onClick={() => navigate("/register")}>
            Começar agora <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ===== CARDS DE FUNCIONALIDADES ===== */}
      <section className={styles.home_features}>
        <div className={styles.container}>
          <div className={styles.section_header}>
            <h2>O que a Zeni faz por você?</h2>
            <p>Tecnologia descomplicada para o seu dinheiro render mais.</p>
          </div>

          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <div className={styles.icon_box}>
                <BarChart3 size={32} />
              </div>
              <h3>Relatórios Inteligentes</h3>
              <p>Registre gastos e receba análises detalhadas. Entenda para onde seu dinheiro vai.</p>
            </div>

            <div className={styles.feature_card}>
              <div className={styles.icon_box}>
                <MessageSquare size={32} />
              </div>
              <h3>Integração WhatsApp</h3>
              <p>Envie seus gastos por mensagem e nós organizamos tudo automaticamente para você.</p>
            </div>

            <div className={styles.feature_card}>
              <div className={styles.icon_box}>
                <PieChart size={32} />
              </div>
              <h3>Controle Visual</h3>
              <p>Gráficos intuitivos que mostram exatamente onde economizar para realizar seus sonhos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HISTÓRIA ===== */}
      <section className={styles.home_story}>
        <div className={styles.container}>
          <div className={styles.story_content}>
            <h2>Nossa História</h2>
            <p>
              A Zeni nasceu da frustração com planilhas complexas e apps cheios de anúncios. 
              Um grupo de amigos decidiu criar algo diferente: uma ferramenta que realmente 
              ajudasse pessoas comuns a entenderem seu próprio dinheiro.
            </p>
            <p>
              Hoje, somos uma plataforma que une tecnologia e propósito, ajudando milhares 
              de pessoas a alcançarem a tão sonhada liberdade financeira.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONSCIENTIZAÇÃO (GAMBLING) ===== */}
      <section className={styles.home_gambling}>
        <div className={styles.container}>
          
          <div className={styles.gambling_header}>
            <AlertTriangle size={48} className={styles.warning_icon_lg} />
            <h2>Jogo Responsável e Saúde Financeira</h2>
            <p>Apostas online não são investimento. Entenda os riscos e proteja seu patrimônio.</p>
          </div>

          <div className={styles.gambling_grid}>
            <div className={styles.risk_card}>
              <TrendingDown className={styles.risk_icon} size={32} />
              <h4>Perdas Financeiras</h4>
              <p>A casa sempre tem a vantagem matemática. O risco de perder dinheiro é estatisticamente maior que o de ganhar.</p>
            </div>

            <div className={styles.risk_card}>
              <HeartCrack className={styles.risk_icon} size={32} />
              <h4>Impacto Emocional</h4>
              <p>A ansiedade e a busca por recuperar perdas podem afetar sua saúde mental e seus relacionamentos.</p>
            </div>

            <div className={styles.risk_card}>
              <Banknote className={styles.risk_icon} size={32} />
              <h4>Endividamento</h4>
              <p>O fácil acesso a crédito e a rapidez das apostas podem criar uma bola de neve de dívidas difícil de controlar.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== NOVO: SEÇÃO DO BOT / QR CODE ===== */}
      <section className={styles.home_bot}>
        <div className={styles.container}>
          <div className={styles.bot_card}>
            <div className={styles.bot_content}>
              <h2>Agilidade para quem já é Zeni</h2>
              <p>
                Recurso exclusivo para cadastrados. Registre-se no nosso sistema e use o WhatsApp para lançar gastos automaticamente no seu painel web. Simples, rápido e sem downloads.
              </p>
              
              <div className={styles.bot_features}>
                <div className={styles.bot_feature_item}>
                  <MessageSquare size={20} /> <span>"Gastei 50 reais no mercado"</span>
                </div>
              </div>
            </div>

            <div className={styles.bot_qrcode_wrapper}>
              <div className={styles.qrcode_card}>
                <img src={qrcode} alt="QR Code Zeni Bot" className={styles.qrcode_img} />
                <div className={styles.qrcode_instruction}>
                  <ScanLine size={18} />
                  <span>Escaneie para iniciar</span>
                </div>
              </div>

              <a 
                href="https://wa.me/5511988783882" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.btn_whatsapp}
              >
                <MessageSquare size={20} />
                Abrir no WhatsApp
              </a>

              <div className={styles.smartphone_mockup}>
                <Smartphone size={140} strokeWidth={0.5} color="rgba(255,255,255,0.2)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.home_footer}>
        <div className={styles.container}>
          <div className={styles.footer_content}>
            <span>© 2025 Zeni Finanças. Todos os direitos reservados.</span>
            <div className={styles.footer_links}>
              <a href="#" className={styles.footer_link}>Termos de Uso</a>
              <a 
                href="https://projects-of-faculty.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.footer_link}
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;