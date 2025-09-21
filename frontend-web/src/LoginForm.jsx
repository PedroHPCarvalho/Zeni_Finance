import React, { useState } from "react";
import { API_ENDPOINTS } from "./config/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // sempre tenta converter a resposta em JSON
      const data = await response.json();
      console.log("Response:", data);

      // se tiver token, salva
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        alert("Login realizado com sucesso!");
      } else {
        // se não tiver token, mostra mensagem de erro do back
        alert(data.error || "Falha no login!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro de conexão com o servidor!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
