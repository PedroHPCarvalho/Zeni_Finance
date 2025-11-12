# 📖 Guia de Uso - Dashboard Refatorado

## Índice
1. [Estrutura](#estrutura)
2. [Como Usar](#como-usar)
3. [Exemplos Práticos](#exemplos-práticos)
4. [Componentes](#componentes)
5. [Funções Utilitárias](#funções-utilitárias)
6. [Troubleshooting](#troubleshooting)

---

## Estrutura

### Arquivos Principais
```
src/
├── pages/Dashboard/
│   └── Dashboard_page.jsx              # Componente principal (refatorado)
├── components/
│   └── DashboardCharts.jsx             # Componentes de gráficos extraídos
└── styles/Dashboard/
    └── Dashboard_page.module.css
```

### Componentes Disponíveis
- `Dashboard` (padrão) - Componente principal
- `ChartCard` - Container para gráficos
- `FilterSection` - Navegação de períodos
- `CardsSection` - Cards de resumo
- `RevenueChart` - Gráfico de receitas vs despesas
- `ExpenseDistributionChart` - Pizza de gastos
- `EntriesExitsChart` - Barras de entrada/saída
- `InvestmentsChart` - Área de investimentos

---

## Como Usar

### Importar o Dashboard
```javascript
import Dashboard from "./pages/Dashboard/Dashboard_page";

// No seu router
<Route path="/dashboard" element={<Dashboard />} />
```

### Importar Gráficos Separados
```javascript
import {
  RevenueChart,
  ExpenseDistributionChart,
  EntriesExitsChart,
  InvestmentsChart,
} from "./components/DashboardCharts";

// Usar em outro componente
<RevenueChart
  data={filteredMonthResume}
  CustomTooltip={CustomTooltip}
  CustomLegend={CustomLegend}
  hiddenKeys={hiddenKeys}
  height={320}
/>
```

---

## Exemplos Práticos

### Exemplo 1: Usar FilterSection em Outro Lugar
```javascript
import React, { useState } from "react";

function MeuComponente() {
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2025);

  const handlePrevious = () => setSelectedMonth(prev => prev - 1 || 12);
  const handleNext = () => setSelectedMonth(prev => (prev === 12 ? 1 : prev + 1));
  const handleReset = () => {
    setSelectedYear(new Date().getFullYear());
    setSelectedMonth(new Date().getMonth() + 1);
  };

  return (
    <FilterSection
      onPrevious={handlePrevious}
      onNext={handleNext}
      onReset={handleReset}
      displayMonth={selectedMonth}
      selectedYear={selectedYear}
    />
  );
}
```

### Exemplo 2: Filtrar Dados com parseMonthYear
```javascript
import { parseMonthYear } from "./pages/Dashboard/Dashboard_page";

const data = [
  { mes: "15/11/2025", receitas: 5000 },
  { mes: "15/10/2025", receitas: 4500 },
  { mes: "11/2025", receitas: 3000 },
];

// Filtrar apenas novembro de 2025
const filtered = data.filter(({ mes }) => {
  const { month, year } = parseMonthYear(mes);
  return month === 11 && year === 2025;
});
// Resultado: [{ mes: "15/11/2025", receitas: 5000 }, { mes: "11/2025", receitas: 3000 }]
```

### Exemplo 3: Extrair Anos e Meses Disponíveis
```javascript
import { 
  extractAvailableYears, 
  extractAvailableMonths 
} from "./pages/Dashboard/Dashboard_page";

const monthResume = [
  { mes: "01/2024", receitas: 1000 },
  { mes: "02/2024", receitas: 1200 },
  { mes: "01/2025", receitas: 1500 },
  { mes: "02/2025", receitas: 1600 },
];

const years = extractAvailableYears(monthResume);
// Resultado: [2025, 2024]

const months2025 = extractAvailableMonths(monthResume, 2025);
// Resultado: [1, 2]
```

### Exemplo 4: Altura Responsiva de Gráficos
```javascript
import { getChartHeight } from "./pages/Dashboard/Dashboard_page";

const height1 = getChartHeight(1200); // > 768px → 320
const height2 = getChartHeight(600);  // 480-768px → 260
const height3 = getChartHeight(300);  // < 480px → 220
```

### Exemplo 5: Usar CustomTooltip em Outro Gráfico
```javascript
function MeuGrafico() {
  const currency = (value) => 
    new Intl.NumberFormat("pt-BR", { 
      style: "currency", 
      currency: "BRL" 
    }).format(value);

  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "rgba(0,0,0,0.8)", color: "#fff", padding: "10px" }}>
        <p>{label}</p>
        {payload.map((p, i) => (
          <p key={i}>{p.name}: {currency(p.value)}</p>
        ))}
      </div>
    );
  }

  return (
    <LineChart data={data}>
      <Tooltip content={<CustomTooltip />} />
      {/* ... resto do gráfico */}
    </LineChart>
  );
}
```

---

## Componentes

### ChartCard
Container com styling para gráficos.

**Props:**
- `title` (string) - Título do gráfico
- `children` (ReactNode) - Conteúdo (gráfico)
- (height não é necessário, é gerenciado internamente)

**Exemplo:**
```javascript
<ChartCard title="📈 Meu Gráfico">
  <LineChart data={data}>
    {/* ... */}
  </LineChart>
</ChartCard>
```

### FilterSection
Seção de navegação mês a mês.

**Props:**
- `onPrevious` (function) - Callback para botão anterior
- `onNext` (function) - Callback para botão próximo
- `onReset` (function) - Callback para botão hoje
- `displayMonth` (number) - Mês a exibir (1-12)
- `selectedYear` (number) - Ano selecionado

**Exemplo:**
```javascript
<FilterSection
  onPrevious={() => setMonth(m => m - 1)}
  onNext={() => setMonth(m => m + 1)}
  onReset={() => setMonth(new Date().getMonth() + 1)}
  displayMonth={selectedMonth}
  selectedYear={selectedYear}
/>
```

### CardsSection
Cards com resumo de dados.

**Props:**
- `dataCards` (object) - Dados dos cards
  - `sumEntry` (number) - Total de entradas
  - `sumExit` (number) - Total de saídas
  - `balanceNow` (number) - Saldo atual

**Exemplo:**
```javascript
<CardsSection
  dataCards={{
    sumEntry: 5000,
    sumExit: 3000,
    balanceNow: 2000,
  }}
/>
```

---

## Funções Utilitárias

### parseMonthYear(dateString)
Extrai mês e ano de strings em diferentes formatos.

**Parâmetros:**
- `dateString` (string) - Data em formato "DD/MM/YYYY" ou "MM/YYYY"

**Retorna:**
- `object` com `{ month: number, year: number }`

**Exemplos:**
```javascript
parseMonthYear("15/11/2025") // { month: 11, year: 2025 }
parseMonthYear("11/2025")    // { month: 11, year: 2025 }
parseMonthYear("01/01/2024") // { month: 1, year: 2024 }
```

### extractAvailableYears(monthResume)
Extrai todos os anos únicos e disponíveis.

**Parâmetros:**
- `monthResume` (array) - Array de objetos com campo `mes`

**Retorna:**
- `array` de números, ordenado em ordem descendente

**Exemplo:**
```javascript
const data = [
  { mes: "11/2023" },
  { mes: "11/2024" },
  { mes: "11/2025" },
];
extractAvailableYears(data) // [2025, 2024, 2023]
```

### extractAvailableMonths(monthResume, year)
Extrai meses disponíveis para um ano específico.

**Parâmetros:**
- `monthResume` (array) - Array de objetos com campo `mes`
- `year` (number) - Ano para filtrar

**Retorna:**
- `array` de números (1-12), ordenado em ordem ascendente

**Exemplo:**
```javascript
const data = [
  { mes: "01/2025" },
  { mes: "03/2025" },
  { mes: "05/2025" },
];
extractAvailableMonths(data, 2025) // [1, 3, 5]
```

### getChartHeight(width)
Calcula altura do gráfico baseado na largura da viewport.

**Parâmetros:**
- `width` (number) - Largura em pixels

**Retorna:**
- `number` - Altura em pixels (220, 260 ou 320)

**Exemplo:**
```javascript
getChartHeight(300)  // 220 (mobile)
getChartHeight(600)  // 260 (tablet)
getChartHeight(1200) // 320 (desktop)
```

---

## Componentes de Gráficos

### RevenueChart
Gráfico de linha com receitas vs despesas.

**Props:**
```javascript
<RevenueChart
  data={filteredMonthResume}        // Array com { mes, receitas, despesas }
  CustomTooltip={CustomTooltip}     // Componente de tooltip
  CustomLegend={CustomLegend}       // Componente de legenda
  hiddenKeys={hiddenKeys}           // Object com keys ocultas
  height={320}                      // Altura em px
/>
```

### ExpenseDistributionChart
Gráfico pizza com distribuição de gastos.

**Props:**
```javascript
<ExpenseDistributionChart
  data={safeCategories}             // Array com { category, total }
  CustomTooltip={CustomTooltip}
  CustomLegend={CustomLegend}
  hiddenKeys={hiddenKeys}
  height={320}
/>
```

### EntriesExitsChart
Gráfico de barras com entradas vs saídas.

**Props:**
```javascript
<EntriesExitsChart
  data={filteredMonthResume}        // Array com { mes, receitas, despesas }
  CustomTooltip={CustomTooltip}
  CustomLegend={CustomLegend}
  hiddenKeys={hiddenKeys}
  height={320}
/>
```

### InvestmentsChart
Gráfico de área com timeline de investimentos.

**Props:**
```javascript
<InvestmentsChart
  data={safeInvestments}            // Array com { mes, valor_investido }
  CustomTooltip={CustomTooltip}
  CustomLegend={CustomLegend}
  hiddenKeys={hiddenKeys}
  height={320}
/>
```

---

## Troubleshooting

### P: Os gráficos estão vazios
**R:** Verifique se `filteredMonthResume` tem dados:
```javascript
console.log('filtered:', filteredMonthResume);
console.log('display month:', displayMonth, 'year:', selectedYear);
```

### P: parseMonthYear não está funcionando
**R:** Certifique-se que o formato de data é "DD/MM/YYYY" ou "MM/YYYY":
```javascript
// ✅ Correto
parseMonthYear("15/11/2025")
parseMonthYear("11/2025")

// ❌ Errado
parseMonthYear("2025-11-15")
parseMonthYear("11-15-2025")
```

### P: Altura dos gráficos não está responsiva
**R:** Verifique se o resize listener está ativo:
```javascript
// Isso é feito automaticamente no Dashboard, mas se copiar código:
useEffect(() => {
  const handleResize = () => setChartHeight(getChartHeight(window.innerWidth));
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

### P: Legendas interativas não funcionam
**R:** Certifique-se que CustomLegend recebe `hiddenKeys`:
```javascript
// CustomLegend precisa acessar hiddenKeys do escopo pai
function CustomLegend({ payload }) {
  // hiddenKeys deve vir do escopo externo (closure)
  const hidden = hiddenKeys[key];
  // ...
}
```

### P: Cores dos gráficos estão erradas
**R:** Verifique se COLORS array está definido:
```javascript
const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#C7CEEA", "#FF8B94", "#FFA502"];
```

---

## Dicas e Boas Práticas

### 1. Usar useMemo para Dados Derivados
```javascript
const availableYears = useMemo(
  () => extractAvailableYears(safeMonthResume),
  [safeMonthResume]
);
```

### 2. Usar useCallback para Funções
```javascript
const goToPreviousMonth = useCallback(() => {
  // lógica
}, [displayMonth, selectedYear, availableYears, safeMonthResume]);
```

### 3. Verificar Dados Antes de Usar
```javascript
const safeMonthResume = useMemo(
  () => monthResume.length ? monthResume : [{ mes: "Sem dados", despesas: 0, receitas: 0 }],
  [monthResume]
);
```

### 4. Filtrar Dados Corretamente
```javascript
const filteredMonthResume = useMemo(
  () => safeMonthResume.filter(({ mes }) => {
    const { month, year } = parseMonthYear(mes);
    return month === displayMonth && year === selectedYear;
  }),
  [safeMonthResume, displayMonth, selectedYear]
);
```

---

## Recursos Adicionais

- 📖 [REFACTORING_NOTES.md](./REFACTORING_NOTES.md) - Detalhes de cada otimização
- 📊 [QUALITY_SUMMARY.md](./QUALITY_SUMMARY.md) - Métricas de qualidade
- 📋 [REFACTORING_COMPLETE.md](./REFACTORING_COMPLETE.md) - Guia completo

