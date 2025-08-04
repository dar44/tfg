// src/app/login/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      setMensaje('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMensaje(error.message);
      } else {
        setMensaje('¡Inicio de sesión exitoso! Redirigiendo...');
        // Redirigir al dashboard después de 1 segundo
        setTimeout(() => router.push('/dashboard'), 1000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMensaje('Error inesperado: ' + error.message);
      } else {
        setMensaje('Error inesperado');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {mensaje && (
          <div className={`mt-4 p-3 rounded-md ${
            mensaje.includes('éxito') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {mensaje}
          </div>
        )}

        <div className="text-center mt-4">
          <Link href="/recuperar-contrasena" className="text-sm text-blue-600 hover:text-blue-500">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
          <Link href="/register" className="text-sm text-blue-600 hover:text-blue-500">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}