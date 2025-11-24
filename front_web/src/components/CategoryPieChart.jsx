import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";

function CategoryBarChart({ data = [], filterMonth = null, filterYear = null }) {
  const MAX_HEIGHT = 580; // mais seguro que 650

  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];

    const filtered = filterMonth && filterYear
      ? data.filter((d) => d.mes === filterMonth && d.ano === filterYear)
      : data;

    const grouped = filtered.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.total;
      return acc;
    }, {});

    return Object.keys(grouped)
      .map((category) => ({
        category,
        label: getCategoryLabel(category),
        total: grouped[category],
      }))
      .sort((a, b) => b.total - a.total);
  }, [data, filterMonth, filterYear]);

  if (formatted.length === 0) return <div style={{ padding: 20 }}>Nenhum dado</div>;

  // barras compactadas
  const spacing = 6;
  const barHeight = Math.max(
    12,
    Math.min(35, (MAX_HEIGHT - formatted.length * spacing) / formatted.length)
  );

  return (
    <div
      style={{
        width: "100%",
        height: MAX_HEIGHT,
        overflow: "hidden",
        padding: "4px 0",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={formatted}
          margin={{ top: 5, right: 10, left: 5, bottom: 5 }}
          barCategoryGap={spacing}
        >
          <XAxis type="number" hide />

          <YAxis
            type="category"
            dataKey="label"
            width={130}
            tick={{ fontSize: 11 }}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`
            }
          />

          <Bar dataKey="total" barSize={barHeight} radius={[5, 5, 5, 5]}>
            {formatted.map((entry, index) => (
              <Cell key={index} fill={getCategoryColor(entry.category)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(CategoryBarChart);
