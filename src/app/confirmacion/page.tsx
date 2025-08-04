
export default function ConfirmacionPage() {
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">¡Registro casi completo!</h1>
      <p className="mb-4">
        Te hemos enviado un enlace de confirmación a tu correo electrónico.
        Por favor haz clic en ese enlace para activar tu cuenta.
      </p>
      <p>¿No recibiste el correo? <a href="/reenvio" className="text-blue-600">Reenviar confirmación</a></p>
    </div>
  )
}