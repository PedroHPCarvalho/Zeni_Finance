import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const formatYAxis = (tickItem) => {
  if (tickItem >= 1000000) return `${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(0)}k`;
  return tickItem;
};

const MONTH_MAP = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3,
  May: 4, Jun: 5, Jul: 6, Aug: 7,
  Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function ReceitaDespesasBarChartComponent({ data = [], height = 320 }) {

  const memoData = useMemo(() => {
    return (data || [])
      .map((d) => {
        const mes = typeof d.mes === "string" ? d.mes : "";
        const ano = Number(d.ano) || 0;
        const monthIndex = MONTH_MAP[mes] ?? 0;

        return {
          ...d,
          receitas: Number(d.receitas) || 0,
          despesas: Number(d.despesas) || 0,
          xLabel: `${mes}/${ano}`,
          sortValue: new Date(ano, monthIndex, 1),
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue)
      .slice(-12);
  }, [data]);

  return (
    <div style={{ width: "100%", height }}>
      <style>
        {`
          .recharts-wrapper, 
          .recharts-surface, 
          .recharts-layer {
            outline: none !important;
          }
        `}
      </style>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={memoData}
          margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="xLabel"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
          />

          <Tooltip
            cursor={false}
            formatter={(v) =>
              `R$ ${Number(v).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
            contentStyle={{
              backgroundColor: "var(--bg-light)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend wrapperStyle={{ paddingTop: "10px" }} />

          <Bar
            dataKey="receitas"
            name="Receitas"
            fill="#4CAF50"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
            activeBar={false} 
          />

          <Bar
            dataKey="despesas"
            name="Despesas"
            fill="#F44336"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
            activeBar={false} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(ReceitaDespesasBarChartComponent);