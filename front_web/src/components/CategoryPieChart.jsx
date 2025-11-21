import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";

/**
 * CategoryPieChart otimizado:
 * - useMemo para formatar dados
 * - debounce no resize
 * - isAnimationActive={false}
 * - React.memo aplicado na exportação (no final)
 */

function CategoryPieChartComponent({ data = [] }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100); // debounce 100ms
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // memorize sorting / grouping
  const formatted = useMemo(() => {
    const maxCategories = isMobile ? 5 : 15;
    const sorted = [...data].sort((a, b) => b.total - a.total);
    const top = sorted.slice(0, maxCategories);
    const others = sorted.slice(maxCategories);
    const otherSum = others.reduce((s, i) => s + (i.total || 0), 0);

    const list = [
      ...top.map((item) => ({
        ...item,
        label: getCategoryLabel(item.category),
      })),
    ];

    if (otherSum > 0) {
      list.push({ category: "other", total: otherSum, label: "Outros" });
    }

    return list;
  }, [data, isMobile]);

  const outerRadius = isMobile ? 70 : 110;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={formatted}
          dataKey="total"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          labelLine={{ stroke: "#ccc", strokeWidth: 1 }}
          isAnimationActive={false}
        >
          {formatted.map((item, index) => (
            <Cell key={`cell-${index}`} fill={getCategoryColor(item.category)} stroke="none" />
          ))}
        </Pie>

        <Tooltip
          formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          itemStyle={{ color: "#333" }}
        />

        <Legend
          verticalAlign={isMobile ? "bottom" : "bottom"}
          layout={isMobile ? "horizontal" : "vertical"}
          align={isMobile ? "center" : "right"}
          height={isMobile ? 60 : 200}
          iconType="circle"
          wrapperStyle={{ fontSize: isMobile ? "12px" : "14px", paddingTop: "10px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default React.memo(CategoryPieChartComponent);
