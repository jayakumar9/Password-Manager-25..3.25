import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch('/api/passwords', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setPasswords(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching passwords:', err);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (id) => {
    setPasswords(passwords.map(pwd => 
      pwd._id === id ? { ...pwd, showPassword: !pwd.showPassword } : pwd
    ));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {passwords.map(password => (
        <div key={password._id} className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center mb-4">
            {password.logo ? (
              <img src={password.logo} alt="Website logo" className="w-8 h-8 mr-2" />
            ) : (
              <div className="w-8 h-8 bg-gray-600 rounded-full mr-2" />
            )}
            <h3 className="text-xl font-semibold text-white">{password.name}</h3>
          </div>
          
          <div className="text-gray-300">
            <p><span className="font-semibold">Username:</span> {password.username}</p>
            <p><span className="font-semibold">Email:</span> {password.email}</p>
            <p className="flex items-center">
              <span className="font-semibold">Password:</span>
              <span className="ml-2">
                {password.showPassword ? password.password : '••••••••'}
              </span>
              <button
                onClick={() => togglePasswordVisibility(password._id)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                {password.showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </p>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button className="p-2 text-blue-400 hover:text-blue-300">
              <FaEdit />
            </button>
            <button className="p-2 text-red-400 hover:text-red-300">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PasswordList; 