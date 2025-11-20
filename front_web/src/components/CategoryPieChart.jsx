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
            cx="50%"
            cy="50%"
            //innerRadius={60}
            outerRadius={80}
            //paddingAngle={5}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={{ stroke: '#ccc', strokeWidth: 1 }}
          >
            {formatted.map((item, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getCategoryColor(item.category)} 
                stroke="none"
              />
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
            verticalAlign="bottom" 
            height={80}
            iconType="circle"
            wrapperStyle={{ fontSize: "16px", paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
