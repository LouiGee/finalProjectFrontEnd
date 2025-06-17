import axios from 'axios';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

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
  Cookies.set("token", data.token);
  Cookies.set("roles", data.roles);

  const userRole = getUserRole();

  if (userRole[0] == "Production Analyst") {
    window.location.href = "./productionAnalystMenu";
  }

}

function getUserRole(token){

  try {
      const decoded = jwtDecode(token);
      // Now you can access properties like decoded.userId, decoded.exp, etc.
    } catch (error) {
      console.error("Invalid token", error);
    }

  return decoded.getUserRoles

}



