import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard_page from "./pages/Dashboard/Dashboard_page";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>} caseSensitive={false}/>
      <Route path="/login" element={<Login/>} caseSensitive={false}/>
    </Routes>
  )
}

export default App;

