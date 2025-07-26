import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://employees-2vss.onrender.com/api/employees";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [editingId, setEditingId] = useState(null);
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

    if (!form.position.trim()) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API, form);
      }
      setForm({ name: "", email: "", position: "" });
      fetchEmployees();
    }
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Manager</h2>

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
              {errors.name && (
                <div className="text-danger small">{errors.name}</div>
              )}
            </div>
            <div className="form-group mb-2">
              <input
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <div className="text-danger small">{errors.email}</div>
              )}
            </div>

            <div className="form-group mb-2">
              <input
                className="form-control"
                placeholder="Position"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
              {errors.position && (
                <div className="text-danger small">{errors.position}</div>
              )}
            </div>
            <button className="btn btn-sm btn-success w-50" type="submit">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} | {emp.email} | {emp.position}
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
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
    {employees.length > 0 ? (
      employees.map((employee, index) => (
        <tr key={employee._id}>
          <td>{index + 1}</td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>
            <button  className="btn btn-sm btn-success" onClick={() => handleEdit(employee)}>Edit</button>
          
           <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(employee._id)}
            >
              Delete
            </button>
          </td>
          
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" className="text-center text-muted">
          No Employee found.
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
};

export default EmployeeManager;
