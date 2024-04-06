import axios from 'axios'

const jwt = localStorage.getItem('MyToken');

// export const API_BASE_URL = 'http://localhost:8000/';
export const API_BASE_URL = 'https://online-lecture-scheduling-1-pede.onrender.com/';



export const api = axios.create({
  baseURL : API_BASE_URL,
  headers:{
    'Authorization': jwt ? `Bearer ${jwt}` : null,
        'Content-Type': 'application/json'
  }
})