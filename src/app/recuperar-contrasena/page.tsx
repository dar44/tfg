// src/app/recuperar-contrasena/page.tsx
'use client'

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecuperar = async () => {
    if (!email) {
      setMensaje('Por favor ingresa tu correo electrónico');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/actualizar-contrasena`,
      });

      if (error) {
        setMensaje(error.message);
      } else {
        setMensaje(`Se ha enviado un enlace de recuperación a ${email}`);
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
      <h1 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h1>
      
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

        <button
          onClick={handleRecuperar}
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
              Enviando...
            </>
          ) : (
            'Enviar Enlace de Recuperación'
          )}
        </button>

        {mensaje && (
          <div className={`mt-4 p-3 rounded-md ${
            mensaje.includes('enviado') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {mensaje}
          </div>
        )}

        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}