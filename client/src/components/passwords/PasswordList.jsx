import React, { useState, useEffect } from 'react';
import PasswordCard from './PasswordCard';
import { getAllPasswords, deletePassword } from '../../services/password.service';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const data = await getAllPasswords();
      setPasswords(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching passwords:', err);
      setLoading(false);
    }
  };

  const handleToggleVisibility = (id) => {
    setPasswords(passwords.map(pwd => 
      pwd._id === id ? { ...pwd, showPassword: !pwd.showPassword } : pwd
    ));
  };

  const handleEdit = (password) => {
    // Navigate to edit page or open edit modal
  };

  const handleDelete = async (id) => {
    try {
      await deletePassword(id);
      setPasswords(passwords.filter(pwd => pwd._id !== id));
    } catch (err) {
      console.error('Error deleting password:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {passwords.map(password => (
        <PasswordCard
          key={password._id}
          password={password}
          onToggleVisibility={handleToggleVisibility}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PasswordList; 