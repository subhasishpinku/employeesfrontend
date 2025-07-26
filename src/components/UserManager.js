import React, { useEffect, useState } from "react";
import axios from "axios";
const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const fetchUsers = async () => {
    const res = await axios.get(
      "https://employees-2vss.onrender.com/api/users"
    );
    setUsers(res.data);
    // <Dashboard/>
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", form);
      // Submit logic here
      await axios.post("https://employees-2vss.onrender.com/api/users", form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
      alert("User added successfully!");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://employees-2vss.onrender.com/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Manager</h2>
          <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4 text-center">

          <div className="form-group mb-2">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className="text-danger small">{errors.name}</div>}
          </div>

          <div className="form-group mb-2">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <div className="text-danger small">{errors.email}</div>}
          </div>

          <div className="form-group mb-3">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>

          <button className="btn btn-sm btn-success w-50" type="submit">
            Add User
          </button>

        </div>
      </div>
    </form>
      {/* <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul> */}
<table className="table table-striped table-bordered mt-4">
  <thead className="thead-dark">
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {users.length > 0 ? (
      users.map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center text-muted">
          No users found.
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
};

export default UserManager;
