import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import { ArrowUpRight, ArrowDownRight, PiggyBank, Clock } from "lucide-react";

import StatCard from "../../components/ValueCard";
import ContentCard from "../../components/ContentCard";
import TableCard from "../../components/TableCard.jsx";
import TopCategoriesCard from "../../components/TopCategoryCard.jsx";
import FilterCard from "../../components/FilterCard.jsx";
import GamblingAlertCard from "../../components/GamblingAlertCard.jsx";


import CategoryPieChart from "../../components/CategoryPieChart";
import ReceitaDespesasBarChart from "../../components/ReceitaDespesasBarChart.jsx";
import InvestimentosLineChart from "../../components/InvesimentosLineChart.jsx";

import MOCK_CATEGORIES from "../../utils/mock_category.js";
import MOCK_MONTHLY_RESUME from "../../utils/mock_mouth.js";
import MOCK_INVESTMENTS from "../../utils/mock_investiments.js";
import MOCK_HISTORY from "../../utils/mock_historic.js";

// import { Clock } from "lucide-react";

export default function Dashboard() {
  const columns = ["Descrição", "Categoria","Tipo de Registro", "Valor", "Data"];

  const data = [
    ["ifood", "ALIMENTACAO", "DESPESA", 100.0, "2025-09-07"],
    ["Dividendos", "INVESTIMENTOS", "RECEITA", 1000000.0, "2024-12-31"],
    ["Salario", "RENDA", "RECEITA", 1000000.0, "2024-12-31"],
    ["Bet365", "CASA_DE_APOSTA", "DESPESA", 150.0, "2025-10-01"],
    ["PokerStars", "CASA_DE_APOSTA", "DESPESA", 100.0, "2025-10-05"],
  ];

  // Estado para mostrar card de apostas
  const [showGamblingCard, setShowGamblingCard] = useState(false);
  const [gamblingAmount, setGamblingAmount] = useState(0);

  useEffect(() => {
    // Calcular total gasto em casas de aposta
    const total = data
      .filter(item => item[1] === "CASA_DE_APOSTA")
      .reduce((acc, item) => acc + Number(item[3]), 0);

    if (total > 0) {
      setGamblingAmount(total);
      setShowGamblingCard(true);
    }
  }, [data]);

  return (
    <DashboardLayout>

       {/* Card de casas de aposta */}
      {showGamblingCard && (
        <div style={{ marginBottom: "30px" }}>
          <GamblingAlertCard 
            amount={gamblingAmount} 
            onClose={() => setShowGamblingCard(false)} 
          />
        </div>
      )}
     
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <StatCard title="Receitas" value="R$ 8.900" icon={<ArrowUpRight />} />
        <StatCard title="Despesas" value="R$ 3.750" icon={<ArrowDownRight />} />
        <StatCard title="Saldo" value="R$ 5.150" icon={<PiggyBank />} />
      </div>

      <FilterCard/>
      
      <ContentCard title="Gastos por Categoria">
          <ReceitaDespesasBarChart data={MOCK_MONTHLY_RESUME}/>
      </ContentCard>
      
      <ContentCard title="Gastos por Categoria">
        <InvestimentosLineChart data={MOCK_INVESTMENTS} />
      </ContentCard>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
      <ContentCard title="Gastos por Categoria">
        <CategoryPieChart data={MOCK_CATEGORIES} />
      </ContentCard>

      <TopCategoriesCard data={MOCK_CATEGORIES}/>
        
      
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
       
      </div>

      <TableCard 
        title="Registros Recentes"
        icon={<Clock />}
        columns={columns}
        data={data}
      />
      
    </DashboardLayout>
  );
}
