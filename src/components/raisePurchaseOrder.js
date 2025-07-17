import { useState, useEffect} from 'react';
import './raisePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import  POService from '../services/poService.js';
import  POTempService from '../services/poTempService.js';
import receipt from '../resources/ReceiptWhite.png';
import useIdleLogout from '../hooks/useIdleLogout.js';


function RaisePurchaseOrder() {

  useIdleLogout();

  // useState() is a 'React Hook' - everytime the variable changes e.g the variable poData,
  // the page reloads to reflect this. In this way the UI stays in sync with data.
  // setPoData is used exclusively to update variable. Variable is initialised as an array.
  const [poData, setPoData] = useState([]); 
  const [poTempData, setPoTempData] = useState([]);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('');
  const [editingField, setEditingField] = useState({ row: null, field: null });

  
   // useEffect() is a 'React Hook' - used to perform 'side effects'. Side effects are things
   // that involve not directly rendering the UI e.g APIcalls, changing local storage

  useEffect( () => {
    
    const fetchData = async () => {
    const storedEmail = localStorage.getItem('email');
    const storedPermission = localStorage.getItem('permission');

    if (storedEmail) setEmail(storedEmail);
    if (storedPermission) setPermission(storedPermission);

    await fetchPOs();         // Wait for response + cookies to be set
    await fetchPOsTemp();     // Cookies should now be available
  };

  fetchData();

  }, []);


  // API Functions


  async function fetchPOs() {
      
    // API Call
    try {
        const service = new POService();
        const data = await service.getAllPOs(); 
        setPoData(data);

      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    }

  async function fetchPOsTemp() {

    // API Call
    try {
        const service = new POTempService();
        const data = await service.getAllPOsTemp(); 
        setPoTempData(data);

      } catch (error) {
        console.error('Failed to fetch POTemp data:', error);
      }
    }

  async function addPOTemp() { 

    // Get input values from input form
    const company = document.getElementById('company').value;
    const quantity = document.getElementById('quantity').value;
    const item = document.getElementById('item').value;
    const unit = document.getElementById('unit').value;
    const price = document.getElementById('price').value;
    
    // Create a po object to send in the API call
    const poTemp = {
      userId: 1,
      company: company,
      quantity: quantity,
      item: item,
      unit: unit,
      price: price,
    };

    // API call
    try {
          const service = new POTempService();
          await service.addPOTemp(poTemp);
      } catch (error) {
        console.error('Failed to add PO', error);
      }

    // Clear form
    document.getElementById('company').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('item').value = '';
    document.getElementById('unit').value = '';
    document.getElementById('price').value = '';
    
    // Reload Temp PO's to reflect changes
    fetchPOsTemp();

   } 


  async function submitPOsTemp() { 

    // API call
    try {
          const service = new POTempService();
          await service.submitPOsTemp();
      } catch (error) {
        console.error('Failed to add PO', error);
      }
    
    // Reload POs and Temp POs to reflect changes 
    fetchPOsTemp();
    fetchPOs();

   } 


  async function handleTempPOEdit (poItemNumber, chosenField, enteredValue){
    
    let parsedValue = enteredValue;

    if (chosenField === 'quantity' || chosenField === 'price') {
      parsedValue = Number(enteredValue); // prevent sending invalid blank
    }

    const TempPOUpdateRequest = {
      field: chosenField,
      newValue: parsedValue
    }

    try {
          const service = new POTempService();
          await service.editPOTemp(poItemNumber, TempPOUpdateRequest);
      } catch (error) {
        console.error('Failed to edit PO', error);
      }

    // Reload POs and Temp POs to reflect changes 
    fetchPOsTemp();

  };



  async function deletePOsTemp() {

    // For all selected Po's populate their poItemNumber in an array 'selected'
    const selected = Array.from(document.querySelectorAll('.po-checkbox:checked'))
      .map(cb => cb.value);

    const toSend = [];

    // Loop through the selected poItemNumbers and create a poTemp object(required for API Call)
    // Then add to the array toSend
    for (const poItemNumber of selected) {

      const poTemp = {
        poitemnumber: poItemNumber,
      };
      
      toSend.push(poTemp)

    }

    // API call
    try {
          const service = new POTempService();
          await service.deletePOTemp(toSend);
      } catch (error) {
        console.error('Failed to delete PO(s)', error);
      }

  
    // Reflect changes
    fetchPOsTemp();

  }

  const isEditing = (rowIndex, fieldName) =>
  editingField.row === rowIndex && editingField.field === fieldName;


  return (
    <div className='container'>

      <nav className="navbar">
        <ul className="nav-links">
          <li id="returnButton">
            <a href="./departmentAnalystMenu">
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
              <p id="jobTitlePlaceholder">{permission || 'Authorities placeholder'}</p>
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

              <label htmlFor="unit">Unit: e.g kg</label>
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
                <tbody> {/* Add index*/}
                  {poTempData.map((po, index) => ( 
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td onClick={() => setEditingField({ row: index, field: 'company' })}> {isEditing(index, 'company') ? ( <input type="text" defaultValue={po.company} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {handleTempPOEdit(po.poitemnumber, 'company', e.target.value); setEditingField({ row: null, field: null }); } else if (e.key === 'Escape') {setEditingField({ row: null, field: null }); }}} onBlur={() => setEditingField({ row: null, field: null })}/>) : (po.company)}</td>
                      <td onClick={() => setEditingField({ row: index, field: 'item' })}> {isEditing(index, 'item') ? ( <input type="text" defaultValue={po.item} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {handleTempPOEdit(po.poitemnumber, 'item', e.target.value); setEditingField({ row: null, field: null }); } else if (e.key === 'Escape') {setEditingField({ row: null, field: null }); }}} onBlur={() => setEditingField({ row: null, field: null })}/>) : (po.item)}</td>
                      <td onClick={() => setEditingField({ row: index, field: 'quantity' })}> {isEditing(index, 'quantity') ? ( <input type="number" defaultValue={po.quantity} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {handleTempPOEdit(po.poitemnumber, 'quantity', e.target.value); setEditingField({ row: null, field: null }); } else if (e.key === 'Escape') {setEditingField({ row: null, field: null }); }}} onBlur={() => setEditingField({ row: null, field: null })}/>) : (po.quantity)}</td>
                      <td onClick={() => setEditingField({ row: index, field: 'price' })}> {isEditing(index, 'price') ? ( <input type="number" defaultValue={po.price} autoFocus onKeyDown={(e) => { if (e.key === 'Enter') {handleTempPOEdit(po.poitemnumber, 'price', e.target.value); setEditingField({ row: null, field: null }); } else if (e.key === 'Escape') {setEditingField({ row: null, field: null }); }}} onBlur={() => setEditingField({ row: null, field: null })}/>) : (po.price)}</td>
                      <td>{po.dateRaised.length > 10 ? po.dateRaised.slice(0, -7) : po.dateRaised}</td> {/* Format Date */}
                      <td><input type="radio" name="deleteChoice" value={po.poitemnumber} className="po-checkbox"/></td>
                    </tr>
                  ))}         
                </tbody>
              </table>
            </div>
   
            <button className = "submit-button" type="submit" onClick={submitPOsTemp}>Submit All</button>
            
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
                    <th>Status</th>
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
                      <td>{po.status}</td>
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
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
                    </tr>
                    <tr>
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
                      <td>TBD</td>
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