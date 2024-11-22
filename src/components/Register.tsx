import { FormEvent, useState } from "react";
import NavBar from "./root/NavBar.tsx";
import Footer from "./root/Footer.tsx";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [formError, setFormError] = useState<{ message: string }>({
    message: "",
  });
  const navigate = useNavigate();
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword)
      setFormError({ message: "passwords did not match" });
    //TODO: api call to register here.
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    try {
      const response = await fetch(
        "https://blog-api-production-2436.up.railway.app/users/register",
        options
      );
      const data = await response.json();
      if (data.success === false) {
        return setFormError({ message: data.msg });
      }
      if (data.jwt) {
        navigate("/login");
      }
    } catch (err) {
      setFormError({ message: (err as Error).message });
    }
  };
  return (
    <>
      <NavBar />
      <div className="error">{formError.message}</div>
      <div className="form-container">
        <h2 className="form-title">Register new User</h2>
        <form onSubmit={(e) => handleRegister(e)}>
          <label htmlFor="email">E-Mail-Address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password-repeat">Password</label>
          <input
            type="password"
            id="password-repeat"
            name="password-repeat"
            autoComplete="new-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <span className="nav-link">
        Already registered, <NavLink to="/login">goto Login</NavLink>
      </span>
      <Footer />
    </>
  );
}
