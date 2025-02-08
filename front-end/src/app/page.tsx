'use client'

import AlumnoList from '@/components/AlumnoList';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { alumnosService, Alumno } from '@/services/alumnosService';

export default function Home() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarAlumnos = async () => {
    try {
      const data = await alumnosService.obtenerTodos();
      setAlumnos(data);
    } catch (err) {
      setError('Error al cargar los alumnos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await alumnosService.eliminar(id);
      setAlumnos(alumnos.filter(alumno => alumno._id !== id));
    } catch (err) {
      setError('Error al eliminar el alumno');
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Sistema de Gestión Escolar
          </h1>
          <p className="mt-2 text-slate-600">
            Administra la información de tus estudiantes de manera eficiente
          </p>
        </div>
        <Link 
          href="/crear" 
          className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nuevo Estudiante
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-slate-600">Cargando estudiantes...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      ) : (
        <AlumnoList alumnos={alumnos} onDelete={handleDelete} />
      )}
    </Layout>
  );
} 