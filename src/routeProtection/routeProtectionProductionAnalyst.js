
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  
  const authenticationToken = Cookies.get("authenticationToken");

  let permission = "";

  let isAuthenticationTokenValid = false;

  if(authenticationToken) {

    const authenticationTokenExpDate = jwtDecode(authenticationToken).exp; // JWT expiration (in seconds)

    const now = Math.floor(Date.now() / 1000); // current time in seconds

    isAuthenticationTokenValid = authenticationTokenExpDate > now;

    permission = jwtDecode(authenticationToken).permission;

  }

  if (!isAuthenticationTokenValid || permission !== "Production Analyst") {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;