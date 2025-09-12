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
    };
  };

  const [enquete, setEnquete] = useState(carregarDadosIniciais());

  // Salvar no localStorage sempre que houver mudanças
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

  // Função para obter a cor baseada no índice da opção
  const getCorEquipe = (index) => {
    const cores = {
      0: { primaria: '#4CAF50', hover: '#45a049', claro: 'rgba(76, 175, 80, 0.2)' }, // Verde
      1: { primaria: '#FFEB3B', hover: '#FFD600', claro: 'rgba(255, 235, 59, 0.2)' }, // Amarela
      2: { primaria: '#F44336', hover: '#D32F2F', claro: 'rgba(244, 67, 54, 0.2)' }, // Vermelha
      3: { primaria: '#2196F3', hover: '#1976D2', claro: 'rgba(33, 150, 243, 0.2)' }  // Azul
    };
    return cores[index] || { primaria: '#ddd', hover: '#ccc', claro: 'rgba(0,0,0,0.1)' };
  };

  return (
    <div className="enquete">
      <h1>{enquete.pergunta}</h1>
      <div className="opcoes">
        {enquete.opcoes.map((opcao, i) => {
          const cor = getCorEquipe(i);
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
                style={{
                  backgroundColor: cor.primaria,
                  borderColor: cor.primaria
                }}
              >
                ←
              </button>
              
              <div
                className="opcao"
                onClick={() => votar(i)}
                style={{
                  borderColor: cor.primaria,
                  '--cor-hover': cor.hover,
                  '--cor-claro': cor.claro
                } as React.CSSProperties}
              >
                <span>{opcao}</span>
                <div 
                  className="barra-de-porcentagem" 
                  style={{ 
                    width: percentual + '%',
                    backgroundColor: cor.claro
                  }}
                ></div>
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
