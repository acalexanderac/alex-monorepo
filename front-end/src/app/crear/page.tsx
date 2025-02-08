'use client'

import AlumnoForm from '@/components/AlumnoForm';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import { alumnosService } from '@/services/alumnosService';

export default function CrearAlumno() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await alumnosService.crear(data);
      router.push('/');
    } catch (error) {
      console.error('Error al crear alumno:', error);
      alert('Error al crear alumno');
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Alumno</h1>
      </div>
      <AlumnoForm onSubmit={handleSubmit} />
    </Layout>
  );
} 