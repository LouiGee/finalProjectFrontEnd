
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {

  if(Cookies.get("authenticationToken")) {
  
  const authenticationToken = Cookies.get("authenticationToken");

  let permission = "";

  let isAuthenticationTokenValid = false;

  if(authenticationToken) {

    const authenticationTokenExpDate = jwtDecode(authenticationToken).exp; // JWT expiration (in seconds)

    const now = Math.floor(Date.now() / 1000); // current time in seconds

    isAuthenticationTokenValid = authenticationTokenExpDate > now;

    permission = jwtDecode(authenticationToken).permission;

  }

  if (!isAuthenticationTokenValid || permission !== "Department Manager") {
    return <Navigate to="/Login" replace />;
  }

  return children;

  }

  /*
  if (localStorage.getItem('authenticationToken')) {

    const authenticationToken = localStorage.getItem('authenticationToken');

  let permission = "";

  let isAuthenticationTokenValid = false;

  if(authenticationToken) {

    const authenticationTokenExpDate = jwtDecode(authenticationToken).exp; // JWT expiration (in seconds)

    const now = Math.floor(Date.now() / 1000); // current time in seconds

    isAuthenticationTokenValid = authenticationTokenExpDate > now;

    permission = jwtDecode(authenticationToken).permission;

  }

  if (!isAuthenticationTokenValid || permission !== "Department Manager") {
    return <Navigate to="/Login" replace />;
  }

  return children;
  
  }
*/
  
};

export default ProtectedRoute;