// src/app/admin/recintos/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function EditarRecinto() {
  const router = useRouter();
  const params = useParams();
  const recintoId = params.id;
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ubication: '',
    province: '',
    postal_code: '',
    state: 'available',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchRecinto = async () => {
      const { data, error } = await supabase
        .from('recintos')
        .select('*')
        .eq('id', recintoId)
        .single();
      
      if (error) {
        console.error('Error obteniendo recinto:', error);
      } else if (data) {
        setFormData(data);
      }
      setLoading(false);
    };

    fetchRecinto();
  }, [recintoId]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('recintos')
      .update(formData)
      .eq('id', recintoId);

    setSaving(false);

    if (error) {
      alert('Error al actualizar el recinto: ' + error.message);
    } else {
      router.push('/admin/recintos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Recinto</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        {/* Mismos campos que en NuevoRecinto */}
        {/* ... */}
        
        <div>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {saving ? 'Guardando...' : 'Actualizar Recinto'}
          </button>
        </div>
      </form>
    </div>
  );
}