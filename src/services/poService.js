import axios from 'axios';
import Cookies from "js-cookie";

const API_BASE_URL = 'http://localhost:8081/api/po';

/*GET all non approved POs*/

export class POService {

  async getAllNonApprovedPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL}/allNonApprovedPo`, {
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
    
      const response = await axios.get(`${API_BASE_URL}/allApprovedPO`, {
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
    
      const response = await axios.post(`${API_BASE_URL}/approve`, JSON.stringify(listOfPoItemNumbers) , {
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json'
        }       
        });


      return response.data;

    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }

}





export default POService;