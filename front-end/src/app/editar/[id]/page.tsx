'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { alumnosService, type Alumno, type AlumnoBase } from '@/services/alumnosService';
import AlumnoForm from '@/components/AlumnoForm';
import Loading from '@/components/Loading';
import { FiEdit2 } from 'react-icons/fi';

export default function EditarAlumno() {
  const router = useRouter();
  const params = useParams();
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarAlumno = async () => {
      try {
        const response = await alumnosService.consultarPorId(params.id as string);
        setAlumno(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar alumno');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      cargarAlumno();
    }
  }, [params.id]);

  const handleSubmit = async (data: AlumnoBase) => {
    try {
      await alumnosService.actualizar(params.id as string, data);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar alumno');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!alumno) return <div>No se encontró el alumno</div>;

  const alumnoBase: AlumnoBase = {
    nombreAlumno: alumno.nombreAlumno,
    fechaNacimiento: alumno.fechaNacimiento,
    nombrePadre: alumno.nombrePadre,
    nombreMadre: alumno.nombreMadre,
    grado: alumno.grado,
    seccion: alumno.seccion
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2 flex items-center">
          <FiEdit2 className="mr-3" size={24} />
          Editar Alumno
        </h1>
        <p className="text-black">
          Actualiza la información del estudiante
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : !alumno ? (
        <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg">
          No se encontró el alumno
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <AlumnoForm 
            initialData={alumnoBase}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
} 