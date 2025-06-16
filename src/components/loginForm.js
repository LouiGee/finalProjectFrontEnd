import './loginForm.css';
import logo from '../resources/RatifyxCook.png';
import service from '../services/authenticationService.js'

function LoginForm() {
  
  async function login() {

        const service = new authenticationService();
        
        try {

          service.login();
          
        } catch (error) {
          console.error('Failed to login:', error);
        }
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

        <form action="/submit-form" className= "loginForm">

          <div className="inputFieldsContainer">
            <input type="text" id="username" name="username" placeholder="Enter username" className ="input-field" required /> <br/>
            <input type="password" id="password" name="password" placeholder="Enter password" className ="input-field" required /><br/>
          </div>
                
          <button type="submit" className="btn" onClick = {login} >Login</button>
          
        </form>

      </div>  

    </div>
  );
}

export default LoginForm;