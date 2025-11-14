import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useMe } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  LogOut,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid ,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import styles from "../../styles/Dashboard/Dashboard_page.module.css";
import { useCards } from "../../hooks/useCards";
import { useCategory } from "../../hooks/useCategory";
import { useInvestments } from "../../hooks/useInvestments";
import { useMonthResume } from "../../hooks/useMonthResume";

const MOCK_DATA_CARDS = {
  sumEntry: 15000.50,
  sumExit: 8000.00,
  balanceNow: 7000.50,
};

const MOCK_CATEGORIES = [
  { category: "Alimentação", total: 2500 },
  { category: "Transporte", total: 1200 },
  { category: "Moradia", total: 3500 },
  { category: "Lazer", total: 800 },
];

const MOCK_INVESTMENTS = [
  { mes: "08/2024", valor_investido: 10000 },
  { mes: "09/2024", valor_investido: 15000 },
  { mes: "10/2024", valor_investido: 18000 },
  { mes: "11/2024", valor_investido: 25000 },
  { mes: "12/2024", valor_investido: 30000 },
];

const MOCK_MONTH_RESUME = [
  { mes: "08/2024", despesas: 7000, receitas: 12000 },
  { mes: "09/2024", despesas: 7500, receitas: 13000 },
  { mes: "10/2024", despesas: 8500, receitas: 14000 },
  { mes: "11/2024", despesas: 8000, receitas: 15000 },
];

// ===== CONSTANTES =====
const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#C7CEEA", "#FF8B94", "#FFA502"];
const CHART_HEIGHTS = { desktop: 320, tablet: 260, mobile: 220 };
const BREAKPOINTS = { tablet: 768, mobile: 480 };

// ===== TIPOS DE BOTÕES =====
const BUTTON_STYLES = {
  primary: "rgba(20, 184, 166, 0.3)",
  danger: "rgba(255, 100, 100, 0.3)",
  primaryHover: "rgba(20, 184, 166, 0.5)",
  dangerHover: "rgba(255, 100, 100, 0.5)",
};

// ===== UTILITÁRIOS DE PARSING =====
/**
 * Extrai mês e ano de strings com formato variável
 * Suporta: "DD/MM/YYYY" ou "MM/YYYY"
 */
const parseMonthYear = (dateString) => {
  const parts = dateString.split("/");
  const month = parts.length === 3 ? parseInt(parts[1]) : parseInt(parts[0]);
  const year = parts.length === 3 ? parseInt(parts[2]) : parseInt(parts[1]);
  return { month, year };
};

/**
 * Extrai todos os anos únicos e disponíveis do dataset
 */
const extractAvailableYears = (monthResume) => {
  return Array.from(
    new Set(
      monthResume
        .map(({ mes }) => {
          const { year } = parseMonthYear(mes);
          return year || new Date().getFullYear();
        })
        .filter(Boolean)
    )
  ).sort((a, b) => b - a);
};

/**
 * Extrai todos os meses disponíveis para um ano específico
 */
const extractAvailableMonths = (monthResume, year) => {
  return Array.from(
    new Set(
      monthResume
        .map(({ mes }) => {
          const { month, year: dataYear } = parseMonthYear(mes);
          return dataYear === year ? month : null;
        })
        .filter(Boolean)
    )
  ).sort((a, b) => a - b);
};

/**
 * Obtém a altura do gráfico baseada no tamanho da janela
 */
const getChartHeight = (width) => {
  if (width < BREAKPOINTS.mobile) return CHART_HEIGHTS.mobile;
  if (width < BREAKPOINTS.tablet) return CHART_HEIGHTS.tablet;
  return CHART_HEIGHTS.desktop;
};

