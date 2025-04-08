import { useState } from 'react'
import ListaProduto from './components/ProductList';

function App() {
    return (
      <div style={{ textAlign: "center", marginLeft: "650px"}}>
        <h1>Gerenciador de Produtos</h1>
        <ListaProduto />
      </div>
    );

}

export default App