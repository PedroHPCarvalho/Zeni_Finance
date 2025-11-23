import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";

/**
 * CategoryPieChartComponent
 * - Soma todas as categorias quando não há filtro
 * - Filtra por mês/ano quando fornecido
 * - Limita categorias principais e adiciona "Outros"
 * - Responsivo e otimizado com useMemo
 */

function CategoryPieChartComponent({ data = [], filterMonth = null, filterYear = null }) {
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

  const formatted = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filtrar por mês/ano se houver filtro
    const filteredData = data.filter(item => {
      if (filterMonth && filterYear) {
        return item.mes === filterMonth && item.ano === filterYear;
      }
      return true; // sem filtro, inclui todos
    });

    // Agrupar por categoria
    const grouped = filteredData.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = 0;
      acc[key] += item.total;
      return acc;
    }, {});

    // Transformar em array
    const arr = Object.keys(grouped).map(category => ({
      category,
      total: grouped[category],
      label: getCategoryLabel(category),
    }));

    // Ordenar e limitar categorias + "Outros"
    const maxCategories = isMobile ? 5 : 15;
    const sorted = arr.sort((a, b) => b.total - a.total);
    const top = sorted.slice(0, maxCategories);
    const others = sorted.slice(maxCategories);
    const otherSum = others.reduce((s, i) => s + (i.total || 0), 0);

    if (otherSum > 0) {
      top.push({ category: "other", total: otherSum, label: "Outros" });
    }

    return top;
  }, [data, isMobile, filterMonth, filterYear]);

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
          formatter={(v) =>
            `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
          }
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
