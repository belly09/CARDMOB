import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  const updateCount = () => {
    return count + 1;
  };

  const updateCount1 = () =>  count + 1;
  
  const dados = {
    "nome": "fulano",
    // "atualiza": (novo_nome) => $`Novo nome é ${novo_nome}`,
    "endereco": {
      "rua": "xyz",
      "numero": "111",
      "complementos": ["casa", "na esquina do supermercado ABC"]
    }
  };
  // dados.atualiza("gerson")
  dados.endereco.complementos[1] // acessando a referência do endereço

  return (
    <>
      <Counter  title="Contando..."/>
      <Counter initial="100" />
      
    </>
  )
}

export default App
