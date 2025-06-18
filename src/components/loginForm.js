import './loginForm.css';
import logo from '../resources/RatifyxCook.png';
import authenticationService from '../services/authenticationService.js'
import { useState } from 'react';
function LoginForm() {

  // Track input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function login(event) {

        event.preventDefault();

        const service = new authenticationService();

        const credentials = {
          email: email,
          password: password
        }
        
        try {

          await service.loginRequest(credentials);

           // console.log(response);
          
        } catch (error) {
          console.error('Failed to login:', error);
        }

        ;

      }
  
  return (

    <div>

      <div className="triangle-background">
        <div className="triangle1"></div>
      </div>

      <div className="triangle2"></div>
      
      <div className="logo">
        <img src={logo} alt="Logo" width="500" />
      </div>

      
      <div className="loginContainer">

        <form className= "loginForm" onSubmit={login}>

          <div className="inputFieldsContainer">
            <input type="text" autoComplete='username'id="email" name="email" placeholder="Enter email" className ="input-field" required value={email} onChange={(e) => setEmail(e.target.value)} /> <br/>
            <input type="password" autoComplete='current-password' id="password" name="password" placeholder="Enter password" className ="input-field" required value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
          </div>
                
          <button type="submit" className="btn"  >Login</button>
          
        </form>

      </div>  

    </div>
  );
}

export default LoginForm;