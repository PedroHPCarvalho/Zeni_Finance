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

const Skeleton = ({ height, width, style, className }) => (
  <div
    className={className}
    style={{
      backgroundColor: "#e0e0e0",
      borderRadius: "4px",
      width: width || "100%",
      height: height || "100%",
      animation: "skeleton-loading 1.5s infinite",
      ...style,
    }}
  />
);

const BarChartSkeleton = () => (
  <div style={{ padding: "30px 20px 20px 20px", height: 320, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "85%", gap: "8px" }}>
      {[...Array(12)].map((_, i) => (
        <Skeleton 
          key={i} 
          width="100%" 
          height={`${[60, 75, 50, 80, 55, 70, 65, 85, 45, 90, 60, 70][i]}%`} 
          style={{ borderRadius: "4px 4px 0 0" }}
        />
      ))}
    </div>
    <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between" }}>
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} height={10} width={40} />
      ))}
    </div>
  </div>
);

const LineChartSkeleton = () => (
  <div style={{ padding: "20px", height: "320px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>

       <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 0 }}>
          {[...Array(5)].map((_, i) => (
             <div key={i} style={{ borderBottom: "1px dashed #e0e0e0", height: "1px", width: "100%" }}></div>
          ))}
       </div>

       <svg style={{ width: "100%", height: "100%", zIndex: 1 }} preserveAspectRatio="none" viewBox="0 0 100 50">
         <polyline
            points="0,50 10,40 20,45 30,30 40,35 50,20 60,25 70,10 80,15 90,5 100,20"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "skeleton-loading 1.5s infinite" }}
         />
       </svg>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} width={40} height={10} />
        ))}
    </div>
  </div>
);

const PieChartSkeleton = () => (
  <div style={{ padding: 20, height: 320, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "relative", width: 200, height: 200 }}>
       <Skeleton style={{ borderRadius: "50%", width: "100%", height: "100%" }} />
       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 120, height: 120, background: "#fff", borderRadius: "50%" }}></div>
    </div>
    <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
       <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Skeleton width={12} height={12} style={{ borderRadius: "50%" }} /><Skeleton width={60} height={10} /></div>
       <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Skeleton width={12} height={12} style={{ borderRadius: "50%" }} /><Skeleton width={60} height={10} /></div>
       <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Skeleton width={12} height={12} style={{ borderRadius: "50%" }} /><Skeleton width={60} height={10} /></div>
    </div>
  </div>
);

const ListSkeleton = () => (
  <div style={{ padding: 20 }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <Skeleton width={40} height={40} style={{ borderRadius: "50%", marginRight: 16, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Skeleton width={120} height={14} />
              <Skeleton width={60} height={14} />
           </div>
           <Skeleton width="100%" height={8} />
        </div>
      </div>
    ))}
  </div>
);

const TableSkeleton = () => (
   <div style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <Skeleton width={32} height={32} style={{ borderRadius: 8 }} />
          <Skeleton height={32} width={200} />
      </div>
      <div style={{ marginBottom: 16 }}><Skeleton height={40} /></div>
      <div style={{ marginBottom: 16 }}><Skeleton height={40} /></div>
      <div style={{ marginBottom: 16 }}><Skeleton height={40} /></div>
      <div style={{ marginBottom: 16 }}><Skeleton height={40} /></div>
      <div><Skeleton height={40} /></div>
   </div>
);

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

export default function Dashboard() {
  const columns = ["Descrição", "Categoria", "Tipo", "Valor", "Data"];

  const { dataCards } = useCards();
  const { categories, loading: loadingCat } = useCategory();
  const { dataRegistries, loading: loadingTable } = usePaginatedFetch(0, 5);
  const { monthResume, loading: loadingResume } = useMonthResume();
  const { investments, loading: loadingInv } = useInvestments();

  const [filters, setFilters] = useState({ mes: null, ano: null });

  const [filteredCards, setFilteredCards] = useState({ sumEntry: 0, sumExit: 0, balanceNow: 0 });
  const [filteredData, setFilteredData] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);

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

  const handleFilter = (filter) => {
    const mes = filter?.mes || null;
    const ano = filter?.ano ? Number(filter.ano) : null;
    setFilters({ mes, ano });

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

  const tableData = Array.isArray(dataRegistries?.content)
    ? dataRegistries.content.map((reg) => [reg.description, reg.category, reg.typeRegister, reg.value, reg.dateRegister])
    : [];

  return (
    <>
      <style>
        {`
          @keyframes skeleton-loading {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}
      </style>

      {showGamblingAlert && (
        <div style={{ marginBottom: 24 }}>
          <GamblingAlertCard amount={gamblingAmount} onClose={() => setShowGamblingAlert(false)} />
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <FilterCard onFilter={handleFilter} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 24 }}>
        {loadingResume ? (
          <>
            <div style={{ height: 120, background: "#fff", borderRadius: 12, padding: 20 }}><Skeleton height={40} width={100} style={{ marginBottom: 16 }}/><Skeleton height={32} width={150} /></div>
            <div style={{ height: 120, background: "#fff", borderRadius: 12, padding: 20 }}><Skeleton height={40} width={100} style={{ marginBottom: 16 }}/><Skeleton height={32} width={150} /></div>
            <div style={{ height: 120, background: "#fff", borderRadius: 12, padding: 20 }}><Skeleton height={40} width={100} style={{ marginBottom: 16 }}/><Skeleton height={32} width={150} /></div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
        <ContentCard title="Receitas vs Despesas">
          {loadingResume ? (
            <BarChartSkeleton />
          ) : filteredData.length === 0 ? (
            <div style={{ padding: 20 }}>Nenhum dado disponível.</div>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<BarChartSkeleton />}>
                <ReceitaDespesasBarChart data={filteredData} />
              </Suspense>
            </ErrorBoundary>
          )}
        </ContentCard>

        <ContentCard title="Evolução Patrimonial">
          {loadingInv ? (
             <LineChartSkeleton />
          ) : filteredInvestments.length === 0 ? (
            <div style={{ padding: 20 }}>Nenhum dado encontrado.</div>
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<LineChartSkeleton />}>
                <InvestimentosLineChart data={filteredInvestments} />
              </Suspense>
            </ErrorBoundary>
          )}
        </ContentCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, marginTop: 24 }}>
        <ContentCard title="Distribuição por Categoria">
          {loadingCat ? (
            <PieChartSkeleton />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<PieChartSkeleton />}>
                <CategoryPieChart data={categories || []} filterMonth={filters.mes} filterYear={filters.ano} />
              </Suspense>
            </ErrorBoundary>
          )}
        </ContentCard>

        {loadingCat ? (
           <ContentCard title="Top Categorias de Gastos">
             <ListSkeleton />
           </ContentCard>
        ) : (
           <TopCategoriesCard 
              title="Top Categorias de Gastos" 
              data={categories || []} 
              type="DESPESA" 
              filterMonth={filters.mes} 
              filterYear={filters.ano}
           />
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        {loadingTable ? (
          <TableSkeleton />
        ) : (
          <TableCard title="Registros Recentes" icon={<Clock />} columns={columns} data={tableData} />
        )}
      </div>
    </>
  );
}