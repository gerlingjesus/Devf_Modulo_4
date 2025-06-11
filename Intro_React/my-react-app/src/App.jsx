import { useState, useEffect}  from 'react'
//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//https://dogapi.dog/api/v2/breeds
//https://api.thedogapi.com/v1/breeds

// componente padre funcional
function App() {
  //Aquí va la logica de programación, javascript

  //Paso #1. Utilizar Hook useState
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Paso #2 useEfect, carga de datos desde un API
  useEffect(()=>{
    //Funcion asincrona para obtener datos de la API
    //Se van a implementar promesas
    const getDogs = async () => {
      try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds');
        if(!response.ok){
          throw new Error(`Error: ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        setDogs(data);

        //ver datos en consola 
        console.log(data);

      } catch (error) {

        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    getDogs();
  },[]);

   // Renderizado condicional basado en el estado de la aplicación.
   if(loading) { return <p>Loading...</p>}
   if(error) { return <p>Error: {error.message}</p>}
  


  return (
    //Adentro de return va toda la estructura HTML
    // Estructura HTML de la aplicación.
    // Utiliza fragmentos <> para agrupar elementos sin añadir nodos adicionales al DOM.
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Esto esta funcionando... </h1>

      <div className="card-container">
        {dogs.map((race) => (
          <div key={race.id} className="dogs-card">
            <h2>{race.name}</h2>
          <p><strong>Temperament:</strong> {race.temperament ?? "Not Specified"}</p>
          <p><strong>Origin:</strong> {race.origin ?? "Not Specified"}</p>
          </div>
        ))}
        </div>
     
    </>
  )
}

export default App
