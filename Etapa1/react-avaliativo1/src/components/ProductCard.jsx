import React from 'react';

const Produto = ({ nome, preco, onDelete }) => {
  return (
    <div className="contato">
      <h3>Informações de Contato</h3>
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Preço:</strong> {preco}</p>
      <button onClick={onDelete}>Deletar</button>
    </div>
  );
};

export default Produto;
