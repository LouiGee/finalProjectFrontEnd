import './raisePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png'
import receipt from '../resources/ReceiptWhite.png'
import settings from '../resources/SettingsWhite.png'

function RaisePurchaseOrder() {
  
  return (

    <div>


      <nav className="navbar">
    
          <ul className="nav-links">

             <li id="returnButton"><a href="./productionAnalystMenu"><img src={returnArrow} id= "returnArrow" alt="returnArrow" width="100" /></a></li>     
             <li id="title"><h1> Raise Purchase Order </h1></li>
             <li id="receipt"><img src={receipt}  alt="receipt" width="80" /></li>
             <li className="right-group">
              <img id="settings" src={settings} alt="settings" width="80" />
              <div id="info">  
                <p id="emailPlaceholder">Email placeholder</p>
                <p id="jobTitlePlaceholder">Job title placeholder</p>
              </div>
             </li>           

          </ul>

        </nav>

        <div class="split-screen">
          <div class="left-panel">
            <div class="form-container">
              <h2>Purchase Order Input Form</h2>
              <form>
                <label for="company">Company Name:</label>
                <input type="text" id="company" name="company" required />

                <label for="item">Item:</label>
                <input type="text" id="item" name="item" required />

                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" name="quantity" required />

                <label for="unit">Unit:</label>
                <input type="text" id="unit" name="unit" required />

                <label for="amount">Total Amount:</label>
                <input type="number" id="amount" name="amount" required />

                <div class="form-buttons">
                  <button type="button">Add</button>
                  <button type="submit">Submit Purchase Order</button>
                </div>
             </form>
            </div>

            <div class="table-container">
              <h2>Current Purchase Order Entry</h2>
              <table>
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date Raised</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PO12345</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>$12,000</td>
                    <td>2025-06-05</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            
          </div>
          <div class="right-panel">
            Right Content
          </div>
        </div>


    </div>
  );
}

export default RaisePurchaseOrder;