// ListaContatos.js
import React, { useState } from 'react';
import Produto from './ProductCard';

const ListaProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingNome, setEditingNome] = useState('');
  const [editingPreco, setEditingPreco] = useState('');

  const adicionarProduto = () => {
    if (nome.trim() && preco.trim()) {
      const novoProduto = { id: Date.now(), nome, preco };
      setProdutos([...produtos, novoProduto]);
      setNome('');
      setPreco('');
    }
  };

  const startEditing = (id, nome, preco) => {
    setEditingId(id);
    setEditingNome(nome);
    setEditingPreco(preco);
  };

  const saveEdit = () => {
    setProdutos(
      produtos.map((produto) =>
        contato.id === editingId
          ? { ...produto, nome: editingNome, preco: editingPreco }
          : produto
      )
    );
    setEditingId(null);
    setEditingNome('');
    setEditingPreco('');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingNome('');
    setEditingPreco('');
  };

  const deletarProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", listStyle: "none", padding: 0}}>

      <h2>Lista de Produtos</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preço (R$)"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <button onClick={adicionarProduto}>Adicionar ao Carrinho</button>

      <div className='produtos'>
        {produtos.map((produto) => (
          <div key={produto.id}>
            {editingId === produto.id ? (
              <div>
                <input
                  type="text"
                  value={editingNome}
                  onChange={(e) => setEditingNome(e.target.value)}
                />
                <input
                  type="text"
                  value={editingPreco}
                  onChange={(e) => setEditingPreco(e.target.value)}
                />
                <button onClick={saveEdit}>Salvar</button>
                <button onClick={cancelEditing}>Cancelar</button>
              </div>
            ) : (
              <div>
                <p>Nome: {produto.nome}</p>
                <p>Preço: {produto.preco}</p>
                <button onClick={() => startEditing(produto.id, produto.nome, produto.preco)}>Editar</button>
                <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProduto;