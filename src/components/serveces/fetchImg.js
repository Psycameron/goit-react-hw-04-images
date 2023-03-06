import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33411658-9504db49656fc0db308898fd3';

axios.defaults.baseURL = BASE_URL;

export async function fetchImg(page, query) {
  const queryParam = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(queryParam);
  return data;
}
