import { useState, useEffect} from 'react';
import './payPurchaseOrder.css';
import returnArrow from '../resources/ReturnArrowWhite.png';
import  POService from '../services/poService.js';
import payButton from '../resources/PayPurchaseOrderButtonWhite.png';
import useIdleLogout from '../hooks/useIdleLogout.js';


function PayPurchaseOrder() {

  // Inititate hook - time out after 3 minutes if no event occurs
  useIdleLogout();

  // useState() is a 'React Hook' - everytime the variable changes e.g the variable poData,
  // the page reloads to reflect this. In this way the UI stays in sync with data.
  // setPoData is used exclusively to update variable. Variable is initialised as an array. 
  const [poApprovedData, setPoApprovedData] = useState([]); 
  const [poPaidData, setPoPaidData] = useState([]); 
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

    await fetchApprovedPOs();
    await fetchPaidPOs();

  };

  fetchData();

  }, []);


  // API Functions

    // 1. Fetch Approved PO's 

    async function fetchApprovedPOs() {
      
    // API Call
    try {
        const service = new POService();
        const data = await service.getAllApprovedPOs(); 
        console.log(data);
        setPoApprovedData(data);

      } catch (error) {
        console.error('Failed to fetch Approved PO data:', error);
      }
    }

    // 2. Fetch Paid PO's

    async function fetchPaidPOs() {
      
    // API Call
    try {
        const service = new POService();
        const data = await service.getPaidPOs(); 
        console.log(data);
        setPoPaidData(data);

      } catch (error) {
        console.error('Failed to fetch Paid PO data:', error);
      }
    }

    //3. Pay for PO's

    async function payPOs() {

      // 1. Pay for the PO's

        // Gather all the information from the selected rows and return the company, poitemnumber, item and price

        const selectedPOs = Array.from(document.querySelectorAll('.payChoice:checked'))
        .map(checkbox => {
          const row = checkbox.closest('tr');
          const cells = row.querySelectorAll('td');

          return {
            company: cells[2].innerText,
            poitemnumber: cells[1].innerText,
            item: cells[3].innerText,
            price: parseFloat(cells[5].innerText)
          };
        });
    
        // Initialise variable to group checked poitemnumbers by company
        const groupedByCompany = {};

        // If the company does not already exist in the list then create a new Json
        selectedPOs.forEach(po => {
          if (!groupedByCompany[po.company]) {
            groupedByCompany[po.company] = {
              Supplier: po.company,
              TotalPriceAmount: 0,
              PaidBy: email,
              ItemsAndPrice: []
            };
          }

        // Then add information about the items and prices to the appropriate company 
          groupedByCompany[po.company].ItemsAndPrice.push({
            PoItemNumber: po.poitemnumber,
            Item: po.item,
            Price: po.price
          });

        // Then add the price to the cumalative total price amount 
          groupedByCompany[po.company].TotalPriceAmount += po.price;
        });


        // Transform into an object
        const finalJsonList = Object.values(groupedByCompany);


        // Demonstrate created Jsonlist in the log
        console.log(finalJsonList);


        // API Call
            try {

                // Initiate service to make API call
                const service = new POService();

                // Payment portal url
                const bankRedirectUrl  = await service.payPOBankRedirect(finalJsonList); 

                // Open link
                window.open(bankRedirectUrl, '_blank');
      
              } catch (error) {
                console.error('Error fetching bank redirect link', error);
              }


      //2. Update PO Record 
      
        // For all selected Po's populate their poItemNumber in an array 'selected'
        const selected = Array.from(document.querySelectorAll('.payChoice:checked'))
          .map(cb => cb.value);

        // Demonstrate that that the correct poItemNumbers have been chosen
        console.log(selected);

        // Initialise a list to send
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
            await service.payPOs(toSend, userEmail); 
    
    
          } catch (error) {
            console.error('Error paying purchase order', error);
          }

      //3. Once the PO's have been paid and their records have been updated, the data on the page can be refreshed
        
        //Refresh Data 
        await fetchApprovedPOs();
        await fetchPaidPOs();
    
        
    }

  return (
    <div className='container'>

      <nav className="navbar">
        <ul className="nav-links">
          <li id="returnButton">
            <a href="./financeManagerMenu">
              <img src={returnArrow} id="returnArrow" alt="Return Arrow" width="100" />
            </a>
          </li>
          <li id="title">
            <h1>Pay Purchase Order</h1>
          </li>
          <li id="receipt">
              <img src={payButton} alt="Receipt" width="80" />
          </li>
          
        </ul>

        <div id="infoAPO">
          <p id="emailPlaceholderAPO">{email || 'Email placeholder'}</p>
          <p id="jobTitlePlaceholderAPO">{permission || 'Authorities placeholder'}</p>
        </div>
      </nav>

      <div className="split-screen">
        <div className="left-panel">

          <div className="awaiting-payment-po-table-container">
            <h2>Purchase Orders Awaiting Payment  </h2>
            <div className="awaiting-payment-po-table-scroll">
              <table className="awaiting-payment-po-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Price £</th>
                    <th>Description</th>
                    <th>Date Approved</th>
                    <th>Approved By</th>
                    <th>Status</th>
                    <th>Selected for Payment</th>
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
                      <td>{po.dateApproved.length > 10 ? po.dateApproved.slice(0, -7) : po.dateApproved}</td>
                      <td>{po.approvedBy}</td>
                      <td>{po.status}</td>
                      
                      <td><input type="checkbox" name="payChoice" value={po.poitemnumber} className="payChoice" defaultChecked/></td>
                    </tr>
                  ))}          
                </tbody>
              </table>


             
            </div>
            
            <button className="pay-button-PPO" onClick={payPOs}>  Pay Selected</button>

          </div> 
          
          
   
        </div>

        <div className="right-panel">

           <div className="paid-po-table-container">
            <h2> Paid Purchase Orders </h2>
            <div className="paid-po-table-scroll">
              <table className="paid-po-table">
                <thead>
                  <th>PO Number</th>
                    <th>PO ItemNumber</th>
                    <th>Company</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Price £</th>
                    <th>Description</th>
                    <th>Date Paid</th>
                    <th>Paid By</th>
                    <th>Status</th>
                </thead>       
                <tbody>
      
                    {poPaidData.map((po, index) => (
                    <tr key={index}>
                      <td>{po.ponumber}</td>
                      <td>{po.poitemnumber}</td>
                      <td>{po.company}</td>
                      <td>{po.item}</td>
                      <td>{po.quantity}</td>
                      <td>{po.price}</td>
                      <td>{po.description}</td>
                      <td>{po.datePaid.length > 10 ? po.datePaid.slice(0, -7) : po.datePaid}</td>
                      <td>{po.paidBy}</td>
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

export default PayPurchaseOrder;