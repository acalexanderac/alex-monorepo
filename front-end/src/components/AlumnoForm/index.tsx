'use client'

import { FormEvent, useState, useEffect } from 'react';

interface AlumnoFormProps {
  onSubmit: (data: AlumnoFormData) => void;
  initialData?: AlumnoFormData;
}

interface AlumnoFormData {
  nombreAlumno: string;
  fechaNacimiento: string;
  nombrePadre: string;
  nombreMadre: string;
  grado: number;
  seccion: string;
}

export default function AlumnoForm({ onSubmit, initialData }: AlumnoFormProps) {
  const [formData, setFormData] = useState<AlumnoFormData>({
    nombreAlumno: '',
    fechaNacimiento: '',
    nombrePadre: '',
    nombreMadre: '',
    grado: 1,
    seccion: ''
  });

  useEffect(() => {
    if (initialData) {
      // Formatear la fecha para el input date
      const fechaFormateada = initialData.fechaNacimiento.split('T')[0];
      setFormData({
        ...initialData,
        fechaNacimiento: fechaFormateada
      });
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <div>
        <label htmlFor="nombreAlumno" className="block text-base font-semibold text-slate-900 mb-2">
          Nombre del Alumno
        </label>
        <input
          type="text"
          id="nombreAlumno"
          value={formData.nombreAlumno}
          onChange={(e) => setFormData({ ...formData, nombreAlumno: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
          placeholder="Ingrese el nombre completo"
          required
        />
      </div>

      <div>
        <label htmlFor="fechaNacimiento" className="block text-base font-semibold text-slate-900 mb-2">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          id="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="nombrePadre" className="block text-base font-semibold text-slate-900 mb-2">
            Nombre del Padre
          </label>
          <input
            type="text"
            id="nombrePadre"
            value={formData.nombrePadre}
            onChange={(e) => setFormData({ ...formData, nombrePadre: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            placeholder="Ingrese el nombre del padre"
            required
          />
        </div>

        <div>
          <label htmlFor="nombreMadre" className="block text-base font-semibold text-slate-900 mb-2">
            Nombre de la Madre
          </label>
          <input
            type="text"
            id="nombreMadre"
            value={formData.nombreMadre}
            onChange={(e) => setFormData({ ...formData, nombreMadre: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            placeholder="Ingrese el nombre de la madre"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="grado" className="block text-base font-semibold text-slate-900 mb-2">
            Grado
          </label>
          <select
            id="grado"
            value={formData.grado}
            onChange={(e) => setFormData({ ...formData, grado: Number(e.target.value) })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            required
          >
            {[1, 2, 3, 4, 5, 6].map((grado) => (
              <option key={grado} value={grado}>
                {grado}º Grado
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="seccion" className="block text-base font-semibold text-slate-900 mb-2">
            Sección
          </label>
          <input
            type="text"
            id="seccion"
            value={formData.seccion}
            onChange={(e) => setFormData({ ...formData, seccion: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-900"
            placeholder="Ejemplo: A"
            required
          />
        </div>
      </div>

      <div className="pt-6">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all font-semibold shadow-lg shadow-blue-200"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </form>
  );
} 