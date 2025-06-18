import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const API_BASE_URL = 'http://localhost:8080/api/auth';


export class authenticationService {

  async loginRequest(credentials) {

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();

    // Save as cookies 
    Cookies.set("token", data.token);

    const authorities = jwtDecode(data.token).authorities[0];
    const email = jwtDecode(data.token).email;

    localStorage.setItem("authorities", authorities)
    localStorage.setItem("email", email)

    if (authorities === "Production Analyst") {
      window.location.href = "http://localhost:3000/productionAnalystMenu";
    }

 
  }

  getUserRole(token){

    try {
        const decoded = jwtDecode(token);
        return decoded.authorities[0]
      } catch (error) {
        console.error("Invalid token", error)
        return null;
      }

  }

}

export default authenticationService;



