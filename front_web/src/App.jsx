import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard_page";
import FinancialRegisters from "./pages/FinancialRegisters/FinancialRegisters_page";

function App() {
  return (
    <Routes>
      {/* Rotas públicas (sem layout) */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* ROTAS INTERNAS — com layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registers" element={<FinancialRegisters />} />
      </Route>
    </Routes>
  );
}

export default App;
