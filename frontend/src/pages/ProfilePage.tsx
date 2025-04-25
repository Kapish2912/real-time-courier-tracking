// src/pages/ProfilePage.tsx
import React, { useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Customer',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = URL.createObjectURL(e.target.files[0]);
      setUserData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
        
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info Form */}
        <form className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="name" className="text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="email" className="text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="role" className="text-gray-700">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          {/* Profile Picture Update */}
          <div className="flex justify-between items-center">
            <label htmlFor="profilePicture" className="text-gray-700">Profile Picture:</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
