import { API_URL, API_KEY } from '@/config/api';

export interface Alumno {
  _id?: string;
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: number;
  seccion: string;
  fechaIngreso?: string;
}

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

const consultarPorId = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/alumnos/consultar-por-id/${id}`, {
      headers
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al consultar alumno');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const actualizar = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/alumnos/actualizar-alumno/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar alumno');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const alumnosService = {
  async crear(alumno: Omit<Alumno, '_id' | 'fechaIngreso'>) {
    try {
      const response = await fetch(`${API_URL}/alumnos`, {
        method: 'POST',
        headers,
        body: JSON.stringify(alumno),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al crear alumno');
      }

      return response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },

  async consultarPorGrado(grado: number) {
    try {
      const response = await fetch(`${API_URL}/alumnos/grado/${grado}`, {
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al consultar alumnos');
      }

      return response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },

  consultarPorId,

  actualizar,

  async eliminar(id: string) {
    try {
      const response = await fetch(`${API_URL}/alumnos/eliminar-alumno/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar alumno');
      }

      return response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },

  async obtenerPorId(id: string) {
    try {
      const response = await fetch(`${API_URL}/alumnos/${id}`, {
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al obtener alumno');
      }

      return response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },

  async obtenerTodos() {
    try {
      const response = await fetch(`${API_URL}/alumnos`, {
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al consultar alumnos');
      }

      return response.json();
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  },
}; 