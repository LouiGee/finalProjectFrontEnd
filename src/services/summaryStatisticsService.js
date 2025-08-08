import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/po';


export class SummaryStatisticsService {


    /*GET Summary Statistics */

      async getSummaryStatistics() {
    
        try {
        
          const response = await axios.get(`${API_BASE_URL}/summaryStatistics`, {
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


}

export default SummaryStatisticsService;