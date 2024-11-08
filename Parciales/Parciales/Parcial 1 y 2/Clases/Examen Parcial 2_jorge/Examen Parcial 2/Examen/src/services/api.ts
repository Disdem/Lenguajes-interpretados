import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/';

export const getCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}character?page=${page}`); // Añadir la paginación
    return response.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};