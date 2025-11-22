import React, { useMemo } from "react";
import {
  LineChart,
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

function InvestimentosLineChartComponent({ data = [], height = 320 }) {
  const memoData = useMemo(() => {
    return (data || [])
      .map((d) => {
        const mes = typeof d.mes === "string" ? d.mes : "";
        const ano = Number(d.ano) || 0;

        const monthIndex = MONTH_MAP[mes] ?? 0; // evita crash

        return {
          ...d,
          receitas: Number(d.receitas) || 0,
          despesas: Number(d.despesas) || 0,
          xLabel: `${mes}/${ano}`,
          sortValue: new Date(ano, monthIndex, 1)
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue)
      .slice(-12);
  }, [data]);

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={memoData}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />

          <XAxis
            dataKey="xLabel"
            tick={{ fontSize: 12, fill: "#666" }}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12, fill: "#666" }}
            tickLine={false}
            axisLine={false}
            width={40}
          />

          <Tooltip
            cursor={{ stroke: "#2196F3", strokeWidth: 1, strokeDasharray: "4 4" }}
            formatter={(v) =>
              `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
            }
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          />

          <Legend wrapperStyle={{ paddingTop: "10px" }} />

          <Line
            type="monotone"
            dataKey="valor_investido"
            name="Investimentos"
            stroke="#2196F3"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, stroke: "#2196F3", fill: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0, fill: "#2196F3" }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default React.memo(InvestimentosLineChartComponent);
