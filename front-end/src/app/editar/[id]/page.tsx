'use client'

import AlumnoForm from '@/components/AlumnoForm';
import Layout from '@/components/Layout';
import { useRouter, useParams } from 'next/navigation';
import { alumnosService } from '@/services/alumnosService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Alumno {
  _id?: string;
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: number;
  seccion: string;
}

export default function EditarAlumno() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAlumno = async () => {
      try {
        const alumnoData = await alumnosService.consultarPorId(id);
        if (alumnoData) {
          setAlumno(alumnoData);
        } else {
          alert('No se encontró el alumno');
          router.push('/');
        }
      } catch (error) {
        console.error('Error al cargar alumno:', error);
        alert('Error al cargar los datos del alumno');
      } finally {
        setLoading(false);
      }
    };

    cargarAlumno();
  }, [id, router]);

  const handleSubmit = async (data: Alumno) => {
    try {
      await alumnosService.actualizar(id, data);
      router.push('/');
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      alert('Error al actualizar alumno');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl">Cargando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Editar Alumno</h1>
        <Link 
          href="/"
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Volver
        </Link>
      </div>
      {alumno && <AlumnoForm onSubmit={handleSubmit} initialData={alumno} />}
    </Layout>
  );
} 