import axios from "axios";
import https from 'https';


const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


//Requisicoes publicas e base ClientRequestService
export const AxioInstanceService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 90000,
  headers: {
    'Content-Type': 'application/json'
  },
   httpsAgent,
});
