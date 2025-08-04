// src/app/citizen/recintos/page.tsx
import RecintosList from '@/components/citizen/RecintosList';
import { createServerClient } from '@/lib/server';
import { redirect } from 'next/navigation';

export default async function RecintosPage() {
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
    
  if (!profile || profile.role !== 'citizen') redirect('/dashboard');

  return <RecintosList />;
}