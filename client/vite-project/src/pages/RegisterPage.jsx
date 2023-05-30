import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { Navigate , useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Connect to Backend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      toast.success("Registration successful");
      navigate("/login");
    } else {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message;
      toast.error(`Registration failed: ${errorMessage}`);
    }
  }

  return (
    <div className="format-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast-container"
      />

      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
