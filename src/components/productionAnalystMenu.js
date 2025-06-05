import './productionAnalystMenu.css';
import logo from '../resources/RatifyxCook.png';
import raisePurchaseOrderButton from '../resources/RaisePurchaseOrderButton.png';
import receiptUploadButton from '../resources/ReceiptUploadButton.png';
import returnArrow from '../resources/ReturnArrow.png'

function ProductionAnalystMenu() {
  
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

        <img src={raisePurchaseOrderButton} id= "purchaseOrder" alt="PurchaseOrder" width="250" />
        <img src={receiptUploadButton} id= "receiptUpload" alt="ReceiptUpload" width="250" />

      </div>  

      <img src={returnArrow} id= "returnArrow" alt="returnArrow" width="100" />

      <div className="info">
        <p id= "emailPlaceholder"> Email placeholder</p>
        <p id= "jobTitlePlaceholder"> Job title placeholder </p>
      </div>




    </div>
  );
}

export default ProductionAnalystMenu;