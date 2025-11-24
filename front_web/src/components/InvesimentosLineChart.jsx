import React, { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
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

export default function InvestmentChart({ data = [], height = 320 }) {
  const memoData = useMemo(() => {
    return (data || [])
      .map((d) => {
        const mes = typeof d.mes === "string" ? d.mes : "";
        const ano = Number(d.ano) || 0;
        const monthIndex = MONTH_MAP[mes] ?? 0;

        return {
          ...d,
          aportes: Number(d.aportes) || 0,
          retiradas: Number(d.retiradas) || 0,
          carteira: Number(d.carteira) || 0,
          xLabel: `${mes}/${ano}`,
          sortValue: new Date(ano, monthIndex, 1),
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue)
      .slice(-12);
  }, [data]);

  if (!memoData.length) {
    return <p style={{ textAlign: "center", padding: "12px" }}>Sem dados de investimentos.</p>;
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
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
            cursor={{ fill: "transparent" }}
            formatter={(v) =>
              `R$ ${Number(v).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend wrapperStyle={{ paddingTop: "10px" }} />

          <Bar
            dataKey="aportes"
            name="Aportes"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
          />

          <Bar
            dataKey="retiradas"
            name="Retiradas"
            fill="#fbbf24"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="carteira"
            stroke="#a855f7"
            strokeWidth={3}
            name="Carteira"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
