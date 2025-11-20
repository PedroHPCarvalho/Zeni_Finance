import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area } from "recharts";

export default function InvestimentosLineChart({ data }) {
  // data esperado: [{ mes: "Dec", valor_investido: 7000000 }, ...]
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(v) => `R$ ${v.toFixed(2)}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="valor_investido"
            name="Investimentos"
            stroke="#2196F3"
            strokeWidth={4}          // linha mais grossa
            fillOpacity={0.2}        // preenchimento
            fill="#BBDEFB"           // azul claro abaixo da linha
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
