export const CATEGORY_INFO = {
  ALIMENTACAO: { 
    label: "Alimentação", 
    color: "#E63946" // vermelho vivo
  },
  TRANSPORTE: { 
    label: "Transporte", 
    color: "#626700ff" // amarelo
  },
  MORADIA: { 
    label: "Moradia", 
    color: "#1D3557" // azul escuro
  },
  SAUDE: { 
    label: "Saúde", 
    color: "#2A9D8F" // verde água
  },
  EDUCACAO: { 
    label: "Educação", 
    color: "#FFBE0B" // laranja
  },
  LAZER_E_ENTRETENIMENTO: { 
    label: "Lazer e Entretenimento", 
    color: "#8338EC" // roxo vibrante
  },
  BETS_E_JOGOS_DE_AZAR: { 
    label: "Bets / Jogos de Azar", 
    color: "#D00000" // vermelho escuro
  },
  VESTUARIO: { 
    label: "Vestuário", 
    color: "#FF6F91" // rosa forte
  },
  SERVICOS: { 
    label: "Serviços", 
    color: "#06D6A0" // verde limão
  },
  IMPOSTOS_E_TAXAS: { 
    label: "Impostos e Taxas", 
    color: "#FF6700" // laranja forte
  },
  SALARIO: { 
    label: "Salário", 
    color: "#023E8A" // azul royal
  },
  FREELANCE_E_SERVICOS_PRESTADOS: { 
    label: "Freelance e Serviços", 
    color: "#00B4D8" // azul claro
  },
  INVESTIMENTOS: { 
    label: "Investimentos", 
    color: "#7209B7" // roxo escuro
  },
  PRESENTES_E_DOACOES_RECEBIDAS: { 
    label: "Presentes / Doações", 
    color: "#F72585" // magenta
  },
  REEMBOLSOS_E_RESTITUICOES: { 
    label: "Reembolsos / Restituições", 
    color: "#3A0CA3" // azul escuro
  }
};

// Funções utilitárias
export const getCategoryColor = (key) => CATEGORY_INFO[key]?.color || "#999";
export const getCategoryLabel = (key) => CATEGORY_INFO[key]?.label || key;
