import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/po';

/*GET POs*/

export class POService {

  async getAllPOs() {

    try {
    
      const response = await axios.get(`${API_BASE_URL}/all`, {
        withCredentials: true, // Include cookies i.e jwt token... could use an interceptor class
        headers: {
          'Content-Type': 'application/json',
       },  
    });

      updateCookies(response);

      return response.data;

    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }

  updateCookies(response) {

    if (response.cookies.authenticationToken && response.cookies.refreshToken) {

        Cookies.set("authenticationToken", cookies.authenticationToken);
        Cookies.set("refreshToken", cookies.refreshToken);

      }
  }


}

export default POService;