import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import NavBar from "./root/NavBar.tsx";
import Footer from "./root/Footer.tsx";
import "../styles/LoginForm.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    const jwtToken = await fetch(
      "https://blog-api-production-2436.up.railway.app/users/login",
      options
    );
    const jwt = await jwtToken.json();
    if (jwt) login(jwt.token, jwt.role);
    if (jwt.role === "USER") {
      navigate("/blog");
    }
    if (jwt.role === "ADMIN") {
      navigate("/admin");
    }
  };

  return (
    <>
      <NavBar />(
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />)
    </>
  );
}
