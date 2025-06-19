import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/temppo';

export class POTempService {

  /*axios used in place of fetch for more robust support for API calls 

  /*GET TempPO's*/

  async submitPOsTemp() {

    try {
      const response = await axios.get(`${API_BASE_URL}/submit`, {   
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
      console.error('Error fetching PO data', error);
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
        
      const response = await axios.delete(`${API_BASE_URL}/delete`, {
      data: posTemp,
      withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
      headers: {
      'Content-Type': 'application/json' // or accessToken if you have that
    }       
    });
      console.log("Delete Logging: " , response);

    } catch (error) {
      console.error('Failed to delete PO', error);
      throw error;
    }

    }
}

export default POTempService;