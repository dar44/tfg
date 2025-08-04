// src/components/dashboard/AdminDashboard.tsx
import Link from 'next/link';
import { createServerClient } from '@/lib/server';

const AdminDashboard = async () => {
  const supabase = createServerClient();

  // Obtener estadísticas rápidas
  const { count: recintosCount } = await supabase
    .from('recintos')
    .select('*', { count: 'exact', head: true });
  
  const { count: cursosCount } = await supabase
    .from('cursos')
    .select('*', { count: 'exact', head: true });
  
  const { count: reservasCount } = await supabase
    .from('reservas')
    .select('*', { count: 'exact', head: true });
  
  const { count: usersCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  const cards = [
    {
      title: "Recintos",
      value: recintosCount || 0,
      description: "Recintos disponibles",
      link: "/admin/recintos",
      button: "Gestionar Recintos"
    },
    {
      title: "Cursos",
      value: cursosCount || 0,
      description: "Cursos activos",
      link: "/admin/cursos",
      button: "Gestionar Cursos"
    },
    {
      title: "Reservas",
      value: reservasCount || 0,
      description: "Reservas realizadas",
      link: "/admin/reservas",
      button: "Ver Reservas"
    },
    {
      title: "Usuarios",
      value: usersCount || 0,
      description: "Usuarios registrados",
      link: "/admin/usuarios",
      button: "Gestionar Usuarios"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-3xl font-bold mb-2">{card.value}</p>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <Link href={card.link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              {card.button}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;