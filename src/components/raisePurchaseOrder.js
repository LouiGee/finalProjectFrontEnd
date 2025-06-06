import './raisePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import receipt from '../resources/ReceiptWhite.png';


function RaisePurchaseOrder() {
  return (
    <div className = "scrolling ">

      <nav className="navbar">
        <ul className="nav-links">
          <li id="returnButton">
            <a href="./productionAnalystMenu">
              <img src={returnArrow} id="returnArrow" alt="Return Arrow" width="100" />
            </a>
          </li>
          <li id="title">
            <h1>Raise Purchase Order</h1>
          </li>
          <li id="receipt">
            <img src={receipt} alt="Receipt" width="80" />
          </li>
        </ul>
          <div id="right-group">
            <div id="info">
              <p id="emailPlaceholder">Email placeholder</p>
              <p id="jobTitlePlaceholder">Job title placeholder</p>
            </div>
          </div>    
      </nav>

      <div className="split-screen">
        <div className="left-panel">
          <div className="form-container">
            <h2>Purchase Order Input Form</h2>
            <form>
              <label htmlFor="company">Company Name:</label>
              <input type="text" id="company" name="company" required />

              <label htmlFor="item">Item:</label>
              <input type="text" id="item" name="item" required />

              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" required />

              <label htmlFor="unit">Unit:</label>
              <input type="text" id="unit" name="unit" required />

              <label htmlFor="amount">Total Amount:</label>
              <input type="number" id="amount" name="amount" required />

              <div className="form-buttons">
                <button type="button">Add</button>
              </div>
            </form>
          </div>

          <div className="table-container">
            <h2>Current Purchase Order Entry</h2>
            <div className="table-scroll">
              <table className="table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date Raised</th>
                    <th> 
                      <div className="delete-button-wrapper">
                        <button className="delete-button">Delete</button>
                      </div>  
                    </th>
                  </tr>
                </thead>       
                <tbody>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345A</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>£12,000</td>
                    <td>2025-06-05</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345B</td>
                    <td>Global Ltd</td>
                    <td>Bolts</td>
                    <td>200</td>
                    <td>£3,000</td>
                    <td>2025-06-05</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345C</td>
                    <td>BuildIt</td>
                    <td>Concrete Bags</td>
                    <td>50</td>
                    <td>£1,500</td>
                    <td>2025-06-05</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345D</td>
                    <td>SteelWorld</td>
                    <td>Rebars</td>
                    <td>75</td>
                    <td>£4,500</td>
                    <td>2025-06-05</td>
                    <td><input type="checkbox" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            
            <button className = "submit-button" type="submit">Submit Purchase Order</button>
            
          </div>

        </div>

        <div className="right-panel">

          <div className="table-container-2">
            <h2>Purchase Order Hisotry  </h2>
            <div className="table-scroll-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date Raised</th>
                    <th>Approved</th>
                  </tr>
                </thead>       
                <tbody>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345A</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>£12,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345B</td>
                    <td>Global Ltd</td>
                    <td>Bolts</td>
                    <td>200</td>
                    <td>£3,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345C</td>
                    <td>BuildIt</td>
                    <td>Concrete Bags</td>
                    <td>50</td>
                    <td>£1,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345D</td>
                    <td>SteelWorld</td>
                    <td>Rebars</td>
                    <td>75</td>
                    <td>£4,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345A</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>£12,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345B</td>
                    <td>Global Ltd</td>
                    <td>Bolts</td>
                    <td>200</td>
                    <td>£3,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345C</td>
                    <td>BuildIt</td>
                    <td>Concrete Bags</td>
                    <td>50</td>
                    <td>£1,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345D</td>
                    <td>SteelWorld</td>
                    <td>Rebars</td>
                    <td>75</td>
                    <td>£4,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345A</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>£12,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345B</td>
                    <td>Global Ltd</td>
                    <td>Bolts</td>
                    <td>200</td>
                    <td>£3,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345C</td>
                    <td>BuildIt</td>
                    <td>Concrete Bags</td>
                    <td>50</td>
                    <td>£1,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345D</td>
                    <td>SteelWorld</td>
                    <td>Rebars</td>
                    <td>75</td>
                    <td>£4,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345A</td>
                    <td>Acme Corp</td>
                    <td>Steel Beams</td>
                    <td>100</td>
                    <td>£12,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345B</td>
                    <td>Global Ltd</td>
                    <td>Bolts</td>
                    <td>200</td>
                    <td>£3,000</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345C</td>
                    <td>BuildIt</td>
                    <td>Concrete Bags</td>
                    <td>50</td>
                    <td>£1,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>PO12345</td>
                    <td>PO12345D</td>
                    <td>SteelWorld</td>
                    <td>Rebars</td>
                    <td>75</td>
                    <td>£4,500</td>
                    <td>2025-06-05</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
       </div>
      </div>
    </div>
  );
}

export default RaisePurchaseOrder;