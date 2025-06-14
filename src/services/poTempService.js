import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/temppo';

export class POTempService {


  /*GET*/

  async submitPOsTemp() {
    try {
      const response = await axios.get(`${API_BASE_URL}/submit`);
      return response.data;
    } catch (error) {
      console.error('Error submitting PO data:', error);
      throw error;
    }
  }

  async getAllPOsTemp() {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching PO data:', error);
      throw error;
    }
  }


  /*POST*/

  async addPOTemp(poTemp) {
  return fetch(`${API_BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(poTemp)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add PO');
    }
    return response.json();
  });
  }

  /*DELETE*/

  async deletePOTemp(posTemp) {
  return fetch(`${API_BASE_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(posTemp)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete PO');
    }
    return response.json();
  });
  }







}

export default POTempService;