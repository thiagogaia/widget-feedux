import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nuzap.com.br'
});