import React, { useEffect, useState } from 'react';
import api from '../components/Auth/Api_config';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await api.get('/adminside/ad/users/');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.response?.data?.detail || 'Failed to fetch users');
        setLoading(false);
        
        if (error.response?.status === 401) {
          try {
            await refreshAccessToken();
            const retryResponse = await api.get('/adminside/ad/users/');
            setUsers(retryResponse.data);
            setError(null);
          } catch (refreshError) {
            setError('Session expired. Please login again.');
          }
        }
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUnblock = async (userId, action) => {
    try {
      const response = await api.post(
        '/users/admin/block_unblock_user/',
        { user_id: userId, action }
      );

      if (response.data) {
        alert(response.data.message);
        setUsers(users.map(user =>
          user.id === userId ? { ...user, is_blocked: action === "block" } : user
        ));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.detail || 'An error occurred while updating user status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Admin</th>
            <th className="border p-2">Joined</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.is_staff ? 'Yes' : 'No'}</td>
              <td className="border p-2">{new Date(user.date_joined).toLocaleDateString()}</td>
              <td className="border p-2">
                <button 
                  onClick={() => handleBlockUnblock(user.id, user.is_blocked ? "unblock" : "block")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {user.is_blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListing;