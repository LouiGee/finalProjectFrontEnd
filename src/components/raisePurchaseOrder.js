import React, { useState, useEffect } from 'react';
import './raisePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import  POService from '../services/poService.js';
import  POTempService from '../services/poTempService.js';
import receipt from '../resources/ReceiptWhite.png';


function RaisePurchaseOrder() {

  const [poData, setPoData] = useState([]);

  const [poTempData, setPoTempData] = useState([]);

  useEffect(() => {

    async function fetchPOs() {
      try {
        const service = new POService();
        const data = await service.getAllPOs(); // adjust method name as needed
        setPoData(data);
      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    }

    fetchPOs();

    async function fetchPOsTemp() {
      try {
        const service = new POTempService();
        const data = await service.getAllPOsTemp(); // adjust method name as needed
        setPoTempData(data);
      } catch (error) {
        console.error('Failed to fetch POTemp data:', error);
      }
    }

    fetchPOsTemp();

  }, []);




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

              <div >
                <button className="form-button" type="button">Add</button>
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
                    <th>Total Amount £</th>
                    <th>Date Raised</th>
                    <th>     
                        <button className="delete-button">Delete</button>  
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
                      <td>{po.dateRaised}</td>
                      <td><input type="checkbox" /></td>
                    </tr>
                  ))}         
                </tbody>
              </table>
            </div>

            
            <button className = "submit-button" type="submit">Submit Purchase Order</button>
            
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
                    <th>Total Amount £</th>
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
                      <td>{po.dateRaised}</td>
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