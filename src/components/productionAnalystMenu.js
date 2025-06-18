import './productionAnalystMenu.css';
import { useEffect, useState } from 'react';
import logo from '../resources/RatifyxCook.png';
import raisePurchaseOrderButton from '../resources/RaisePurchaseOrderButton.png';
import receiptUploadButton from '../resources/ReceiptUploadButton.png';
import returnArrow from '../resources/ReturnArrow.png'

function ProductionAnalystMenu() {

  const [email, setEmail] = useState('');
  const [authorities, setAuthorities] = useState('');

  useEffect(() => {
    // Retrieve values from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedAuthorities = localStorage.getItem('authorities');

    if (storedEmail) setEmail(storedEmail);
    if (storedAuthorities) setAuthorities(storedAuthorities);
  }, []);
  
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

      <a href="./"><img src={returnArrow} id= "returnArrow" alt="returnArrow" width="100" /></a>

      <div className="info">
        <p id= "emailPlaceholder"> {email || 'Email placeholder'}</p>
        <p id= "jobTitlePlaceholder"> {authorities || 'Authorities placeholder'} </p>
      </div>




    </div>
  );
}

export default ProductionAnalystMenu;