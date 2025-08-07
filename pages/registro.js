import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function RegistroCliente() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('clientes')
      .insert([{ nombre, correo }]);

    if (error) {
      setMensaje('❌ Error: ' + error.message);
    } else {
      setMensaje('✅ Cliente registrado con éxito');
      setNombre('');
      setCorreo('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Registro de Cliente</h1>
      <form onSubmit={handleSubmit}>
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
