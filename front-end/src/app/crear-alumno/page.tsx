'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { alumnosService, type AlumnoBase } from '@/services/alumnosService';
import AlumnoForm from '@/components/AlumnoForm';
import { FiUserPlus } from 'react-icons/fi';

export default function CrearAlumno() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: AlumnoBase) => {
    try {
      await alumnosService.crear(data);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear alumno');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <FiUserPlus className="mr-3" size={24} />
          Nuevo Alumno
        </h1>
        <p className="text-gray-600">
          Ingresa la información del nuevo estudiante
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6">
        <AlumnoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 