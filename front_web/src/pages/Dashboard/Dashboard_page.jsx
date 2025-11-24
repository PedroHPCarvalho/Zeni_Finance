import React, { useState, useEffect, Suspense } from "react";
import { ArrowUpRight, ArrowDownRight, PiggyBank, Clock } from "lucide-react";

import StatCard from "../../components/ValueCard";
import ContentCard from "../../components/ContentCard";
import TableCard from "../../components/TableCard.jsx";
import TopCategoriesCard from "../../components/TopCategoryCard.jsx";
import FilterCard from "../../components/FilterCard.jsx";
import GamblingAlertCard from "../../components/GamblingAlertCard";

import { useCards } from "../../hooks/useCards.js";
import { useCategory } from "../../hooks/useCategory.js";
import { useMonthResume } from "../../hooks/useMonthResume.js";
import { useInvestments } from "../../hooks/useInvestments";
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch.js";

const CategoryPieChart = React.lazy(() => import("../../components/CategoryPieChart"));
const ReceitaDespesasBarChart = React.lazy(() => import("../../components/ReceitaDespesasBarChart"));
const InvestimentosLineChart = React.lazy(() => import("../../components/InvesimentosLineChart"));

// ================================
// ErrorBoundary para charts
// ================================
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ padding: 16, color: "#b00020" }}>Erro no gráfico.</div>;
    }
    return this.props.children;
  }
}

// ================================
// Dashboard
// ================================
export default function Dashboard() {
  const columns = ["Descrição", "Categoria", "Tipo", "Valor", "Data"];

  // hooks
  const { dataCards } = useCards();
  const { categories } = useCategory();
  const { dataRegistries } = usePaginatedFetch(0, 5);
  const { monthResume, loading: loadingResume } = useMonthResume();
  const { investments, loading: loadingInv } = useInvestments();

  // ================================
  // Filtros
  // ================================
  const [filters, setFilters] = useState({ mes: null, ano: null });

  // ================================
  // Dados filtrados
  // ================================
  const [filteredCards, setFilteredCards] = useState({ sumEntry: 0, sumExit: 0, balanceNow: 0 });
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);

  // Inicializa dados
  useEffect(() => {
    if (!loadingResume && Array.isArray(monthResume)) {
      setFilteredData(monthResume.slice(-12));

      const sumEntry = monthResume.reduce((acc, i) => acc + (i.receitas || 0), 0);
      const sumExit = monthResume.reduce((acc, i) => acc + (i.despesas || 0), 0);
      setFilteredCards({ sumEntry, sumExit, balanceNow: sumEntry - sumExit });
    }
  }, [loadingResume, monthResume]);

  useEffect(() => {
    if (!loadingInv && Array.isArray(investments)) {
      setFilteredInvestments(investments);
    }
  }, [loadingInv, investments]);

  // ================================
  // Handle Filter
  // ================================
  const handleFilter = (filter) => {
    const mes = filter?.mes || null;
    const ano = filter?.ano ? Number(filter.ano) : null;
    setFilters({ mes, ano });

    // Filtra monthResume
    const filteredResume = monthResume.filter(
      (i) => (mes ? i.mes === mes : true) && (ano ? Number(i.ano) === ano : true)
    );

    const filteredInv = investments.filter(
      (i) => (mes ? i.mes === mes : true) && (ano ? Number(i.ano) === ano : true)
    );

    const sumEntry = filteredResume.reduce((acc, i) => acc + (i.receitas || 0), 0);
    const sumExit = filteredResume.reduce((acc, i) => acc + (i.despesas || 0), 0);

    setFilteredData(filteredResume);
    setFilteredInvestments(filteredInv);
    setFilteredCards({ sumEntry, sumExit, balanceNow: sumEntry - sumExit });
  };

  // ================================
  // Gambling Alert
  // ================================
  const [showGamblingAlert, setShowGamblingAlert] = useState(false);
  const [gamblingAmount, setGamblingAmount] = useState(0);

  useEffect(() => {
    if (Array.isArray(dataRegistries?.content) && dataRegistries.content.length > 0) {
      const recentRecords = dataRegistries.content.slice(0, 5);
      const gamblingRecords = recentRecords.filter(
        (r) => r.category === "CASA_DE_APOSTA" || r.category === "BETS_E_JOGOS_DE_AZAR"
      );

      if (gamblingRecords.length > 0) {
        const total = gamblingRecords.reduce((acc, r) => acc + r.value, 0);
        setGamblingAmount(total);
        setShowGamblingAlert(true);
      } else {
        setShowGamblingAlert(false);
        setGamblingAmount(0);
      }
    }
  }, [dataRegistries]);

  const ChartFallback = (
    <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#777" }}>
      Carregando gráfico...
    </div>
  );

  // ================================
  // Table Data
  // ================================
  const tableData = Array.isArray(dataRegistries?.content)
    ? dataRegistries.content.map((reg) => [reg.description, reg.category, reg.typeRegister, reg.value, reg.dateRegister])
    : [];

  // ================================
  // Render
  // ================================
  return (
    <>
      {/* Alerta Apostas */}
      {showGamblingAlert && (
        <div style={{ marginBottom: 24 }}>
          <GamblingAlertCard amount={gamblingAmount} onClose={() => setShowGamblingAlert(false)} />
        </div>
      )}

      {/* Filter */}
      <div style={{ marginBottom: 12 }}>
        <FilterCard onFilter={handleFilter} />
      </div>

      {/* StatCards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 24 }}>
        <StatCard
          title="Receitas"
          value={`R$ ${filteredCards.sumEntry.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={<ArrowUpRight />}
          variant="income"
        />
        <StatCard
          title="Despesas"
          value={`R$ ${filteredCards.sumExit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={<ArrowDownRight />}
          variant="expense"
        />
        <StatCard
          title="Saldo"
          value={`R$ ${filteredCards.balanceNow.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          icon={<PiggyBank />}
          variant="balance"
        />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
        <ContentCard title="Receitas vs Despesas">
          {loadingResume ? (
            <div style={{ padding: 20 }}>Carregando dados...</div>
          ) : filteredData.length === 0 ? (
            <div style={{ padding: 20 }}>Nenhum dado disponível.</div>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={ChartFallback}>
                <ReceitaDespesasBarChart data={filteredData} />
              </Suspense>
            </ErrorBoundary>
          )}
        </ContentCard>

        <ContentCard title="Evolução Patrimonial">
          {loadingInv ? (
            <div style={{ padding: 20 }}>Carregando investimentos...</div>
          ) : filteredInvestments.length === 0 ? (
            <div style={{ padding: 20 }}>Nenhum dado encontrado.</div>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={ChartFallback}>
                <InvestimentosLineChart data={filteredInvestments} />
              </Suspense>
            </ErrorBoundary>
          )}
        </ContentCard>
      </div>

      {/* Categories */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, marginTop: 24 }}>
        <ContentCard title="Distribuição por Categoria">
          <ErrorBoundary>
            <Suspense fallback={ChartFallback}>
              <CategoryPieChart data={categories || []} filterMonth={filters.mes} filterYear={filters.ano} />
            </Suspense>
          </ErrorBoundary>
        </ContentCard>

        <TopCategoriesCard title="Top Categorias de Gastos" data={categories || []} type="DESPESA" filterMonth={filters.mes} filterYear={filters.ano} />
      </div>

      {/* Table */}
      <div style={{ marginTop: 24 }}>
        <TableCard title="Registros Recentes" icon={<Clock />} columns={columns} data={tableData} />
      </div>
    </>
  );
}
