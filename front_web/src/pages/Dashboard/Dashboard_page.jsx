// Dashboard.jsx
// ======================================================================
// IMPORTS
// ======================================================================
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

const CategoryPieChart = React.lazy(() =>
  import("../../components/CategoryPieChart")
);
const ReceitaDespesasBarChart = React.lazy(() =>
  import("../../components/ReceitaDespesasBarChart")
);
const InvestimentosLineChart = React.lazy(() =>
  import("../../components/InvesimentosLineChart")
);

// ======================================================================
// Small Error Boundary
// ======================================================================
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

// ======================================================================
// DASHBOARD
// ======================================================================
export default function Dashboard() {
  const columns = ["Descrição", "Categoria", "Tipo", "Valor", "Data"];

  // hooks
  const { dataCards } = useCards();
  const { categories } = useCategory();
  const { dataRegistries, loading, error } = usePaginatedFetch(0, 5);

  const tableData = Array.isArray(dataRegistries?.content)
    ? dataRegistries.content.map((reg) => [
        reg.description,
        reg.category,
        reg.typeRegister,
        reg.value,
        reg.dateRegister,
      ])
    : [];

  const {
    monthResume,
    loading: loadingResume,
    error: errorResume,
  } = useMonthResume();

  const {
    investments,
    loading: loadingInv,
    error: errorInv,
  } = useInvestments();

  // filtro atual
  const [filters, setFilters] = useState({ mes: null, ano: null });

  // dados exibidos
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // inicializa dados ao carregar API
  useEffect(() => {
    if (!loadingResume && Array.isArray(monthResume)) {
      setFilteredData(monthResume.slice(-12));
    }
  }, [loadingResume, monthResume]);

  useEffect(() => {
    if (!loadingInv && Array.isArray(investments)) {
      setFilteredInvestments(investments);
    }
  }, [loadingInv, investments]);

  useEffect(() => {
    if (Array.isArray(categories)) setFilteredCategories(categories);
  }, [categories]);

  // ================================
  //   HANDLE FILTER
  // ================================
  const handleFilter = (filter) => {
    if (!filter) {
      setFilters({ mes: null, ano: null });
      setFilteredData(monthResume.slice(-12));
      setFilteredInvestments(investments);
      setFilteredCategories(categories);
      return;
    }

    const { mes, ano } = filter;
    setFilters({ mes, ano });

    const resumeResult = monthResume.filter((i) => {
      const okM = mes ? i.mes === mes : true;
      const okA = ano ? Number(i.ano) === Number(ano) : true;
      return okM && okA;
    });

    const invResult = investments.filter((i) => {
      const okM = mes ? i.mes === mes : true;
      const okA = ano ? Number(i.ano) === Number(ano) : true;
      return okM && okA;
    });

    const catResult = categories.filter((i) => {
      const okM = mes ? i.mes === mes : true;
      const okA = ano ? Number(i.ano) === Number(ano) : true;
      return okM && okA;
    });

    setFilteredData(resumeResult);
    setFilteredInvestments(invResult);
    setFilteredCategories(catResult);
  };

  const ChartFallback = (
    <div
      style={{
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        color: "#777",
      }}
    >
      Carregando gráfico...
    </div>
  );

  // ================================
  //   CASAS DE APOSTA - ALERTA
  // ================================
  const [showGamblingAlert, setShowGamblingAlert] = useState(false);
  const [gamblingAmount, setGamblingAmount] = useState(0);

  useEffect(() => {
    if (Array.isArray(dataRegistries?.content) && dataRegistries.content.length > 0) {
      const recentRecords = dataRegistries.content.slice(0, 5);

      const gamblingRecords = recentRecords.filter(
        (r) =>
          r.category === "CASA_DE_APOSTA" ||
          r.category === "BETS_E_JOGOS_DE_AZAR"
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

  // ======================================================================
  // RENDER
  // ======================================================================
  return (
    <>
      {/* Card Apostas */}
      {showGamblingAlert && (
        <div style={{ marginBottom: 24 }}>
          <GamblingAlertCard
            amount={gamblingAmount}
            onClose={() => setShowGamblingAlert(false)}
          />
        </div>
      )}

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
          marginBottom: 24,
        }}
      >
        <StatCard
          title="Receitas"
          value={`R$ ${
            dataCards?.sumEntry?.toLocaleString?.("pt-BR", {
              minimumFractionDigits: 2,
            }) ?? "0,00"
          }`}
          icon={<ArrowUpRight />}
          variant="income"
        />

        <StatCard
          title="Despesas"
          value={`R$ ${
            dataCards?.sumExit?.toLocaleString?.("pt-BR", {
              minimumFractionDigits: 2,
            }) ?? "0,00"
          }`}
          icon={<ArrowDownRight />}
          variant="expense"
        />

        <StatCard
          title="Saldo"
          value={`R$ ${
            dataCards?.balanceNow?.toLocaleString?.("pt-BR", {
              minimumFractionDigits: 2,
            }) ?? "0,00"
          }`}
          icon={<PiggyBank />}
          variant="balance"
        />
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 12 }}>
        <FilterCard onFilter={handleFilter} />
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 24,
        }}
      >
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 24,
          marginTop: 24,
        }}
      >
        <ContentCard title="Distribuição por Categoria">
          <ErrorBoundary>
            <Suspense fallback={ChartFallback}>
              <CategoryPieChart data={filteredCategories || []} />
            </Suspense>
          </ErrorBoundary>
        </ContentCard>

        <TopCategoriesCard
          title="Top Categorias de Gastos"
          data={filteredCategories || []}
          type="DESPESA"
        />
      </div>

      {/* Table */}
      <div style={{ marginTop: 24 }}>
        <TableCard
          title="Registros Recentes"
          icon={<Clock />}
          columns={columns}
          data={tableData}
        />
      </div>
    </>
  );
}
