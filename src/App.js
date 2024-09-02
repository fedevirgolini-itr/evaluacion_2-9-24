import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [term, setTerm] = useState("")
  const [advicebyTerm, setAdviceByTerm] = useState([])
  const [advice, setAdvice] = useState([]);
  const handleTermChange = (event) => setTerm(event.target.value);

  useEffect(()=>{
    getAdvice()
  },[])
 
    const getAdvice= () => {
      fetch(`https://api.adviceslip.com/advice`)
      .then((response) => {
        if(!response.ok){
          throw new Error("Error:")
        }
          else{
            return response.json()
          }
      }) //if(!response.ok){throw new Error("Error:")}else{response.json()}
      .then((data) => {console.log(data.slip.advice)
        setAdvice(data.slip.advice)
      })
      .catch(error => console.error(error))
    }

    const getAdvicebyTerm = () => {
      fetch(`https://api.adviceslip.com/advice/search/${term}`)
      .then((response) => {
        if(!response.ok){
          throw new Error("Error:")
        }
          else{
            return response.json()
          }
      }) //if(!response.ok){throw new Error("Error:")}else{response.json()}
      .then((data) => {
        console.log(data.slips[0].advice)
        setAdviceByTerm(data.slips[0].advice)
      })
      .catch(error => console.error(error))
    }
    

  return (
    <main>

      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>

      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={()=>getAdvice()}>Obtener</button>
        <p className="result-box">{advice}</p>
      </div>

      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" onChange={handleTermChange} />
        <button onClick={()=>getAdvicebyTerm()}>Enviar</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box">{advicebyTerm}</p>
      </div>

    </main>
  );
}

export default App;
