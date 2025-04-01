// Contato.js
import React from 'react';

const Contato2 = ({ nome, telefone, onDelete }) => {
  return (
    <div className="contato">
      <h3>Informações de Contato</h3>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Telefone:</strong> {telefone}</p>
      <button onClick={onDelete}>Deletar</button>
    </div>
  );
};

export default Contato2;
