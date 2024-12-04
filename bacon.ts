import fs from 'fs';

type Filme = {
  id: string;
  titulo: string;
  elenco: string[]; 
};

type Grafo = Map<string, { vizinhos: Map<string, string[]> }>; 


function construirGrafo(filmes: Filme[]): Grafo {
  const grafo: Grafo = new Map();

  for (const filme of filmes) {
    for (const ator of filme.elenco) {
      if (!grafo.has(ator)) grafo.set(ator, { vizinhos: new Map() });

      for (const outroAtor of filme.elenco) {
        if (ator !== outroAtor) {
          const vizinhos = grafo.get(ator)!.vizinhos;
          if (!vizinhos.has(outroAtor)) vizinhos.set(outroAtor, []);
          vizinhos.get(outroAtor)!.push(filme.titulo);
        }
      }
    }
  }

  return grafo;
}

function encontrarCaminho(
  grafo: Grafo,
  atorInicio: string,
  atorFim: string
): string[] | null {
  if (!grafo.has(atorInicio) || !grafo.has(atorFim)) return null;

  const visitados = new Set<string>();
  const fila: [string, string[]][] = [[atorInicio, []]]; 
  while (fila.length > 0) {
    const [atorAtual, caminho] = fila.shift()!;
    if (visitados.has(atorAtual)) continue;
    visitados.add(atorAtual);

    const vizinhos = grafo.get(atorAtual)!.vizinhos;
    for (const [vizinho, filmes] of vizinhos) {
      const novoCaminho = [...caminho, `${atorAtual} -> ${filmes.join(", ")} -> ${vizinho}`];
      if (vizinho === atorFim) return novoCaminho;
      fila.push([vizinho, novoCaminho]);
    }
  }

  return null; 
}

const filmes: Filme[] = [
    {
      id: "1",
      titulo: "Footloose",
      elenco: ["Kevin Bacon", "Lori Singer", "John Lithgow"],
    },
    {
      id: "2",
      titulo: "A Few Good Men",
      elenco: ["Tom Cruise", "Jack Nicholson", "Demi Moore", "Kevin Bacon"],
    },
    {
      id: "3",
      titulo: "Apollo 13",
      elenco: ["Tom Hanks", "Kevin Bacon", "Bill Paxton", "Gary Sinise"],
    },
    {
      id: "4",
      titulo: "Mystic River",
      elenco: ["Sean Penn", "Tim Robbins", "Kevin Bacon", "Laurence Fishburne"],
    },
    {
      id: "5",
      titulo: "The Shawshank Redemption",
      elenco: ["Tim Robbins", "Morgan Freeman"],
    },
    {
      id: "6",
      titulo: "Se7en",
      elenco: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey"],
    },
    {
      id: "7",
      titulo: "The Dark Knight",
      elenco: ["Christian Bale", "Heath Ledger", "Morgan Freeman"],
    },
    {
      id: "8",
      titulo: "Inception",
      elenco: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    },
    {
      id: "9",
      titulo: "The Departed",
      elenco: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson", "Mark Wahlberg"],
    },
    {
      id: "10",
      titulo: "Pulp Fiction",
      elenco: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
    },
];

const grafo = construirGrafo(filmes);

const caminho = encontrarCaminho(grafo, "Kevin Bacon", "Morgan Freeman");

if (caminho) {
    console.log("Cadeia de filmes e atores:");
    caminho.forEach((etapa) => console.log(etapa));
} else {
    console.log("Não existe conexão entre os atores fornecidos.");
}