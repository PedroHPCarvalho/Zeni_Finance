import React, { useState } from "react";
import styles from "../../styles/Dashboard/Dashboard_page.module.css";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from "recharts";
import { Trash2, TrendingUp, Wallet, Cog } from "lucide-react";

export default function Dashboard() {
  const [lancamentos, setLancamentos] = useState([
    { id: 1, titulo: "Salários", descricao: "Salários funcionários", data: "27/07/2023", valor: 2800, categoria: "Receita" },
    { id: 2, titulo: "Subsídios", descricao: "Subsídio agrícola", data: "24/07/2023", valor: 4200, categoria: "Receita" },
    { id: 3, titulo: "Manutenção", descricao: "Reparo do trator", data: "19/07/2023", valor: -750, categoria: "Manutenção" },
    { id: 4, titulo: "Vendas", descricao: "Venda de bananas", data: "14/07/2023", valor: 1500, categoria: "Receita" },
  ]);

  // Remover lançamento
  const removerLancamento = (id) => {
    setLancamentos(lancamentos.filter((l) => l.id !== id));
  };

  // Totais
  const totalRecebido = lancamentos
    .filter((l) => l.valor > 0)
    .reduce((acc, l) => acc + l.valor, 0);

  const gastoTotal = lancamentos
    .filter((l) => l.valor < 0)
    .reduce((acc, l) => acc + Math.abs(l.valor), 0);

  const orcamentoLivre = totalRecebido - gastoTotal;

  // Gráfico de Categorias (agrupado por tipo)
  const categorias = ["Alimentação", "Transporte", "Entretenimento", "Moradia", "Outros", "Manutenção", "Receita"];
  const cores = ["#00d2d3", "#01a3a4", "#00b894", "#0984e3", "#6c5ce7", "#e17055", "#55efc4"];

  const dataCategorias = categorias.map((cat) => ({
    name: cat,
    value: lancamentos
      .filter((l) => l.categoria === cat)
      .reduce((acc, l) => acc + Math.abs(l.valor), 0),
  })).filter((d) => d.value > 0);

  // Receita vs Gastos (mock de últimos meses)
  const dataMensal = [
    { mes: "Jan", receita: 5000, gasto: 3800 },
    { mes: "Fev", receita: 4800, gasto: 3500 },
    { mes: "Mar", receita: 5300, gasto: 3700 },
    { mes: "Abr", receita: 5100, gasto: 3600 },
    { mes: "Mai", receita: 5200, gasto: 3700 },
    { mes: "Jun", receita: 4900, gasto: 3400 },
  ];

  // Evolução do saldo (mock)
  const dataSaldo = [
    { dia: 1, saldo: 16000 },
    { dia: 5, saldo: 15500 },
    { dia: 10, saldo: 15000 },
    { dia: 15, saldo: 13900 },
    { dia: 20, saldo: 13500 },
    { dia: 25, saldo: 13000 },
    { dia: 30, saldo: 12500 },
  ];

  return (
    <div
      className={`${styles.dashboard_root} p-6 space-y-6 min-h-screen text-white`}
      style={{ background: "linear-gradient(135deg, #0f2027, #2c5364, #203a43)" }}
    >
      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900/70 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-300">Gasto Total</p>
            <p className="text-2xl font-bold text-red-400">R$ {gastoTotal.toLocaleString()}</p>
            <p className="text-sm text-red-500">+12% vs mês anterior</p>
          </div>
          <TrendingUp className="w-8 h-8 text-red-400" />
        </div>

        <div className="bg-gray-900/70 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-300">Total Recebido</p>
            <p className="text-2xl font-bold text-green-400">R$ {totalRecebido.toLocaleString()}</p>
            <p className="text-sm text-green-500">+8% vs mês anterior</p>
          </div>
          <Wallet className="w-8 h-8 text-green-400" />
        </div>

        <div className="bg-gray-900/70 p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-300">Orçamento Livre</p>
            <p className="text-2xl font-bold text-yellow-400">R$ {orcamentoLivre.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Disponível para investir</p>
          </div>
          <Cog className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      {/* Gráficos e lançamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gastos por categoria */}
        <div className="bg-gray-900/70 p-4 rounded-xl shadow">
          <p className="mb-2 font-semibold">Gastos por Categoria</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataCategorias}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dataCategorias.map((_, index) => (
                  <Cell key={index} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Receita vs Gastos */}
        <div className="bg-gray-900/70 p-4 rounded-xl shadow">
          <p className="mb-2 font-semibold">Receitas vs Gastos</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataMensal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="receita" fill="#06b6d4" />
              <Bar dataKey="gasto" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolução do saldo + Últimos lançamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Evolução */}
        <div className="bg-gray-900/70 p-4 rounded-xl shadow">
          <p className="mb-2 font-semibold">Evolução do Saldo</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataSaldo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip formatter={(v) => `R$ ${v}`} />
              <Line type="monotone" dataKey="saldo" stroke="#06b6d4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Últimos lançamentos */}
        <div className="bg-gray-900/70 p-4 rounded-xl shadow">
          <p className="mb-2 font-semibold">Últimos Lançamentos</p>
          {lancamentos.length === 0 ? (
            <p className={styles.no_launch_text}>Nenhum lançamento registrado.</p>
          ) : (
            <ul className="space-y-3">
              {lancamentos.map((l) => (
                <li key={l.id} className={`flex justify-between items-center pb-2 ${styles.launch_item}`}>
                  <div>
                    <p className="font-semibold">{l.titulo}</p>
                    <p className="text-sm text-gray-400">{l.descricao} • {l.data}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold ${l.valor >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {l.valor >= 0 ? `+${l.valor}` : l.valor}
                    </span>
                    <button onClick={() => removerLancamento(l.id)} className={styles.remove_btn}>
                      <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}