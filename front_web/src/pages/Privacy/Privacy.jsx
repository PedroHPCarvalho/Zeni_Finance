import React from "react";
import styles from "../../styles/Privacy/Privacy.module.css";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className={styles.privacy_root}>
      <header className={styles.privacy_header}>
        <h1>Política de Privacidade</h1>
        <p className={styles.lead}>Nós valorizamos sua privacidade. Aqui explicamos como usamos e protegemos seus dados.</p>
      </header>

      <main className={styles.privacy_main}>
        <section>
          <h2>Resumo rápido</h2>
          <p>Coletamos apenas os dados necessários para fornecer os serviços financeiros: cadastro (nome, e-mail), registros financeiros e dados de uso. Não vendemos seus dados.</p>
        </section>

        <section>
          <h2>Que dados coletamos</h2>
          <ul>
            <li>Dados de cadastro: nome e e-mail.</li>
            <li>Registros financeiros: valores, categorias e datas inseridas por você.</li>
            <li>Dados de uso: métricas anônimas para melhorar o produto.</li>
          </ul>
        </section>

        <section>
          <h2>Por que usamos esses dados</h2>
          <p>Os dados são usados para autenticação, gerar relatórios e melhorar a experiência do usuário. Podemos integrar serviços de terceiros (ex.: Azure OpenAI) para funcionalidades específicas; quando isso ocorrer, indicaremos claramente.</p>
        </section>

        <section>
          <h2>Compartilhamento e terceiros</h2>
          <p>Compartilhamos dados apenas com provedores de infraestrutura e serviços essenciais (banco de dados, serviços de e-mail, e integrações autorizadas). Para integrações opcionais, pedimos consentimento explícito.</p>
        </section>

        <section>
          <h2>Segurança</h2>
          <p>Aplicamos práticas comuns de segurança (TLS em trânsito, credenciais em variáveis de ambiente no backend). Recomenda-se não compartilhar credenciais.</p>
        </section>

        <section>
          <h2>Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão dos seus dados entrando em contato pelo e-mail de suporte.</p>
        </section>

        <section className={styles.privacy_actions}>
          <Link to="/" className={styles.privacy_back}>Voltar à página inicial</Link>
        </section>
      </main>

      <footer className={styles.privacy_footer}>
        <small>© 2025 Zeni Finanças — Política de Privacidade</small>
      </footer>
    </div>
  );
}
