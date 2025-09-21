import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import LoginPage from './pages/LoginPage';
import RegisterForm from './RegisterForm';

function App() {
    return(
      <Router>
        <nav>
          <Link to="/login">Login</Link>| {" "}
          <Link to="/register">Registrar</Link>
        </nav>
        
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterForm/>}/>
        </Routes>
      </Router>
    );
};

export default App;