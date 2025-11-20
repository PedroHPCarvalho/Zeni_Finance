export const CATEGORY_INFO = {
  ALIMENTACAO: {
    label: "Alimentação",
    color: "#FF6B6B"
  },
  TRANSPORTE: {
    label: "Transporte",
    color: "#4ECDC4"
  },
  MORADIA: {
    label: "Moradia",
    color: "#1A535C"
  },
  SAUDE: {
    label: "Saúde",
    color: "#FF9F1C"
  },
  EDUCACAO: {
    label: "Educação",
    color: "#5E60CE"
  },
  LAZER_E_ENTRETENIMENTO: {
    label: "Lazer e Entretenimento",
    color: "#6930C3"
  },
  BETS_E_JOGOS_DE_AZAR: {
    label: "Bets / Jogos de Azar",
    color: "#9D0208"
  },
  VESTUARIO: {
    label: "Vestuário",
    color: "#9A8C98"
  },
  SERVICOS: {
    label: "Serviços",
    color: "#2A9D8F"
  },
  IMPOSTOS_E_TAXAS: {
    label: "Impostos e Taxas",
    color: "#E76F51"
  },
  SALARIO: {
    label: "Salário",
    color: "#3A86FF"
  },
  FREELANCE_E_SERVICOS_PRESTADOS: {
    label: "Freelance e Serviços",
    color: "#00B4D8"
  },
  INVESTIMENTOS: {
    label: "Investimentos",
    color: "#007F5F"
  },
  PRESENTES_E_DOACOES_RECEBIDAS: {
    label: "Presentes / Doações",
    color: "#6A4C93"
  },
  REEMBOLSOS_E_RESTITUICOES: {
    label: "Reembolsos / Restituições",
    color: "#38A3A5"
  }
};

export const getCategoryColor = (key) =>
  CATEGORY_INFO[key]?.color || "#999";

export const getCategoryLabel = (key) =>
  CATEGORY_INFO[key]?.label || key;

