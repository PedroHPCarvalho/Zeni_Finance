import React, { useMemo, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [containerHeight, setContainerHeight] = useState(580);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setContainerHeight(mobile ? 500 : 580);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];

    const filtered = filterMonth && filterYear
      ? data.filter(d => d.mes === filterMonth && d.ano === filterYear)
      : data;

    const grouped = filtered.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.total;
      return acc;
    }, {});

    return Object.keys(grouped)
      .map(category => ({
        category,
        label: getCategoryLabel(category),
        total: grouped[category],
      }))
      .sort((a, b) => b.total - a.total);
  }, [data, filterMonth, filterYear]);

  if (!formatted.length)
    return <div style={{ padding: 20 }}>Nenhum dado disponível</div>;

  const totalSum = formatted.reduce((sum, item) => sum + item.total, 0);

  const spacing = 6;
  const minBar = 14;
  const maxBar = 45;
  const barHeight = Math.max(
    minBar,
    Math.min(maxBar, (containerHeight - formatted.length * spacing) / formatted.length)
  );

  const DynamicLabel = ({ x, y, width, height, value }) => {
    const roundedValue = Math.round(value);
    const percent = Math.round((value / totalSum) * 100);
    const label = `R$ ${roundedValue.toLocaleString("pt-BR")} • ${percent}%`;

    const INSIDE_LIMIT = isMobile ? 90 : 100;
    const isInside = width > INSIDE_LIMIT;

    return (
      <text
        x={isInside ? x + width - 6 : x + width + 4}
        y={y + height / 2}
        fill={isInside ? "#fff" : "currentColor"}
        fontSize={Math.max(isMobile ? 9 : 11, barHeight * 0.35)}
        fontWeight={600}
        textAnchor={isInside ? "end" : "start"}
        dominantBaseline="middle"
      >
        {label}
      </text>
    );
  };

  const formatCategoryName = (name) => {
    const MAX_CHARS = isMobile ? 9 : 12;
    if (name.length <= MAX_CHARS) return name;
    return name.match(new RegExp(`.{1,${MAX_CHARS}}`, "g")).join("\n");
  };

  return (
    <div
      style={{
        width: "100%",
        height: containerHeight,
        padding: "4px 0",
        color: "var(--text-main)" // cor do texto respeitando CSS
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={formatted}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          barCategoryGap={spacing}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={isMobile ? 140 : 170}
            tick={{
              fontSize: isMobile ? 10 : Math.max(7, barHeight * 0.35),
              fontWeight: 600,
              fill: "currentColor",
              whiteSpace: "pre-line",
            }}
            tickLine={false}
            tickFormatter={formatCategoryName}
          />
          <Tooltip
            formatter={(value) => {
              const rounded = Math.round(value);
              const percent = Math.round((value / totalSum) * 100);
              return `R$ ${rounded.toLocaleString("pt-BR")} • ${percent}%`;
            }}
            contentStyle={{
              backgroundColor: "var(--bg-white)",
              color: "var(--text-main)",
              borderRadius: 8,
              border: "none",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="total" barSize={barHeight} radius={[0, 0, 0, 0]}>
            {formatted.map((entry, i) => (
              <Cell key={i} fill={getCategoryColor(entry.category)} />
            ))}
            <LabelList dataKey="total" content={<DynamicLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default React.memo(CategoryBarChart);
