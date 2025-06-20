import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


const API_BASE_URL = 'http://localhost:8080/api/auth';

export class authenticationService {

  async loginRequest(credentials) {

    // login API requet
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();

    // Save jwt token as cookie to be included in every http request to backend
    Cookies.set("token", data.token);

    // Decode information from jwt token
    const authorities = jwtDecode(data.token).authorities[0];
    const email = jwtDecode(data.token).email;

    //set in local storage
    localStorage.setItem("authorities", authorities)
    localStorage.setItem("email", email)

    if (authorities === "Production Analyst") {
      window.location.href = "./productionAnalystMenu";
    }
 
  }

}

export default authenticationService;



