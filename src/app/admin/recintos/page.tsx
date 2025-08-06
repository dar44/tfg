// src/app/admin/recintos/page.tsx
import RecintosTable from '@/components/admin/RecintosTable';
import { createServerClient } from '@/lib/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function RecintosAdminPage() {
  const supabase = createServerClient();

  // Verificar sesión y rol
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: profile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Recintos</h1>
        <Link 
          href="/admin/recintos/nuevo" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Añadir Recinto
        </Link>
      </div>
      <RecintosTable />
    </div>
  );
}