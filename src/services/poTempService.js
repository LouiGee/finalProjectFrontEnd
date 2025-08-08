import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/potemp';

export class POTempService {

  /*axios used in place of fetch for more robust support for API calls */

  async submitPOsTemp() {

    try {
      const response = await axios.post(`${API_BASE_URL}/submit`, "", {   
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
        'Content-Type': 'application/json'
      }
      });

      return response.data;
    } catch (error) {
      console.error('Error submitting PO data:', error);
      throw error;
    }

  }

  /*GET TempPO's*/

  async getAllPOsTemp() {

    try {
        
      const response = await axios.get(`${API_BASE_URL}/all`, {
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
      'Content-Type': 'application/json' 
      },    
      });

      return response.data;

    } catch (error) {
      console.error('Error fetching Temp PO data', error);
      throw error;
    }

  }

  /*POST Temp PO's*/

  async addPOTemp(poTemp) {

    try {
        
      const response = await axios.post(`${API_BASE_URL}/add`, JSON.stringify(poTemp) , {
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
      'Content-Type': 'application/json'
      }       
      });

      return response.data;

    } catch (error) {
      console.error('Failed to add PO', error);
      throw error;
    }
    
  }

  /*DELETE Temp PO's*/

  async deletePOTemp(posTemp) {

     try {
        
      await axios.delete(`${API_BASE_URL}/delete`, {
      data: posTemp,
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
      'Content-Type': 'application/json' // or accessToken if you have that
      }       
      });
      

    } catch (error) {
      console.error('Failed to delete PO', error);
      throw error;
    }

    }

  /*EDIT Temp PO's*/

  async editPOTemp(poItemNumber, updatedData) {

     try {
        
      await axios.put(`${API_BASE_URL}/edit/${poItemNumber}`, updatedData, {
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
      'Content-Type': 'application/json' // or accessToken if you have that
      }       
      });
      

    } catch (error) {
      console.error('Failed to delete PO', error);
      throw error;
    }

    }


}

export default POTempService;