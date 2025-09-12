import { useState, useEffect } from 'react'
import './App.css'

function App() {
 
  const carregarDadosIniciais = () => {
    const dadosSalvos = localStorage.getItem('enqueteGincana');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return {
      pergunta: "Quem merece ganhar a gincana?",
      opcoes: ["Verde", "Amarela", "Vermelha", "Azul"],
      votos: [0, 0, 0, 0],
    };
  };

  const [enquete, setEnquete] = useState(carregarDadosIniciais());


  useEffect(() => {
    localStorage.setItem('enqueteGincana', JSON.stringify(enquete));
  }, [enquete]);

  const votar = (index) => {
    const novosVotos = [...enquete.votos];
    novosVotos[index] += 1;

    setEnquete({
      ...enquete,
      votos: novosVotos
    });
  };

  const removerVoto = (index) => {
    if (enquete.votos[index] === 0) {
      return;
    }

    const votosCopia = [...enquete.votos];
    votosCopia[index] -= 1;
    
    setEnquete({
      ...enquete,
      votos: votosCopia
    });
  };

  const totalVotos = enquete.votos.reduce((total, n) => total + n, 0);

  return (
    <div className="enquete">
      <h1>{enquete.pergunta}</h1>
      <div className="opcoes">
        {enquete.opcoes.map((opcao, i) => {
          // Garantir que a porcentagem seja 0 quando não há votos
          const percentual = totalVotos > 0 
            ? ((enquete.votos[i] / totalVotos) * 100).toFixed(1) 
            : 0;

          return (
            <div key={i} className="opcao-container">
              <button 
                className="botao-remover-opcao"
                onClick={(e) => {
                  e.stopPropagation();
                  removerVoto(i);
                }}
                disabled={enquete.votos[i] === 0}
                title={`Remover 1 voto de ${opcao}`}
              >
                ←
              </button>
              
              <div
                className="opcao"
                onClick={() => votar(i)}
              >
                <span>{opcao}</span>
                <div className="barra-de-porcentagem" style={{ width: percentual + '%' }}></div>
                <span className="valor-porcentagem">{percentual}% ({enquete.votos[i]} votos)</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-votos">Total de votos: {totalVotos}</div>
    </div>
  );
}

export default App;
