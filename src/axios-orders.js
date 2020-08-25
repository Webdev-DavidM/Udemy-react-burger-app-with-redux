import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-95d5e.firebaseio.com',
});

export default instance;
