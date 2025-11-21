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

/**
 * - useMemo para memorizar data transformada
 * - isAnimationActive={false} nas barras
 * - componente memoizado
 */

function ReceitaDespesasBarChartComponent({ data = [], height = 320 }) {
  // normalize data if needed
  const memoData = useMemo(() => {
    return (data || []).map((d) => ({
      ...d,
      receitas: typeof d.receitas === "string" ? Number(d.receitas) : d.receitas || 0,
      despesas: typeof d.despesas === "string" ? Number(d.despesas) : d.despesas || 0,
    }));
  }, [data]);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={memoData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (value >= 1000 ? `R$${value / 1000}k` : `R$${value}`)}
          />
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />

          <Bar
            dataKey="receitas"
            name="Receitas"
            fill="#4CAF50"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
          />
          <Bar
            dataKey="despesas"
            name="Despesas"
            fill="#F44336"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(ReceitaDespesasBarChartComponent);
