'use client'

import Link from 'next/link';

interface Alumno {
  _id?: string;
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: number;
  seccion: string;
  fechaIngreso?: string;
}

interface AlumnoListProps {
  alumnos: Alumno[];
  onDelete?: (id: string) => void;
}

export default function AlumnoList({ alumnos, onDelete }: AlumnoListProps) {
  return (
    <div className="mt-8">
      <div className="overflow-hidden rounded-xl shadow-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Estudiante</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Grado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Sección</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Padres</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {alumnos.map((alumno) => (
              <tr key={alumno._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-slate-900 font-medium">{alumno.nombreAlumno}</div>
                  <div className="text-blue-600 text-sm">{new Date(alumno.fechaNacimiento).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {alumno.grado}º Grado
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-900">{alumno.seccion}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900">{alumno.nombrePadre}</div>
                  <div className="text-slate-600">{alumno.nombreMadre}</div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link 
                    href={`/editar/${alumno._id}`}
                    className="inline-flex items-center px-3 py-2 border border-blue-600 text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors"
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => onDelete && alumno._id && onDelete(alumno._id)}
                    className="inline-flex items-center px-3 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 