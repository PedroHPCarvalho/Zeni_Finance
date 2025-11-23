import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";

function CategoryBarChart({ data = [], filterMonth = null, filterYear = null }) {
  const CARD_HEIGHT = 400; // altura fixa do card
  const CARD_WIDTH = "100%"; // largura do card

  // Filtra e agrega categorias
  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];
    const filteredData = data.filter((item) => {
      if (filterMonth && filterYear) return item.mes === filterMonth && item.ano === filterYear;
      return true;
    });

    const grouped = filteredData.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = 0;
      acc[key] += item.total;
      return acc;
    }, {});

    const arr = Object.keys(grouped).map((category) => ({
      category,
      total: grouped[category],
      label: getCategoryLabel(category),
    }));

    return arr.sort((a, b) => b.total - a.total);
  }, [data, filterMonth, filterYear]);

  if (!formatted || formatted.length === 0)
    return <div style={{ padding: 20 }}>Nenhum dado disponível</div>;

  const totalSum = formatted.reduce((sum, item) => sum + item.total, 0);
  const numCategories = formatted.length;

  // Altura das barras adaptativa
  const maxBarHeight = 50;
  const minBarHeight = 20;
  const spacing = 6;
  const barHeight = Math.max(
    minBarHeight,
    Math.min(maxBarHeight, (CARD_HEIGHT - 40 - numCategories * spacing) / numCategories)
  );

  // Fonte adaptativa
  const fontSize = Math.max(10, Math.min(14, barHeight / 2));

  return (
    <div style={{ width: CARD_WIDTH, height: CARD_HEIGHT, overflowY: "hidden" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={formatted}
          margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
          barCategoryGap={spacing}
          maxBarSize={barHeight}
        >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="label" width={180} tick={{ fontSize }} />
          <Tooltip
            formatter={(value) =>
              `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
            }
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="total" barSize={barHeight} radius={[4, 4, 4, 4]}>
            {formatted.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
            ))}
            <LabelList
              dataKey="total"
              position="insideRight"
              formatter={(value, entry) => {
                const percent = ((value / totalSum) * 100).toFixed(0);
                return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${percent}%)`;
              }}
              content={(props) => {
                const { x, y, width, height, index } = props;
                const percent = ((formatted[index].total / totalSum) * 100).toFixed(0);
                const labelText = `R$ ${formatted[index].total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${percent}%)`;

                if (width < 70) {
                  // barra pequena -> label fora
                  return (
                    <text
                      x={x + width + 6}
                      y={y + height / 2}
                      fill="#000"
                      fontSize={fontSize}
                      dominantBaseline="middle"
                    >
                      {labelText}
                    </text>
                  );
                }

                // barra grande -> label dentro
                return (
                  <text
                    x={x + width - 6}
                    y={y + height / 2}
                    fill="#fff"
                    fontSize={fontSize}
                    textAnchor="end"
                    dominantBaseline="middle"
                  >
                    {labelText}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(CategoryBarChart);
