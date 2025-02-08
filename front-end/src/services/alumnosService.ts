import { API_URL, API_KEY } from '@/config/api';

const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

// Tipo base para los datos del alumno
export interface AlumnoBase {
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: number;
  seccion: string;
}

// Tipo completo que incluye los campos generados por MongoDB
export interface Alumno extends AlumnoBase {
  _id: string;
  fechaIngreso: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Tipo para crear un nuevo alumno
export type CreateAlumnoDto = AlumnoBase;

// Tipo para la respuesta paginada
export interface PaginatedResponse<T> {
  data: {
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// Tipo para respuestas simples
export interface ApiResponse<T> {
  data: T;
}

export const alumnosService = {
  async obtenerTodos(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Alumno>> {
    const url = new URL(`${API_URL}/alumnos`);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('limit', limit.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener alumnos');
    }

    return response.json();
  },

  async crear(alumno: CreateAlumnoDto): Promise<ApiResponse<Alumno>> {
    const response = await fetch(`${API_URL}/alumnos/crear-alumno`, {
      method: 'POST',
      headers,
      body: JSON.stringify(alumno)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear alumno');
    }

    return response.json();
  },

  async actualizar(id: string, alumno: AlumnoBase): Promise<ApiResponse<Alumno>> {
    const response = await fetch(`${API_URL}/alumnos/actualizar-alumno/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(alumno)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar alumno');
    }

    return response.json();
  },

  async eliminar(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/alumnos/eliminar-alumno/${id}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar alumno');
    }
  },

  async consultarPorId(id: string): Promise<ApiResponse<Alumno>> {
    const response = await fetch(`${API_URL}/alumnos/consultar-por-id/${id}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al consultar alumno');
    }

    return response.json();
  }
}; 