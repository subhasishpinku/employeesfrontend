import React, { useEffect, useState } from 'react';
import axios from 'axios';
const  Login= () => {
      const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const fetchUsers = async () => {
    const res = await axios.get('https://employees-2vss.onrender.com/api/users');
    setUsers(res.data);
    // <Dashboard/>
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://employees-2vss.onrender.com/api/users', form);
    setForm({ name: '', email: '', password: '' });
    fetchUsers();
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
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email}) 
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;