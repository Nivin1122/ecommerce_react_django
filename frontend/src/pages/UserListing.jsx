import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserListing = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://localhost:8000/adminside/ad/users/',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setUsers(response.data)
                setLoading(false)
            } catch(error){
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_staff ? 'Yes' : 'No'}</td>
              <td>{new Date(user.date_joined).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserListing