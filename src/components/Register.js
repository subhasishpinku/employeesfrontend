import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { FaUser, FaLock } from "react-icons/fa";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(
        "https://employees-2vss.onrender.com/api/auth/register",
        form
      );
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setErrors({ server: "Something went wrong. Try again later." });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register-page">
        <div className="register-box">
          <h2>Register</h2>

          <div className="input-group">
            <FaUser className="icon" />
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

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

          <button className="register-button">Register</button>

          <p className="login-text">
            Already registered? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Register;
