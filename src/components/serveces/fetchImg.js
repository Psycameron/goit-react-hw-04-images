import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '33411658-9504db49656fc0db308898fd3';

axios.defaults.baseURL = BASE_URL;

export async function fetchImg() {
  const query = `?q=cat&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`;
  const request = await axios.get(query);
  return;
}
