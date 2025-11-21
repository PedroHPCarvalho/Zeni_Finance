import React, { useState, useEffect, Suspense } from "react";
import { ArrowUpRight, ArrowDownRight, PiggyBank, Clock } from "lucide-react";

import StatCard from "../../components/ValueCard";
import ContentCard from "../../components/ContentCard";
import TableCard from "../../components/TableCard.jsx";
import TopCategoriesCard from "../../components/TopCategoryCard.jsx";
import FilterCard from "../../components/FilterCard.jsx";
import GamblingAlertCard from "../../components/GamblingAlertCard.jsx";

// === LAZY LOADING DOS GRÁFICOS PESADOS ===
const CategoryPieChart = React.lazy(() =>
  import("../../components/CategoryPieChart")
);
const ReceitaDespesasBarChart = React.lazy(() =>
  import("../../components/ReceitaDespesasBarChart")
);
const InvestimentosLineChart = React.lazy(() =>
  import("../../components/InvesimentosLineChart")
);

// === MOCKS ===
import MOCK_CATEGORIES from "../../utils/mock_category.js";
import MOCK_MONTHLY_RESUME from "../../utils/mock_mouth.js";
import MOCK_INVESTMENTS from "../../utils/mock_investiments.js";

export default function Dashboard() {
  const columns = ["Descrição", "Categoria", "Tipo de Registro", "Valor", "Data"];

  const data = [
    ["ifood", "ALIMENTACAO", "DESPESA", 100.0, "2025-09-07"],
    ["Dividendos", "INVESTIMENTOS", "RECEITA", 1000000.0, "2024-12-31"],
    ["Salario", "RENDA", "RECEITA", 1000000.0, "2024-12-31"],
    ["Bet365", "CASA_DE_APOSTA", "DESPESA", 150.0, "2025-10-01"],
    ["PokerStars", "CASA_DE_APOSTA", "DESPESA", 100.0, "2025-10-05"],
  ];

  // Estado para card de apostas
  const [showGamblingCard, setShowGamblingCard] = useState(false);
  const [gamblingAmount, setGamblingAmount] = useState(0);

  useEffect(() => {
    const gamblingItems = data.filter((item) => item[1] === "CASA_DE_APOSTA");
    const total = gamblingItems.reduce((acc, item) => acc + Number(item[3]), 0);

    if (total > 0) {
      setGamblingAmount(total);
      setShowGamblingCard(true);
    } else {
      setShowGamblingCard(false);
    }
  }, [data]);

  const sectionGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginBottom: "24px",
  };

  // === Fallback para carregar gráficos ===
  const ChartFallback = (
    <div
      style={{
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#777",
      }}
    >
      Carregando gráfico...
    </div>
  );

  return (
    <>
      {showGamblingCard && (
        <div style={{ marginBottom: "24px" }}>
          <GamblingAlertCard
            amount={gamblingAmount}
            onClose={() => setShowGamblingCard(false)}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <StatCard
          title="Receitas"
          value="R$ 8.900"
          icon={<ArrowUpRight className="text-green-600" />}
          variant="income"
        />
        <StatCard
          title="Despesas"
          value="R$ 3.750"
          icon={<ArrowDownRight className="text-red-600" />}
          variant="expense"
        />
        <StatCard
          title="Saldo"
          value="R$ 5.150"
          icon={<PiggyBank className="text-blue-600" />}
          variant="balance"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <FilterCard />
      </div>

      <div style={sectionGridStyle}>
        <ContentCard title="Receitas vs Despesas">
          <Suspense fallback={ChartFallback}>
            <ReceitaDespesasBarChart data={MOCK_MONTHLY_RESUME} />
          </Suspense>
        </ContentCard>

        <ContentCard title="Evolução Patrimonial">
          <Suspense fallback={ChartFallback}>
            <InvestimentosLineChart data={MOCK_INVESTMENTS} />
          </Suspense>
        </ContentCard>
      </div>

      <div style={sectionGridStyle}>
        <ContentCard title="Distribuição por Categoria">
          <div 
            style={{ 
              width: "100%", 
              height: window.innerWidth <= 768 ? "420px" : "320px" 
            }}
          >
            <CategoryPieChart data={MOCK_CATEGORIES} />
          </div>
        </ContentCard>

        <TopCategoriesCard
          title="Top 5 Categorias de Gastos"
          data={MOCK_CATEGORIES}
          type="DESPESA"
        />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <TableCard
          title="Registros Recentes"
          icon={<Clock />}
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
}