// ===== COMPONENTE PRINCIPAL =====
export default function Dashboard() {
  // ===== HOOKS DE DADOS =====
  const { user, loading } = useMe();
/*   const { dataCards } = useCards();
  const { categories } = useCategory();
  const { investments } = useInvestments();
  const { monthResume } = useMonthResume(); */
  const dataCards = MOCK_DATA_CARDS;
  const categories = MOCK_CATEGORIES;
  const investments = MOCK_INVESTMENTS;
  const monthResume = MOCK_MONTH_RESUME;
  const navigate = useNavigate();

  // ===== REFS E ESTADO LOCAL =====
  const menuRef = useRef(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [hiddenKeys, setHiddenKeys] = useState({});
/*   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); */
  const [selectedYear, setSelectedYear] = useState(2024);
/*   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); */
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [chartHeight, setChartHeight] = useState(() => getChartHeight(typeof window !== "undefined" ? window.innerWidth : 1024));

  // ===== DADOS SEGUROS COM FALLBACK =====
  const safeCategories = useMemo(() => categories.length ? categories : [{ category: "Sem dados", total: 0 }], [categories]);
  const safeInvestments = useMemo(() => investments.length ? investments : [{ mes: "Sem dados", valor_investido: 0 }], [investments]);
  const safeMonthResume = useMemo(() => monthResume.length ? monthResume : [{ mes: "Sem dados", despesas: 0, receitas: 0 }], [monthResume]);

  // ===== DADOS DERIVADOS MEMOIZADOS =====
  const availableYears = useMemo(() => extractAvailableYears(safeMonthResume), [safeMonthResume]);
  const availableMonths = useMemo(() => extractAvailableMonths(safeMonthResume, selectedYear), [safeMonthResume, selectedYear]);

  const isMonthAvailable = availableMonths.includes(selectedMonth);
  const displayMonth = isMonthAvailable ? selectedMonth : availableMonths[0] || 1;

  const filteredMonthResume = useMemo(
    () => safeMonthResume.filter(({ mes }) => {
      const { month, year } = parseMonthYear(mes);
      return month === displayMonth && year === selectedYear;
    }),
    [safeMonthResume, displayMonth, selectedYear]
  );

  // ===== FUNÇÕES DE NAVEGAÇÃO =====
  const goToPreviousMonth = useCallback(() => {
    if (displayMonth > 1) {
      setSelectedMonth(displayMonth - 1);
    } else if (availableYears.includes(selectedYear - 1)) {
      setSelectedYear(selectedYear - 1);
      const monthsInPrevYear = extractAvailableMonths(safeMonthResume, selectedYear - 1);
      setSelectedMonth(monthsInPrevYear[monthsInPrevYear.length - 1] || 12);
    }
  }, [displayMonth, selectedYear, availableYears, safeMonthResume]);

  const goToNextMonth = useCallback(() => {
    if (displayMonth < 12 && availableMonths.includes(displayMonth + 1)) {
      setSelectedMonth(displayMonth + 1);
    } else if (availableYears.includes(selectedYear + 1)) {
      setSelectedYear(selectedYear + 1);
      const monthsInNextYear = extractAvailableMonths(safeMonthResume, selectedYear + 1);
      setSelectedMonth(monthsInNextYear[0] || 1);
    }
  }, [displayMonth, selectedYear, availableMonths, availableYears, safeMonthResume]);

  const resetToToday = useCallback(() => {
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth() + 1);
  }, []);

  // ===== FUNÇÕES UTILITÁRIAS =====
  const toggleKey = useCallback((key) => {
    setHiddenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const currency = useCallback(
    (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  // ===== EFEITOS =====
  useEffect(() => {
    const handleResize = () => {
      setChartHeight(getChartHeight(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div>Carregando...</div>;

  // ===== RENDER DO CUSTOM TOOLTIP =====
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
      <div 
        style={{ 
          background: "rgba(17, 24, 39, 0.95)", 
          backdropFilter: "blur(8px)",
          color: "#fff", 
          padding: "10px 14px", 
          borderRadius: "8px", 
          fontSize: 12,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ opacity: 0.85, marginBottom: 8, fontWeight: 600 }}>{label}</div>
        {payload.map((p, idx) => (
          <div key={`tooltip-${idx}`} style={{ color: p.color, marginBottom: idx < payload.length - 1 ? 4 : 0 }}>
            <span style={{ fontWeight: 500 }}>{p.name}:</span> {currency(p.value)}
          </div>
        ))}
      </div>
    );
  }

  // ===== RENDER DO CUSTOM LEGEND =====
  function CustomLegend({ payload }) {
    if (!payload) return null;
    return (
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 16, 
          flexWrap: "wrap", 
          padding: "12px 8px 0 8px",
        }}
      >
        {payload.map((item) => {
          const key = item.dataKey || item.value;
          const hidden = hiddenKeys[key];
          return (
            <div
              key={key}
              onClick={() => toggleKey(key)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => e.key === "Enter" && toggleKey(key)}
              style={{ 
                cursor: "pointer", 
                display: "flex", 
                alignItems: "center", 
                gap: 8, 
                opacity: hidden ? 0.4 : 1,
                transition: "all 0.2s ease",
                padding: "6px 12px",
                borderRadius: "8px",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div 
                style={{ 
                  width: 14, 
                  height: 14, 
                  background: item.color, 
                  borderRadius: 6,
                  boxShadow: `0 0 8px ${item.color}`,
                  transition: "all 0.2s ease",
                }} 
              />
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={styles["dashboard-root"]}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #003c3c, #008b8b)",
        color: "#fff",
        padding: "2rem",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* ===== CABEÇALHO ===== */}
      <header
        className={styles["dashboard-header"]}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Bem-vindo, {user?.name || "usuário"} 👋</h1>
          <p>Relatório Finanças</p>
        </div>

        {/* ===== BOTÃO DE MENU DO USUÁRIO ===== */}
        <div className={styles['user-menu']} ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuAberto(prev => !prev)}
            className={styles['user-button']}
            aria-expanded={menuAberto}
            aria-haspopup="menu"
            type="button"
          >
            <Settings size={20} />
            <span>Opções</span>
          </button>

          <div
            className={styles['user-dropdown']}
            style={{
              display: menuAberto ? 'block' : 'none',
              position: 'absolute',
              right: 0,
              top: '48px',
              zIndex: 50,
            }}
            role="menu"
            aria-hidden={!menuAberto}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li
                style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}
                onClick={() => navigate("/registers")}
                role="menuitem"
              >
                <Settings size={16} /> Registros
              </li>
              <li
                style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center', color: '#ff6b6b' }}
                onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
                role="menuitem"
              >
                <LogOut size={16} /> Sair
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ===== FILTROS DE ANO E MÊS ===== */}
      <FilterSection
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
        onReset={resetToToday}
        displayMonth={displayMonth}
        selectedYear={selectedYear}
      />

      {/* ===== CARDS DE RESUMO ===== */}
      <CardsSection dataCards={dataCards} />

      {/* ===== GRÁFICOS ===== */}
      <section
        className={styles["charts-grid"]}
        style={{
          display: "grid",
          //gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "1.5rem",
          flex: 1,
          //minHeight: "70vh",
        }}
      >
        <ChartCard title="📈 Histórico de Receita" height={chartHeight}>
          <LineChart data={filteredMonthResume} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <XAxis dataKey="mes" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(20, 184, 166, 0.2)" }} />
            <Legend content={<CustomLegend />} payload={[{ value: "Receitas", dataKey: "receitas", color: "#14b8a6" }, { value: "Despesas", dataKey: "despesas", color: "#ef4444" }]} />
            {!hiddenKeys["receitas"] && (
              <Line
                type="monotone"
                dataKey="receitas"
                name="Receitas"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#14b8a6" }}
                activeDot={{ r: 6, fill: "#14b8a6" }}
                isAnimationActive={true}
                animationDuration={600}
              />
            )}
            {!hiddenKeys["despesas"] && (
              <Line
                type="monotone"
                dataKey="despesas"
                name="Despesas"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 4, fill: "#ef4444" }}
                activeDot={{ r: 6, fill: "#ef4444" }}
                isAnimationActive={true}
                animationDuration={600}
              />
            )}
          </LineChart>
        </ChartCard>

        <ChartCard title="🥧 Distribuição de Gastos" height={chartHeight}>
          <PieChart margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
            {(() => {
              const visible = safeCategories.filter((c) => !hiddenKeys[c.category]);
              return (
                <Pie 
                  data={visible} 
                  cx="50%" 
                  cy="45%" 
                  outerRadius={Math.max(75, chartHeight / 3.2)} 
                  dataKey="total" 
                  nameKey="category"
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {visible.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              );
            })()}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              content={<CustomLegend />}
              payload={safeCategories.map((c, i) => ({ value: c.category, dataKey: c.category, color: COLORS[i % COLORS.length] }))}
            />
          </PieChart>
        </ChartCard>

        <ChartCard title="📊 Entradas vs Saídas" height={chartHeight}>
          <BarChart data={filteredMonthResume} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="mes" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} payload={[{ value: "Receitas", dataKey: "receitas", color: "#51e2f5" }, { value: "Despesas", dataKey: "despesas", color: "#fd4d47" }]} />
            {!hiddenKeys["receitas"] && (
              <Bar 
                dataKey="receitas" 
                name="Receitas" 
                fill="#51e2f5" 
                radius={[5, 5, 0, 0]}
                isAnimationActive={true}
                animationDuration={600}
              />
            )}
            {!hiddenKeys["despesas"] && (
              <Bar 
                dataKey="despesas" 
                name="Despesas" 
                fill="#fd4d47" 
                radius={[5, 5, 0, 0]}
                isAnimationActive={true}
                animationDuration={600}
              />
            )}
          </BarChart>
        </ChartCard>

        <ChartCard title="💰 Investimentos ao Longo do Tempo" height={chartHeight}>
          <AreaChart data={safeInvestments} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="mes" stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} payload={[{ value: "Investimentos", dataKey: "valor_investido", color: "#22d3ee" }]} />
            {!hiddenKeys["valor_investido"] && (
              <Area
                type="monotone"
                dataKey="valor_investido"
                name="Investimentos"
                stroke="#22d3ee"
                fill="#14b8a6"
                fillOpacity={0.3}
                isAnimationActive={true}
                animationDuration={800}
                dot={{ r: 4, fill: "#22d3ee" }}
                activeDot={{ r: 6, fill: "#22d3ee" }}
              />
            )}
          </AreaChart>
        </ChartCard>
      </section>
    </div>
  );
}

function ChartCard({ title, height = 280, children }) {
  return (
    <div
      style={{
        background: "rgba(0, 60, 60, 0.3)",
        borderRadius: "16px",
        padding: "20px",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0, 80, 80, 0.5)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(20, 184, 166, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 60, 60, 0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "12px", fontSize: "1.1rem", fontWeight: "600" }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

// ===== COMPONENTE DE FILTROS =====
function FilterSection({ onPrevious, onNext, onReset, displayMonth, selectedYear }) {
  const handleButtonHover = (e, isEnter, isPrimary = true) => {
    const target = e.currentTarget;
    if (isEnter) {
      target.style.background = isPrimary ? BUTTON_STYLES.primaryHover : BUTTON_STYLES.dangerHover;
    } else {
      target.style.background = isPrimary ? BUTTON_STYLES.primary : BUTTON_STYLES.danger;
    }
  };

  const periodDisplay = new Date(selectedYear, displayMonth - 1)
    .toLocaleString("pt-BR", { month: "long", year: "numeric" })
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <section
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        background: "rgba(0, 60, 60, 0.2)",
        padding: "16px 20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={onPrevious}
        style={{
          background: BUTTON_STYLES.primary,
          border: "1px solid rgba(20, 184, 166, 0.5)",
          color: "#14b8a6",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => handleButtonHover(e, true, true)}
        onMouseLeave={(e) => handleButtonHover(e, false, true)}
      >
        ← Anterior
      </button>

      <div
        style={{
          color: "#fff",
          fontWeight: 600,
          fontSize: "16px",
          background: "rgba(0, 200, 200, 0.2)",
          padding: "8px 20px",
          borderRadius: "8px",
          minWidth: "180px",
          textAlign: "center",
        }}
      >
        {periodDisplay}
      </div>

      <button
        onClick={onNext}
        style={{
          background: BUTTON_STYLES.primary,
          border: "1px solid rgba(20, 184, 166, 0.5)",
          color: "#14b8a6",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => handleButtonHover(e, true, true)}
        onMouseLeave={(e) => handleButtonHover(e, false, true)}
      >
        Próximo →
      </button>

      <button
        onClick={onReset}
        style={{
          background: BUTTON_STYLES.danger,
          border: "1px solid rgba(255, 100, 100, 0.5)",
          color: "#ff6464",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => handleButtonHover(e, true, false)}
        onMouseLeave={(e) => handleButtonHover(e, false, false)}
      >
        Hoje
      </button>
    </section>
  );
}

// ===== COMPONENTE DE CARDS =====
function CardsSection({ dataCards }) {
  const cards = [
    {
      label: "Receitas",
      value: `R$ ${dataCards?.sumEntry?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}`,
      icon: <ArrowUpRight size={32} color="#10b981" />,
      color: "#10b981",
    },
    {
      label: "Despesas",
      value: `R$ ${dataCards?.sumExit?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}`,
      icon: <ArrowDownRight size={32} color="#ef4444" />,
      color: "#ef4444",
    },
    {
      label: "Saldo Atual",
      value: `R$ ${dataCards?.balanceNow?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}`,
      icon: <Clock size={32} color="#fbbf24" />,
      color: "#fbbf24",
    },
  ];

  return (
    <section
      className={styles["cards-grid"]}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={styles["card-resumo"]}
          style={{
            background: "rgba(31, 41, 55, 0.8)",
            borderRadius: "16px",
            padding: "1.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p>{card.label}</p>
            <h2 style={{ color: card.color }}>{card.value}</h2>
          </div>
          {card.icon}
        </div>
      ))}
    </section>
  );
}
