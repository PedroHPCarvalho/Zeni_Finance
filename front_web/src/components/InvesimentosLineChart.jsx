import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function InvestmentChart({ data }) {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center", padding: "12px" }}>Sem dados de investimentos.</p>;
  }

  const chartData = data.map((i) => ({
    name: `${i.mes}/${i.ano}`,
    Aportes: i.aportes,
    Retiradas: i.retiradas,
    Carteira: i.carteira,
  }));

  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="Aportes" fill="#3b82f6" name="Aportes" />
          <Bar dataKey="Retiradas" fill="#fbbf24" name="Retiradas" />

          <Line
            type="monotone"
            dataKey="Carteira"
            stroke="#a855f7"
            strokeWidth={3}
            name="Carteira"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
