'use client'

import { useState, useEffect } from 'react';
import AlumnoList from '@/components/AlumnoList';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';
import { alumnosService, type Alumno } from '@/services/alumnosService';
import Link from 'next/link';
import { FiPlus, FiUsers } from 'react-icons/fi';

export default function Home() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumnos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await alumnosService.obtenerTodos(Number(page), 10);
      setAlumnos(response.data.data);
      setMeta(response.data.meta);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchAlumnos(newPage);
  };

  const handleDelete = async (id: string) => {
    try {
      await alumnosService.eliminar(id);
      fetchAlumnos(meta.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el alumno');
    }
  };

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <FiUsers className="mr-3" size={24} />
                Lista de Alumnos
              </h1>
              <p className="text-gray-600">
                Sistema de Gestión Escolar - Administra la información de tus estudiantes
              </p>
            </div>
            <Link
              href="/crear-alumno"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FiPlus className="mr-2" />
              Nuevo Estudiante
            </Link>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        ) : (
          <AlumnoList
            alumnos={alumnos}
            meta={meta}
            onPageChange={handlePageChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </ErrorBoundary>
  );
} 