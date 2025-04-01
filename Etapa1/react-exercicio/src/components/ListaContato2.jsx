// ListaContatos.js
import React, { useState } from 'react';
import Contato2 from './Contato2';

const ListaContato2 = () => {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingNome, setEditingNome] = useState('');
  const [editingTelefone, setEditingTelefone] = useState('');

  const adicionarContato = () => {
    if (nome.trim() && telefone.trim()) {
      const novoContato = { id: Date.now(), nome, telefone };
      setContatos([...contatos, novoContato]);
      setNome('');
      setTelefone('');
    }
  };

  const startEditing = (id, nome, telefone) => {
    setEditingId(id);
    setEditingNome(nome);
    setEditingTelefone(telefone);
  };

  const saveEdit = () => {
    setContatos(
      contatos.map((contato) =>
        contato.id === editingId
          ? { ...contato, nome: editingNome, telefone: editingTelefone }
          : contato
      )
    );
    setEditingId(null);
    setEditingNome('');
    setEditingTelefone('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingNome('');
    setEditingTelefone('');
  };

  const deletarContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px"}}>

      <h2>Lista de Contatos</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <button onClick={adicionarContato}>Adicionar Contato</button>

      <div>
        {contatos.map((contato) => (
          <div key={contato.id}>
            {editingId === contato.id ? (
              <div>
                <input
                  type="text"
                  value={editingNome}
                  onChange={(e) => setEditingNome(e.target.value)}
                />
                <input
                  type="text"
                  value={editingTelefone}
                  onChange={(e) => setEditingTelefone(e.target.value)}
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEditing}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p>Nome: {contato.nome}</p>
                <p>Telefone: {contato.telefone}</p>
                <button onClick={() => startEditing(contato.id, contato.nome, contato.telefone)}>Editar</button>
                <button onClick={() => deletarContato(contato.id)}>Excluir</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaContato2;