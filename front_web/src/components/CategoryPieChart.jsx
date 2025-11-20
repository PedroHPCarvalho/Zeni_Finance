import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getCategoryColor, getCategoryLabel } from "../utils/categories";

export default function CategoryPieChart({ data }) {

  const formatted = data.map(item => ({
    ...item,
    label: getCategoryLabel(item.category)
  }));

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatted}
            dataKey="total"
            nameKey="label"
            outerRadius={100}
            label
          >
            {formatted.map((item, index) => (
              <Cell key={index} fill={getCategoryColor(item.category)} />
            ))}
          </Pie>

          <Tooltip formatter={(v) => `R$ ${v.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
