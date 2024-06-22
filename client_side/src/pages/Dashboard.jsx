import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import corrected to 'jwt-decode'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ImageUpload from '../components/ImageUploadOrigin';
import useAxios from '../utils/useAxios';

const Dashboard = () => {
  const [response, setResponse] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const api = useAxios();
  const token = localStorage.getItem('authTokens');
  const { logoutUser } = useContext(AuthContext);

  // Axios instance for user API
  const userApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    // You can add headers or other configurations here if needed
  });

  // Function to fetch user image base64
  const getUserImage = async () => {
    try {
      const response = await userApi.get(`/get-profile-image/${user_id}/`);
      const { image_base64 } = response.data;
      setImageBase64(image_base64);
      console.log('image_base64',image_base64);
    } catch (error) {
      console.error('Error fetching user image base 64 code:', error);
    }
  };

  // Decode token function
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Decode token on component load
  const decodedToken = decodeToken(token);
  const { user_id, username, email, full_name, bio } = decodedToken || {};

  // Fetch data from API on component mount or when token changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/test/');
        setResponse(response.data.response);
      } catch (error) {
        console.error('API Error:', error);
        setResponse('Something went wrong');
      }
    };

    if (token) {
      fetchData();
    }
  }, [api, token]);

  // Fetch user image on component mount
  useEffect(() => {
    if (user_id) {
      getUserImage();
    }
  }, [user_id]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {username && (
        <>
          <p>Welcome, {username}</p>
          <div>
            <span>Your Credentials are as follows:</span>
            <br />
            <span>Username: {username}</span>
            <br />
            <span>User ID: {user_id}</span>
            <br />
            <span>Full Name: {full_name}</span>
            <br />
            <span>Email: {email}</span>
            <br />
          </div>
          <br />
          {imageBase64 && (
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="User Profile"
              style={{ width: '125px', height: '125px', borderRadius: '10%', objectFit: 'cover' }}
            />
          )}
          <div>
            <span>API Response: {response}</span>
          </div>
          <br />
          <ImageUpload user_id={user_id} setImageBase64={setImageBase64} imageBase64={imageBase64} />
          <br />
          <Link to="/">Home</Link>
          <br />
          <button onClick={logoutUser}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
