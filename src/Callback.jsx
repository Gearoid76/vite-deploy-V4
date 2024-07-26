// Callback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from './authentication';

const Callback = ({ clientId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        try {
          const token = await getAccessToken(clientId, code);
          console.log('Fetched Access Token:', token);
          // Store the token in local storage or context/state
          localStorage.setItem('spotifyAccessToken', token);
          navigate('/');
        } catch (error) {
          console.error('Error fetching access token:', error.message);
        }
      } else {
        console.error('No code found in callback URL');
      }
    };

    fetchToken();
  }, [clientId, navigate]);

  return <div>Loading...</div>;
};

export default Callback;

