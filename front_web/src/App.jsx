// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard_page"; // nome corrigido
import FinancialRegisters from "./pages/FinancialRegisters/FinancialRegisters_page";
import Privacy from "./pages/Privacy/Privacy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/dashboard" element={ <Dashboard /> } />
      <Route path="/registers"  element={ <FinancialRegisters /> }  />
    </Routes>
  );
}

export default App;
