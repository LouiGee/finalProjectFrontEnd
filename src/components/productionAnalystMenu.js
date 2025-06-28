import './productionAnalystMenu.css';
import { useEffect, useState } from 'react';
import logo from '../resources/RatifyxCook.png';
import raisePurchaseOrderButton from '../resources/RaisePurchaseOrderButton.png';
import receiptUploadButton from '../resources/ReceiptUploadButton.png';
import returnArrow from '../resources/ReturnArrow.png';
import authenticationService from '../services/authenticationService.js';
import useIdleLogout from '../hooks/useIdleLogout';

function ProductionAnalystMenu() {

  useIdleLogout();

  // useState() is a 'React Hook' - everytime the variable changes e.g the variable email,
  // the page reloads to reflect this. In this way the UI stays in sync with data.
  // setEmail is used exclusively to update variable. Variable is initialised as an array.
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('');

  // useEffect() is a 'React Hook' - used to perform 'side effects'. Side effects are things
  // that involve not directly rendering the UI e.g APIcalls, changing local storage
  useEffect(() => {
    
    const storedEmail = localStorage.getItem('email');
    const storedPermission = localStorage.getItem('permission');

    if (storedEmail) setEmail(storedEmail);
    if (storedPermission) setPermission(storedPermission);
    
  }, []);

  async function logout(event) {
  
          // Stops the default behaviour of a submit form i.e reload page.
          // Instead the logout function will handle the event
          event.preventDefault();
          
          try {
  
            const service = new authenticationService();
            await service.logoutRequest();
  
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

      
      <div className="optionContainer">

        <a href="./raisePurchaseOrder"><img src={raisePurchaseOrderButton} id= "purchaseOrder" alt="PurchaseOrder" width="250" /></a>
        <a href="./receiptUpload"><img src={receiptUploadButton} id= "receiptUpload" alt="ReceiptUpload" width="250" /></a>

      </div>  

      <img src={returnArrow} id="returnArrow" alt="returnArrow" width="100" style={{ cursor: 'pointer' }} onClick={logout}/>

      <div className="info">
        <p id= "emailPlaceholder"> {email || 'Email placeholder'}</p>
        <p id= "jobTitlePlaceholder"> {permission || 'Authorities placeholder'} </p>
      </div>


    </div>
  );
}

export default ProductionAnalystMenu;