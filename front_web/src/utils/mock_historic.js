// utils/mock_history.js

const MOCK_HISTORY = {
  content: [
    {
      id: 1,
      description: "Compra no iFood",
      category: "ALIMENTACAO",
      value: 45.5,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-01T00:00:00.000+00:00"
    },
    {
      id: 2,
      description: "Salário Novembro",
      category: "SALARIO",
      value: 5000.0,
      typeRegister: "RECEITA",
      dateRegister: "2025-11-05T00:00:00.000+00:00"
    },
    {
      id: 3,
      description: "Investimento em ações",
      category: "INVESTIMENTOS",
      value: 2000.0,
      typeRegister: "INVESTIMENTO",
      dateRegister: "2025-11-07T00:00:00.000+00:00"
    },
    {
      id: 4,
      description: "Transporte Uber",
      category: "TRANSPORTE",
      value: 30.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-02T00:00:00.000+00:00"
    },
    {
      id: 5,
      description: "Freelance projeto X",
      category: "FREELANCE_E_SERVICOS_PRESTADOS",
      value: 800.0,
      typeRegister: "RECEITA",
      dateRegister: "2025-11-03T00:00:00.000+00:00"
    },
    {
      id: 6,
      description: "Academia",
      category: "SAUDE",
      value: 150.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-06T00:00:00.000+00:00"
    },
    {
      id: 7,
      description: "Investimento em Tesouro",
      category: "INVESTIMENTOS",
      value: 1000.0,
      typeRegister: "INVESTIMENTO",
      dateRegister: "2025-11-07T00:00:00.000+00:00"
    },
    {
      id: 8,
      description: "Aluguel",
      category: "MORADIA",
      value: 1200.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-01T00:00:00.000+00:00"
    },
    {
      id: 9,
      description: "Recebimento dividendos",
      category: "INVESTIMENTOS",
      value: 500.0,
      typeRegister: "RECEITA",
      dateRegister: "2025-11-08T00:00:00.000+00:00"
    },
    {
      id: 10,
      description: "Netflix",
      category: "LAZER_E_ENTRETENIMENTO",
      value: 50.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-04T00:00:00.000+00:00"
    },
    {
      id: 11,
      description: "Compra roupas",
      category: "VESTUARIO",
      value: 250.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-05T00:00:00.000+00:00"
    },
    {
      id: 12,
      description: "Salário Extra",
      category: "SALARIO",
      value: 2000.0,
      typeRegister: "RECEITA",
      dateRegister: "2025-11-09T00:00:00.000+00:00"
    },
    {
      id: 13,
      description: "iFood",
      category: "ALIMENTACAO",
      value: 60.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-09T00:00:00.000+00:00"
    },
    {
      id: 14,
      description: "Bet365",
      category: "BETS_E_JOGOS_DE_AZAR",
      value: 120.0,
      typeRegister: "DESPESA",
      dateRegister: "2025-11-10T00:00:00.000+00:00"
    },
    {
      id: 15,
      description: "Recebimento de prêmio",
      category: "REEMBOLSOS_E_RESTITUICOES",
      value: 300.0,
      typeRegister: "RECEITA",
      dateRegister: "2025-11-10T00:00:00.000+00:00"
    }
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
    sort: { sorted: true, empty: false, unsorted: false },
    offset: 0,
    paged: true,
    unpaged: false
  },
  totalElements: 15,
  totalPages: 2,
  last: false,
  size: 10,
  number: 0,
  sort: { sorted: true, empty: false, unsorted: false },
  numberOfElements: 10,
  first: true,
  empty: false
};

export default MOCK_HISTORY;
