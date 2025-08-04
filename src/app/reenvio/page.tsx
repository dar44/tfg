
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ReenvioPage() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleReenviar = async () => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (error) setMensaje(error.message)
    else setMensaje(`Se ha reenviado el enlace de confirmación a ${email}`)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reenviar confirmación</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <button 
        onClick={handleReenviar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Reenviar enlace
      </button>
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  )
}