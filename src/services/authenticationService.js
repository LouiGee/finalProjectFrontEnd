import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/api/auth';

export class authenticationService {

  async loginRequest(credentials) {

    // login API requet


    try { 
      const response = await axios.post(`${API_BASE_URL}/login`, JSON.stringify(credentials) , {
        headers: {
        'Content-Type': 'application/json'
        }       
        })

         const data = await response.data;

          console.log(data)

          // Save jwt token as cookie to be included in every http request to backend
          Cookies.set("authenticationToken", data.authenticationToken, {
                path: '/'
              });

          Cookies.set("refreshToken", data.refreshToken, {
                path: '/'
                       
              });

          //Cookies.set("refreshToken", data.refreshToken, { path: '/' }, SameSite=None);

          

          // Decode information from jwt token
          const permission = jwtDecode(data.authenticationToken).permission;
          const email = jwtDecode(data.authenticationToken).sub;

          //set in local storage
          localStorage.setItem("permission", permission)
          localStorage.setItem("email", email)

          if (permission === "Department Analyst") {
            window.location.href = "./departmentAnalystMenu";
          }

          if (permission === "Department Manager") {
            window.location.href = "./departmentManagerMenu";
          }

          if (permission === "Finance Manager") {
            window.location.href = "./FinanceManagerMenu";
          }

      }
    catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error('Login failed');
    }
  }

  async logoutRequest() {

    // login API requet

    try { 
      const response = await axios.post(`${API_BASE_URL}/logout`, {}, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
        'Content-Type': 'application/json'
        }       
        })

        // Clear localStorage
        localStorage.clear();

        // Redirect to the login page
        window.location.href = "./Login"

        // Get message from the message from the backend
        const data = await response.data;

        return data;

      }
    catch (error) {
      // Handle 4xx/5xx errors here
      console.error('Logout failed:', error.response?.data || error.message);
      throw new Error('Logout failed');
    }
  }

}

export default authenticationService;



