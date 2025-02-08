import { Alumno } from '@/types/alumno';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'tu_api_key_secreta'
  }
});

export const alumnosApi = {
  crear: async (alumno: Omit<Alumno, '_id' | 'fechaIngreso'>) => {
    const response = await api.post('/crear-alumno', alumno);
    return response.data;
  },

  listarPorGrado: async (grado: number) => {
    const response = await api.get(`/consultar-alumno/${grado}`);
    return response.data;
  }
};

export default api; 