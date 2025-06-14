import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/temppo';

export class POTempService {
  async getAllPOsTemp() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
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

export default POTempService;