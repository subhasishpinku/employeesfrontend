import { useState } from "react";
import axios from "axios";
import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        "https://employees-2vss.onrender.com/api/auth/login",
        form
      );

      console.log("Login Success:", res.data);
      login(res.data); // Save user/token in context
      navigate("/home");
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message);
      setErrors({
        server: err.response?.data?.msg || "Login failed, please try again",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-page">
        <div className="login-box">
          <h2>Login</h2>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="input-group">
            <FaLock className="icon" />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {errors.server && <p className="error">{errors.server}</p>}

          <button className="login-button">Login</button>

          <p className="register-text">
            Don’t have an account? <a href="./register">Register</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
