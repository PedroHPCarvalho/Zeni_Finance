import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ReceitaDespesasBarChart({ data }) {
  // data esperado: [{ mes: "Nov", despesas: 2620, receitas: 11520 }, ...]
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(v) => `R$ ${v.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="receitas" name="Receitas" fill="#4CAF50" />
          <Bar dataKey="despesas" name="Despesas" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
