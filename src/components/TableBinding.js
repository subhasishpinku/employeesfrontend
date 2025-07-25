import React, { useEffect, useState } from 'react';
import axios from 'axios';
const  TableBinding= () => {
      const [users, setUsers] = useState([]);

  // Fetch data from Express API
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

     return (
    <div style={{ padding: '20px' }}>
      <h2>User List</h2>

      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableBinding;
