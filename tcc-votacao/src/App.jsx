import { useState } from 'react'
import './App.css'

function App() {
  const [enquete, setEnquete] = useState({
    pergunta: "Quem merece ganhar a gincana?",
    opcoes: ["Verde", "Amarela", "Vermelha", "Azul"],
    votos: [1, 1, 1, 1],
    opcaoSelecionada: -1
  });

  const selecionarOpcao = (index) => {
    if (enquete.opcaoSelecionada === -1) {
      const novosVotos = [...enquete.votos];
      novosVotos[index] += 1;

      setEnquete({
        ...enquete,
        votos: novosVotos,
        opcaoSelecionada: index
      });
    }
  };

  const totalVotos = enquete.votos.reduce((total, n) => total + n, 0);

  return (
    <div className="enquete">
      <h1>{enquete.pergunta}</h1>
      <div className="opcoes">
        {enquete.opcoes.map((opcao, i) => {
          const percentual = ((enquete.votos[i] / totalVotos) * 100).toFixed(1);

          return (
            <div
              key={i}
              className={`opcao ${enquete.opcaoSelecionada === i ? 'selecionada' : ''}`}
              onClick={() => selecionarOpcao(i)}
            >
              <span>{opcao}</span>
              <div className="barra-de-porcentagem" style={{ width: `${percentual}%` }}></div>
              <span className="valor-porcentagem">{percentual}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;