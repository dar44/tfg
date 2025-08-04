import { createServerClient } from '@/lib/server';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default async function AdminPage() {
  const supabase = createServerClient();
  
  // Verificar sesión
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  // Verificar rol
  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (profile?.role !== 'admin') redirect('/dashboard');

  return <AdminDashboard />;
}