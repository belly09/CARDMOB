import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter';
import Photo from './components/Photo';

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url); //Por padrão executa uma request do tipo GET
      // console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        const updatedPhotos = data.map( (photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }));
        setPhotos(updatedPhotos);
      }

    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Counter  title="Contando..."/>
      <Counter initial="100" />
      <article>
        <h1>Album da API</h1>
        {photos.map( (photo) => (
          // <article key={photo.id}>
          //   <h2>ID #{photo.id} {photo.title}</h2>
          //   <img src={photo.thumbnailUrl} alt={photo.title} />
          // </article>
          <Photo photo={photo}/>
        ) )}
      </article>
    </>
  )
}

export default App;
