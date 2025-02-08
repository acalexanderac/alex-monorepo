'use client'

import { useForm } from 'react-hook-form';
import { AlumnoBase } from '@/services/alumnosService';
import { useState, useEffect } from 'react';

interface AlumnoFormProps {
  initialData?: AlumnoBase;
  onSubmit: (data: AlumnoBase) => Promise<void>;
}

export default function AlumnoForm({ initialData, onSubmit }: AlumnoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AlumnoBase>({
    defaultValues: {
      nombreAlumno: '',
      fechaNacimiento: '',
      nombrePadre: '',
      nombreMadre: '',
      grado: 1,
      seccion: 'A',
      ...initialData
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: AlumnoBase) => {
    try {
      setIsSubmitting(true);
      const formData = {
        ...data,
        grado: Number(data.grado)
      };
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Nombre del Alumno *
          </label>
          <input
            type="text"
            {...register('nombreAlumno', { 
              required: 'El nombre es requerido',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          />
          {errors.nombreAlumno && (
            <p className="text-sm text-red-600">{errors.nombreAlumno.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Fecha de Nacimiento *
          </label>
          <input
            type="date"
            {...register('fechaNacimiento', { required: 'La fecha es requerida' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          />
          {errors.fechaNacimiento && (
            <p className="text-sm text-red-600">{errors.fechaNacimiento.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Nombre del Padre *
          </label>
          <input
            type="text"
            {...register('nombrePadre', { required: 'El nombre del padre es requerido' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          />
          {errors.nombrePadre && (
            <p className="text-sm text-red-600">{errors.nombrePadre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Nombre de la Madre *
          </label>
          <input
            type="text"
            {...register('nombreMadre', { required: 'El nombre de la madre es requerido' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          />
          {errors.nombreMadre && (
            <p className="text-sm text-red-600">{errors.nombreMadre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Grado *
          </label>
          <select
            {...register('grado', { 
              required: 'El grado es requerido',
              min: { value: 1, message: 'El grado debe ser entre 1 y 6' },
              max: { value: 6, message: 'El grado debe ser entre 1 y 6' },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num}º Grado</option>
            ))}
          </select>
          {errors.grado && (
            <p className="text-sm text-red-600">{errors.grado.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Sección *
          </label>
          <select
            {...register('seccion', { required: 'La sección es requerida' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            disabled={isSubmitting}
          >
            {['A', 'B', 'C'].map(sec => (
              <option key={sec} value={sec}>Sección {sec}</option>
            ))}
          </select>
          {errors.seccion && (
            <p className="text-sm text-red-600">{errors.seccion.message}</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
        </button>
      </div>
    </form>
  );
} 