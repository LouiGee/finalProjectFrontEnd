import axios from 'axios';
import Cookies from "js-cookie";

const API_BASE_URL_POMicroService = 'http://localhost:8081/api/po';
const API_BASE_URL_PaymentMicroService = 'https://localhost:5001/api/payment';


/*GET all non approved POs*/

export class POService {

  async getPaidPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL_POMicroService}/allPaidPo`, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
          'Content-Type': 'application/json',
       },  
    });


      return response.data;

    } catch (error) {
      console.error('Error fetching Paid PO data:', error);
      throw error;
    }
  }

  async getAllNonApprovedPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL_POMicroService}/allNonApprovedPo`, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
          'Content-Type': 'application/json',
       },  
    });


      return response.data;

    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }

/*GET all approved POs*/

  async getAllApprovedPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL_POMicroService}/allApprovedPo`, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
          'Content-Type': 'application/json',
       },  
    });


      return response.data;

    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }
  
/*GET all POs approved and non approved */ 

  async getAllPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL_POMicroService}/all`, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
          'Content-Type': 'application/json',
       },  
    });


      return response.data;

    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }



/*POST Approve POs*/

  async approvePOs(listOfPoItemNumbers, email) {

    Cookies.set("email", email,{ path: '/' });

    try {
    
      const response = await axios.post(`${API_BASE_URL_POMicroService}/approve`, JSON.stringify(listOfPoItemNumbers) , {
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json'
        }       
        });


      return response.data;

    } catch (error) {
      console.error('Error approving POs :', error);
      throw error;
    }
  }



/*POST Pay POs*/



  async payPOs(listOfPoItemNumbers, email) {

    Cookies.set("email", email,{ path: '/' });

    try {
    
      const response = await axios.post(`${API_BASE_URL_POMicroService}/pay`, JSON.stringify(listOfPoItemNumbers) , {
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json'
        }       
        });


      return response.data;

    } catch (error) {
      console.error('Error paying POs:', error);
      throw error;
    }
  }



/*POST Bank Redirect URL*/

async payPOBankRedirect(paymentDetails) {


    try {
    
      const response = await axios.post(`${API_BASE_URL_PaymentMicroService}/bankRedirect`, JSON.stringify(paymentDetails) , {
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json'
        }       
        });


      return response.data;

    } catch (error) {
      console.error('Error paying POs:', error);
      throw error;
    }
  }

}








export default POService;