import React, { useState } from "react";
import { API_ENDPOINTS } from "../../config/api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password_confirmed: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_ENDPOINTS.register, { // Django BFF
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Response:", data);
      alert(JSON.stringify(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div>
        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div>
        <label>Password_confirmed:</label>
        <input name="password_confirmed" type="password" value={formData.password_confirmed} onChange={handleChange} required />
      </div>

      <div>
        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <label>Phone:</label>
        <input name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;