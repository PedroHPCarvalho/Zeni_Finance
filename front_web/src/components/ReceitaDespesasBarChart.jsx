import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ReceitaDespesasBarChart({ data, height = 320 }) {
  return (
    <div style={{ width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$${value/1000}k`}
          />
          
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            formatter={(v) => `R$ ${v.toFixed(2)}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          
          <Bar 
            dataKey="receitas" 
            name="Receitas" 
            fill="#4CAF50" 
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
          <Bar 
            dataKey="despesas" 
            name="Despesas" 
            fill="#F44336" 
            radius={[4, 4, 0, 0]} 
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}