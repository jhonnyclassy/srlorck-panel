// Forzando redeploy con comentario

import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clienteId, monto } = req.body;

    const { error: updateError } = await supabase
      .from('clientes')
      .update({ saldo: supabase.raw(`saldo + ${monto}`) })
      .eq('id', clienteId);

    const { error: insertError } = await supabase
      .from('historial_recargas')
      .insert([{ cliente_id: clienteId, monto }]);

    if (updateError || insertError) {
      return res.status(400).json({ error: updateError?.message || insertError?.message });
    }

    return res.status(200).json({ message: 'Saldo recargado con éxito' });
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
