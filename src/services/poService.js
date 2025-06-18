import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/po';

/*GET*/

export class POService {

  async getAllPOs() {
    try {
    
      const response = await axios.get(`${API_BASE_URL}/all`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
       },  
    });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }


}

export default POService;