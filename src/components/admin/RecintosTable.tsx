// src/components/admin/RecintosTable.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function RecintosTable() {
  const [recintos, setRecintos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecintos = async () => {
      const { data, error } = await supabase
        .from('recintos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error obteniendo recintos:', error);
      } else {
        setRecintos(data || []);
      }
      setLoading(false);
    };

    fetchRecintos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este recinto?')) return;
    
    const { error } = await supabase
      .from('recintos')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error eliminando recinto:', error);
      alert('Error al eliminar el recinto');
    } else {
      setRecintos(recintos.filter(recinto => recinto.id !== id));
    }
  };

  if (loading) return <div className="text-center py-8">Cargando recintos...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Ubicación</th>
            <th className="py-2 px-4 border-b">Provincia</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recintos.map((recinto) => (
            <tr key={recinto.id}>
              <td className="py-2 px-4 border-b">{recinto.id}</td>
              <td className="py-2 px-4 border-b">{recinto.name}</td>
              <td className="py-2 px-4 border-b">{recinto.ubication}</td>
              <td className="py-2 px-4 border-b">{recinto.province}</td>
              <td className="py-2 px-4 border-b">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  recinto.state === 'available' ? 'bg-green-200 text-green-800' :
                  recinto.state === 'unavailable' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {recinto.state}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                <Link 
                  href={`/admin/recintos/${recinto.id}`} 
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Editar
                </Link>
                <button 
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(recinto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}