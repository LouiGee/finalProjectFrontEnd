import './loginForm.css';
import logo from '../resources/RatifyxCook.png';
import authenticationService from '../services/authenticationService.js'
import { useState } from 'react';
function LoginForm() {

  // useState() is a 'React Hook' - everytime the variable changes e.g the variable email,
  // the page reloads to reflect this. In this way the UI stays in sync with data.
  // setEmail is used exclusively to update variable. Variable is initialised as an array.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function login(event) {

        // Stops the default behaviour of a submit form i.e reload page.
        // Instead the login function will handle the event
        event.preventDefault();

        
        // Create a credentials object
        const credentials = {
          email: email,
          password: password
        }
        
        try {

          const service = new authenticationService();
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