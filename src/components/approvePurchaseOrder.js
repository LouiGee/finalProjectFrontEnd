import { useState, useEffect} from 'react';
import './approvePurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import  POService from '../services/poService.js';
import approveButton from '../resources/ApprovePurchaseOrderButtonWhite.png';

import useIdleLogout from '../hooks/useIdleLogout.js';


function ApprovePurchaseOrder() {

  useIdleLogout();

  // useState() is a 'React Hook' - everytime the variable changes e.g the variable poData,
  // the page reloads to reflect this. In this way the UI stays in sync with data.
  // setPoData is used exclusively to update variable. Variable is initialised as an array.
  const [poNonApprovedData, setPoNonApprovedData] = useState([]); 
  const [poApprovedData, setPoApprovedData] = useState([]); 
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('');
  
   // useEffect() is a 'React Hook' - used to perform 'side effects'. Side effects are things
   // that involve not directly rendering the UI e.g APIcalls, changing local storage

  useEffect( () => {
    
    const fetchData = async () => {
    const storedEmail = localStorage.getItem('email');
    const storedPermission = localStorage.getItem('permission');

    if (storedEmail) setEmail(storedEmail);
    if (storedPermission) setPermission(storedPermission);

    await fetchNonApprovedPOs();
    await fetchApprovedPOs();

  };

  fetchData();

  }, []);


  // API Functions


  async function fetchNonApprovedPOs() {
      
    // API Call
    try {
        const service = new POService();
        const data = await service.getAllNonApprovedPOs(); 
        console.log(data);
        setPoNonApprovedData(data);

      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    }

    async function fetchApprovedPOs() {
      
    // API Call
    try {
        const service = new POService();
        const data = await service.getAllApprovedPOs(); 
        console.log(data);
        setPoApprovedData(data);

      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    }


  async function approvePOs() {

      // For all selected Po's populate their poItemNumber in an array 'selected'
    const selected = Array.from(document.querySelectorAll('.approveChoice:checked'))
      .map(cb => cb.value);

    console.log(selected);

    const toSend = [];

    // Loop through the selected poItemNumbers and create a poTemp object(required for API Call)
    // Then add to the array toSend
    for (const poItemNumber of selected) {

      const poItemNumberJson = {
        "poitemnumber": poItemNumber,
      };
      
      toSend.push(poItemNumberJson)

    }

    const userEmail = localStorage.getItem('email');
      
    // API Call
    try {
        const service = new POService();
        await service.approvePOs(toSend, userEmail); 


      } catch (error) {
        console.error('Failed to fetch PO data:', error);
      }
    
    //Refresh Data 
    await fetchNonApprovedPOs();
    await fetchApprovedPOs();

    
    }

  return (
    <div className='container'>

      <nav className="navbar">
        <ul className="nav-links">
          <li id="returnButton">
            <a href="./departmentManagerMenu">
              <img src={returnArrow} id="returnArrow" alt="Return Arrow" width="100" />
            </a>
          </li>
          <li id="title">
            <h1>Approve Purchase Order</h1>
          </li>
          <li id="receipt">
              <img src={approveButton} alt="Receipt" width="80" />
          </li>
          
        </ul>

        <div id="infoAPO">
          <p id="emailPlaceholderAPO">{email || 'Email placeholder'}</p>
          <p id="jobTitlePlaceholderAPO">{permission || 'Authorities placeholder'}</p>
        </div>
      </nav>

      <div className="split-screen">
        <div className="left-panel">

          <div className="awaiting-approval-po-table-container">
            <h2>Purchase Orders Awaiting Approval  </h2>
            <div className="awaiting-approval-po-table-scroll">
              <table className="awaiting-approval-po-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price £</th>
                    <th>Description</th>
                    <th>Date Raised</th>
                    <th>Raised By</th>
                    <th>Status</th>
                    <th>Selected for Approval</th>
                  </tr>
                </thead>       
                <tbody>
                   {poNonApprovedData.map((po, index) => (
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td>{po.company}</td>
                      <td>{po.item}</td>
                      <td>{po.quantity}</td>
                      <td>{po.price}</td>
                      <td>{po.description}</td>
                      <td>{po.dateRaised.length > 10 ? po.dateRaised.slice(0, -7) : po.dateRaised}</td>
                      <td>{po.raisedBy}</td>
                      <td>{po.status}</td>
                      
                      <td><input type="checkbox" name="approveChoice" value={po.poitemnumber} className="approveChoice"/></td>
                    </tr>
                  ))}          
                </tbody>
              </table>


             
            </div>
            
            <button className="approve-button-APO" onClick={approvePOs}>  Approve Selected</button>

          </div> 
          
          
   
        </div>

        <div className="right-panel">

           <div className="approved-po-table-container">
            <h2> Approved Purchase Orders </h2>
            <div className="approved-po-table-scroll">
              <table className="approved-po-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price £</th> 
                    <th>Description</th>    
                    <th>Date Raised</th> 
                    <th>Date Approved</th>
                    <th>Raised By</th>
                    <th>Approved By</th>
                    <th>Status</th>
                  </tr>
                </thead>       
                <tbody>
                   {poApprovedData.map((po, index) => (
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td>{po.company}</td>
                      <td>{po.item}</td>
                      <td>{po.quantity}</td>
                      <td>{po.price}</td>
                      <td>{po.description}</td>
                      <td>{po.dateRaised.length > 10 ? po.dateRaised.slice(0, -7) : po.dateRaised}</td>
                      <td>{po.dateApproved.length > 10 ? po.dateApproved.slice(0, -7) : po.dateApproved}</td>
                    
                      <td>{po.raisedBy}</td>
                      <td>{po.approvedBy}</td>
                      <td>{po.status}</td>
                    </tr>
                  ))}          
                </tbody>
              </table>
                
            </div>
            
          </div> 
       
        </div>
    </div>

   </div> 
  );
}

export default ApprovePurchaseOrder;