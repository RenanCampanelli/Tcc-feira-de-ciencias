import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Carregar dados iniciais do localStorage ou usar padrão
  const carregarDadosIniciais = () => {
    const dadosSalvos = localStorage.getItem('enqueteGincana');
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return {
      pergunta: "Quem merece ganhar a gincana?",
      opcoes: ["Verde", "Amarela", "Vermelha", "Azul"],
      votos: [0, 0, 0, 0],
      opcaoSelecionada: -1
    };
  };

  const [enquete, setEnquete] = useState(carregarDadosIniciais());

  // Salvar no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('enqueteGincana', JSON.stringify(enquete));
  }, [enquete]);

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
          // Garantir que a porcentagem seja 0 quando não há votos
          const percentual = totalVotos > 0 
            ? ((enquete.votos[i] / totalVotos) * 100).toFixed(1) 
            : 0;

          return (
            <div
              key={i}
              className={'opcao ' + (enquete.opcaoSelecionada === i ? 'selecionada' : '')}
              onClick={() => selecionarOpcao(i)}
            >
              <span>{opcao}</span>
              <div className="barra-de-porcentagem" style={{ width: percentual + '%' }}></div>
              <span className="valor-porcentagem">{percentual}%</span>
            </div>
          );
        })}
      </div>
      <div className="total-votos">Total de votos: {totalVotos}</div>
    </div>
  );
}

export default App;
