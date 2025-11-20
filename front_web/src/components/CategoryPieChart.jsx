import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";
import { useState, useEffect } from "react";

export default function CategoryPieChart({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxCategories = isMobile ? 5 : 15;
  const sorted = [...data].sort((a, b) => b.total - a.total);
  const topCategories = sorted.slice(0, maxCategories);
  const otherCategories = sorted.slice(maxCategories);

  const formatted = [
    ...topCategories.map(item => ({
      ...item,
      label: getCategoryLabel(item.category)
    })),
    otherCategories.length > 0
      ? {
          category: "other",
          total: otherCategories.reduce((sum, i) => sum + i.total, 0),
          label: "Outros"
        }
      : null
  ].filter(Boolean);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={formatted}
          dataKey="total"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={isMobile ? 80 : 120}
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          labelLine={{ stroke: '#ccc', strokeWidth: 1 }}
        >
          {formatted.map((item, index) => (
            <Cell key={`cell-${index}`} fill={getCategoryColor(item.category)} stroke="none" />
          ))}
        </Pie>
        <Tooltip 
          formatter={(v) => `R$ ${v.toFixed(2)}`}
          contentStyle={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            border: 'none', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
          }}
          itemStyle={{ color: '#333' }}
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

