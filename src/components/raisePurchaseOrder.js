import React, { useState, useEffect } from 'react';
import './raisePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import  POService from '../services/poService.js';
import  POTempService from '../services/poTempService.js';
import receipt from '../resources/ReceiptWhite.png';


function RaisePurchaseOrder() {

  const [poData, setPoData] = useState([]);
  const [poTempData, setPoTempData] = useState([]);
  const [email, setEmail] = useState('');
  const [authorities, setAuthorities] = useState('');

  //Load once the page rendered

  useEffect(() => {
        // Retrieve values from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedAuthorities = localStorage.getItem('authorities');

    if (storedEmail) setEmail(storedEmail);
    if (storedAuthorities) setAuthorities(storedAuthorities);

    fetchPOs();
    fetchPOsTemp();

  }, []);


  //API Calls

  async function fetchPOs() {
      try {
        const service = new POService();

        const data = await service.getAllPOs(); 
        setPoData(data);
      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    }

  async function fetchPOsTemp() {
      try {
        const service = new POTempService();
        const data = await service.getAllPOsTemp(); 
        setPoTempData(data);
      } catch (error) {
        console.error('Failed to fetch POTemp data:', error);
      }
    }

  async function addPOTemp() { 

    const service = new POTempService();

    // Get input values
    const company = document.getElementById('company').value;
    const quantity = document.getElementById('quantity').value;
    const item = document.getElementById('item').value;
    const unit = document.getElementById('unit').value;
    const price = document.getElementById('price').value;
    
    // Create an object (like an Employee)
    const poTemp = {
      userId: 1,
      company: company,
      quantity: quantity,
      item: item,
      unit: unit,
      price: price,
    };

    await service.addPOTemp(poTemp);
    
    document.getElementById('company').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('item').value = '';
    document.getElementById('unit').value = '';
    document.getElementById('price').value = '';

    fetchPOsTemp();

   } 


  async function submitPOsTemp() { 

    const service = new POTempService();

    await service.submitPOsTemp();

    fetchPOsTemp();

    fetchPOs();

   } 


  async function deletePOsTemp() {

    const service = new POTempService();

    const selected = Array.from(document.querySelectorAll('.po-checkbox:checked'))
      .map(cb => cb.value);
    console.log("Selected POs:", selected);

    const toSend = [];


    for (const poItemNumber of selected) {

      const poTemp = {
        poitemnumber: poItemNumber,
      };
      
      toSend.push(poTemp)

    }

    await service.deletePOTemp(toSend);

    fetchPOsTemp();



}


  return (
    <div className>

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
              <p id="emailPlaceholder">{email || 'Email placeholder'}</p>
              <p id="jobTitlePlaceholder">{authorities || 'Authorities placeholder'}</p>
            </div>
          </div>    
      </nav>

      <div className="split-screen">
        <div className="left-panel">
          <div className="form-container">
            <h2>Purchase Order Input Form</h2>
            <form id="po-input-form">
              <label htmlFor="company">Company Name:</label>
              <input type="text" id="company" name="company" required />

              <label htmlFor="item">Item:</label>
              <input type="text" id="item" name="item" required />

              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" required />

              <label htmlFor="unit">Unit:</label>
              <input type="text" id="unit" name="unit" required />

              <label htmlFor="amount">Price:</label>
              <input type="number" id="price" name="price" required />

              <div >
                <button className="form-button" type="button" onClick={addPOTemp}>Add</button>
              </div>
            </form>
          </div>

          <div className="current-po-table-container">
            <h2>Current Purchase Order Entry</h2>
            <div className="current-po-table-scroll">
              <table className="current-po-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price £</th>
                    <th>Date Raised</th>
                    <th>     
                        <button className="delete-button" onClick={deletePOsTemp}>Delete</button>  
                    </th>
                  </tr>
                </thead>       
                <tbody>
                  {poTempData.map((po, index) => (
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td>{po.company}</td>
                      <td>{po.item}</td>
                      <td>{po.quantity}</td>
                      <td>{po.price}</td>
                      <td>{po.dateRaised.length > 10 ? po.dateRaised.slice(0, -7) : po.dateRaised}</td>
                      <td><input type="checkbox" value={po.poitemnumber} className="po-checkbox"/></td>
                    </tr>
                  ))}         
                </tbody>
              </table>
            </div>
   
            <button className = "submit-button" type="submit" onClick={submitPOsTemp}>Submit Purchase Order</button>
            
          </div>

        </div>

        <div className="right-panel">

          <div className="history-po-table-container">
            <h2>Purchase Order History  </h2>
            <div className="history-po-table-scroll">
              <table className="history-po-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price £</th>
                    <th>Date Raised</th>
                    <th>Approved</th>
                  </tr>
                </thead>       
                <tbody>
                   {poData.map((po, index) => (
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td>{po.company}</td>
                      <td>{po.item}</td>
                      <td>{po.quantity}</td>
                      <td>{po.price}</td>
                      <td>{po.dateRaised.length > 10 ? po.dateRaised.slice(0, -7) : po.dateRaised}</td>
                      <td>Yes</td>
                    </tr>
                  ))}          
                </tbody>
              </table>
            </div>
          </div>

          <div className="statistics-container">
            <h2>Summary Statistics </h2>
            <div className="statistics-table-scroll">
              <table className="statistics-table">
                  <thead>
                    <tr>
                      <th>Week Commencing</th>
                      <th>Total PO's Raised</th>
                      <th>Total PO Items Raised</th>
                      <th>Value of PO's Raised £</th>
                      <th>Average PO Value £</th>
                    </tr>
                  </thead>       
                  <tbody>
                    <tr>
                      <td>2025-06-02</td>
                      <td>4</td>
                      <td>19</td>
                      <td>20,000</td>
                      <td>2,400</td>
                    </tr>
                    <tr>
                      <td>2025-05-26</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
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