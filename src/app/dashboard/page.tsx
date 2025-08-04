'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Obtener rol del usuario
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error('Error obteniendo perfil:', error);
        router.push('/login');
        return;
      }

      // Redirigir según el rol
      switch (profile.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'worker':
          router.push('/worker');
          break;
        case 'citizen':
          router.push('/citizen');
          break;
        default:
          router.push('/login');
      }
    };

    fetchUserRole();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-lg">Cargando tu panel de control...</p>
      </div>
    </div>
  );
}