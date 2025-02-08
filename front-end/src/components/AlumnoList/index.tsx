'use client'

import React from 'react';
import { Alumno } from '@/services/alumnosService';
import Pagination from '../Pagination';
import Link from 'next/link';
import { FiEdit2, FiTrash2, FiUser, FiCalendar, FiUsers } from 'react-icons/fi';

interface AlumnoListProps {
  alumnos: Alumno[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onDelete?: (id: string) => Promise<void>;
}

const AlumnoList: React.FC<AlumnoListProps> = ({ alumnos, meta, onPageChange, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {alumnos.map((alumno) => (
          <div key={alumno._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                    <FiUser className="mr-2" />
                    {alumno.nombreAlumno}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Grado:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {alumno.grado}°
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">Sección:</span>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                        {alumno.seccion}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-2" />
                      <span className="font-semibold mr-2">Padre:</span>
                      {alumno.nombrePadre}
                    </div>
                    <div className="flex items-center">
                      <FiUsers className="mr-2" />
                      <span className="font-semibold mr-2">Madre:</span>
                      {alumno.nombreMadre}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      <span className="font-semibold mr-2">Nacimiento:</span>
                      {new Date(alumno.fechaNacimiento).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2" />
                      <span className="font-semibold mr-2">Ingreso:</span>
                      {new Date(alumno.fechaIngreso).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-4 border-t pt-4">
                <Link 
                  href={`/editar/${alumno._id}`}
                  className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                >
                  <FiEdit2 className="mr-2" />
                  Editar
                </Link>
                {onDelete && (
                  <button
                    onClick={() => onDelete(alumno._id)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <FiTrash2 className="mr-2" />
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        onPageChange={onPageChange}
        className="mt-8"
      />
    </div>
  );
};

export default AlumnoList; 