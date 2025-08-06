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
  const { data: profile, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (error || !profile || profile.role !== 'citizen') redirect('/dashboard');

  return <RecintosList />;
}