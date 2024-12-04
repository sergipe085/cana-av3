type Cidade = {
    nome: string;
    x: number;
    y: number;
  };
  
  // Calcula a distância Euclidiana entre duas cidades
  function calcularDistancia(cidade1: Cidade, cidade2: Cidade): number {
    const dx = cidade2.x - cidade1.x;
    const dy = cidade2.y - cidade1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Gera todas as permutações possíveis de um array
  function gerarPermutacoes<T>(array: T[]): T[][] {
    if (array.length === 1) return [array];
    const permutacoes: T[][] = [];
  
    for (let i = 0; i < array.length; i++) {
      const resto = [...array.slice(0, i), ...array.slice(i + 1)];
      for (const permutacao of gerarPermutacoes(resto)) {
        permutacoes.push([array[i], ...permutacao]);
      }
    }
  
    return permutacoes;
  }
  
  // Resolve o problema do caixeiro-viajante
  function resolverPCV(cidades: Cidade[]): { rota: Cidade[]; distancia: number } {
    const permutacoes = gerarPermutacoes(cidades);
    let menorDistancia = Infinity;
    let melhorRota: Cidade[] = [];
  
    for (const rota of permutacoes) {
      let distanciaAtual = 0;
  
      // Calcula a distância total da rota
      for (let i = 0; i < rota.length - 1; i++) {
        distanciaAtual += calcularDistancia(rota[i], rota[i + 1]);
      }
  
      // Retorna à cidade de origem
      distanciaAtual += calcularDistancia(rota[rota.length - 1], rota[0]);
  
      if (distanciaAtual < menorDistancia) {
        menorDistancia = distanciaAtual;
        melhorRota = rota;
      }
    }
  
    return { rota: melhorRota, distancia: menorDistancia };
  }
  
  // Exemplo de uso:
  const cidades: Cidade[] = [
    { nome: "Cidade A", x: 0, y: 0 },
    { nome: "Cidade B", x: 2, y: 3 },
    { nome: "Cidade C", x: 5, y: 4 },
    { nome: "Cidade D", x: 7, y: 1 },
    { nome: "Cidade E", x: 8, y: 6 },
    { nome: "Cidade F", x: 4, y: 8 },
    { nome: "Cidade G", x: 1, y: 7 },
    { nome: "Cidade H", x: 3, y: 5 },
    { nome: "Cidade I", x: 6, y: 2 },
    { nome: "Cidade J", x: 9, y: 9 },
  ];
  
  const resultadoFinal = resolverPCV(cidades);
  console.log("Melhor rota:", resultadoFinal.rota.map(cidade => cidade.nome).join(" -> "));
  console.log("Distância total:", resultadoFinal.distancia.toFixed(2));
  
  // Chamada da função de exibição
  exibirDetalhes(resultadoFinal);

  function exibirDetalhes(resultado: { rota: Cidade[]; distancia: number }) {
    console.log("Cadeia de cidades:");
    for (let i = 0; i < resultado.rota.length; i++) {
      const cidadeAtual = resultado.rota[i];
      const proximaCidade = resultado.rota[(i + 1) % resultado.rota.length];
      const distancia = calcularDistancia(cidadeAtual, proximaCidade).toFixed(2);
      console.log(`${cidadeAtual.nome} -> ${proximaCidade.nome}: ${distancia} km`);
    }
    console.log("Distância total:", resultado.distancia.toFixed(2), "km");
  }
  
  // Chamada da função de exibição:
  exibirDetalhes(resultadoFinal);