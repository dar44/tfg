// src/components/citizen/RecintosList.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function RecintosList() {
  const [recintos, setRecintos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [provinceFilter, setProvinceFilter] = useState('');

  useEffect(() => {
    const fetchRecintos = async () => {
      let query = supabase
        .from('recintos')
        .select('*')
        .eq('state', 'available');
      
      if (provinceFilter) {
        query = query.ilike('province', `%${provinceFilter}%`);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error obteniendo recintos:', error);
      } else {
        setRecintos(data || []);
      }
      setLoading(false);
    };

    fetchRecintos();
  }, [provinceFilter]);

  if (loading) return <div className="text-center py-8">Cargando recintos...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recintos Disponibles</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por provincia
        </label>
        <input
          type="text"
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          placeholder="Escribe una provincia..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recintos.map((recinto) => (
          <div key={recinto.id} className="border rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recinto.name}</h2>
              <p className="text-gray-600 mb-3">{recinto.description}</p>
              
              <div className="mb-3">
                <p className="font-semibold">Ubicación:</p>
                <p>{recinto.ubication}</p>
                <p>{recinto.province}, {recinto.postal_code}</p>
              </div>
              
              <Link 
                href={`/citizen/recintos/${recinto.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
              >
                Ver detalles y reservar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}