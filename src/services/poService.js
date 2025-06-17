import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/po';

export class POService {
  async getAllPOs() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`, {
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true,
      Authorisation: `Bearer ${Token}`, // or accessToken if you have that
    }});
      return response.data;
    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }

  // You can add more methods here if needed
  // async createPO(poData) { ... }
  // async deletePO(id) { ... }
}

export default POService;