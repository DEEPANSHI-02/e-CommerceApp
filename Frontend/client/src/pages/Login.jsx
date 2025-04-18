import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential,  
      });

      // Save token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => alert('Google login failed')}
      />
    </div>
  );
};

export default Login;
