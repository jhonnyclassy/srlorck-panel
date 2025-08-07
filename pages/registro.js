import { useState } from 'react';

export default function RegistroCliente() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo }),
    });

    const data = await res.json();
    setMensaje(data.mensaje || data.error);
  };

  return (
    <div>
      <h1>Registro de Cliente</h1>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
