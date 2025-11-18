import React from "react";
import styles from "../../styles/Privacy/Privacy.module.css";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className={styles.privacy_root}>
      <header className={styles.privacy_header}>
        <h1>Política de Privacidade</h1>
        <p className={styles.lead}>Data de Efetivação: 18 de agosto de 2025  
Esta Política de Privacidade descreve como o Assistente Financeiro, desenvolvido para 
fins de Trabalho de Conclusão de Curso (TCC), coleta, utiliza, armazena e protege os 
dados pessoais dos seus usuários. Nosso compromisso é garantir a privacidade e a 
segurança das informações, em conformidade com a Lei Geral de Proteção de Dados 
Pessoais (Lei nº 13.709/2018 - LGPD).</p>
      </header>

      <main className={styles.privacy_main}>
        <section>
          <h2>Obtenção de Consentimento</h2>
          <p>Para utilizar o Assistente Financeiro, o consentimento do usuário é indispensável. 
Antes do início de qualquer serviço, será exibida a seguinte mensagem:  
"Para continuar, precisamos da sua autorização para usar seus dados com o 
objetivo de organizar suas finanças. Seus dados não serão compartilhados com 
terceiros. Deseja continuar?"  
Ao aceitar, o usuário manifesta seu consentimento livre, informado e inequívoco para 
o tratamento de seus dados pessoais para as finalidades aqui descritas. Sem este 
consentimento, o serviço não será iniciado.</p>
        </section>

        <section>
          <h2>Finalidade Específica da Coleta de Dados  </h2>
          <ul>
            <li>Os dados coletados pelo Assistente Financeiro têm finalidade específica e legítima, 
sendo utilizados exclusivamente para os propósitos informados ao usuário. Antes do 
início do serviço, será apresentada a seguinte mensagem: </li>
            <li>"Seus dados serão usados exclusivamente para gerar relatórios de gastos e 
alertas personalizados."</li>
            <li>Esta política de privacidade completa estará disponível através de um link anexo a 
esta mensagem, garantindo total transparência sobre o tratamento dos dados. </li>
          </ul>
        </section>

        <section>
          <h2>Minimização de Dados</h2>
          <p>O Assistente Financeiro adota o princípio da minimização de dados, coletando apenas 
as informações estritamente necessárias para a execução de suas funcionalidades. 
Não serão coletados dados sensíveis, como CPF, localização, ou quaisquer outras 
informações que não sejam essenciais para a organização financeira do usuário. As 
informações coletadas se restringem a dados genéricos, como valores de gastos e 
categorias de despesas. </p>
        </section>

        <section>
          <h2> Direitos do Titular dos Dados </h2>
          <p>Em conformidade com a LGPD, o usuário, como titular dos dados pessoais, possui os 
seguintes direitos:  
Confirmação da existência de tratamento: Direito de saber se seus dados 
estão sendo tratados.  
Acesso aos dados: Direito de acessar seus dados pessoais a qualquer 
momento.  
Correção de dados incompletos, inexatos ou desatualizados: Direito 
de solicitar a correção de seus dados. 
Eliminação dos dados pessoais tratados com o consentimento do 
titular: Direito de solicitar a exclusão de seus dados, salvo exceções legais.  
Revogação do consentimento: Direito de retirar seu consentimento a 
qualquer momento.  
Para exercer qualquer um desses direitos, o usuário poderá entrar em contato 
através dos canais de comunicação indicados nesta política.  </p>
        </section>

        <section>
          <h2> Alterações nesta Política de Privacidade</h2>
          <p>Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças 
em nossas práticas de tratamento de dados ou em conformidade com novas 
legislações. Recomendamos que os usuários revisitem esta página regularmente para 
se manterem informados sobre como protegemos suas informações. Alterações 
significativas serão comunicadas de forma clara e destacada. </p>
        </section>

        <section>
          <h2>Contato </h2>
          <p>Para quaisquer dúvidas, solicitações ou para exercer seus direitos como titular de 
dados, entre em contato com o responsável pelo tratamento de dados do Assistente 
Financeiro através do seguinte e-mail: zenifinance99@gmail.com</p>
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
