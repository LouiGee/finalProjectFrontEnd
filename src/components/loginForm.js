import './loginForm.css';
import logo from '../resources/RatifyxCook.png';
function LoginForm() {
  return (

    <div>

      <div className="triangle-background">
        <div className="triangle1"></div>
      </div>

      <div className="triangle2"></div>
      
      <div className="logo">
        <img src={logo} alt="Logo" width="400" />
      </div>

      
      <div className="loginContainer">

        <form action="/submit-form" className= "loginForm">

          <div className="inputFieldsContainer">
            <input type="text" id="username" name="username" placeholder="Enter username" className ="input-field" required /> <br/>
            <input type="password" id="password" name="password" placeholder="Enter password" className ="input-field" required /><br/>
          </div>
                
          <button type="submit" className="btn" >Login</button>
          
        </form>

      </div>  

    </div>
  );
}

export default LoginForm;