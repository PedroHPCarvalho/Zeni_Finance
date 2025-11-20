import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const formatYAxis = (tickItem) => {
  if (tickItem >= 1000000) return `${(tickItem / 1000000).toFixed(1)}M`;
  if (tickItem >= 1000) return `${(tickItem / 1000).toFixed(0)}k`;
  return tickItem;
};

export default function InvestimentosLineChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: 12, fill: '#666' }} 
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fontSize: 12, fill: '#666' }} 
            tickLine={false}
            axisLine={false}
            width={40}
          />
          
          <Tooltip 
            cursor={{ stroke: '#2196F3', strokeWidth: 1, strokeDasharray: '4 4' }}
            formatter={(v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }}
          />
          
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          
          <Line
            type="monotone"
            dataKey="valor_investido"
            name="Investimentos"
            stroke="#2196F3"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, stroke: '#2196F3', fill: '#fff' }} 
            activeDot={{ r: 7, strokeWidth: 0, fill: '#2196F3' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}