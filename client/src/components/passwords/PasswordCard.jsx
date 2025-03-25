import React from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordCard = ({ password, onToggleVisibility, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
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
            onClick={() => onToggleVisibility(password._id)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            {password.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </p>
      </div>
      
      <div className="flex justify-end mt-4 space-x-2">
        <button 
          onClick={() => onEdit(password)} 
          className="p-2 text-blue-400 hover:text-blue-300"
        >
          <FaEdit />
        </button>
        <button 
          onClick={() => onDelete(password._id)}
          className="p-2 text-red-400 hover:text-red-300"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default PasswordCard; 