import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

async function login(credentials) {

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error('Login failed');

  // data = { token: 'jwt...', refreshToken: 'refresh...' }
  const data = await response.json();
  
  // Save tokens (example uses localStorage)
  localStorage.setItem('token', data.token);
  localStorage.setItem('refreshToken', data.refreshToken);
}