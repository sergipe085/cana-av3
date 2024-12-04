type PDF = {
    nome: string;
    paginas: number;
    peso: number; 
};
  

function selecionarPDFsComDetalhes(capacidade: number, arquivos: PDF[]): PDF[] {
    console.log("Capacidade do pendrive:", capacidade, "MB");
    console.log("\nArquivos disponíveis:");
    arquivos.forEach(arquivo => console.log(`${arquivo.nome} - ${arquivo.paginas} páginas, ${arquivo.peso}MB`));
  
    const arquivosOrdenados = [...arquivos].sort((a, b) => (b.paginas / b.peso) - (a.paginas / a.peso));
    console.log("\nArquivos ordenados por densidade (páginas/MB):");
    arquivosOrdenados.forEach(arquivo => console.log(`${arquivo.nome} - Densidade: ${(arquivo.paginas / arquivo.peso).toFixed(2)}`));
  
    const selecionados: PDF[] = [];
    let espacoDisponivel = capacidade;
  
    console.log("\nIniciando seleção dos arquivos:");
    for (const arquivo of arquivosOrdenados) {
      console.log(`\nAnalisando arquivo: ${arquivo.nome}`);
      console.log(`Espaço disponível no pendrive: ${espacoDisponivel}MB`);
      if (arquivo.peso <= espacoDisponivel) {
        selecionados.push(arquivo);
        espacoDisponivel -= arquivo.peso;
        console.log(`Arquivo selecionado: ${arquivo.nome}`);
        console.log(`Espaço restante no pendrive: ${espacoDisponivel}MB`);
      } else {
        console.log(`Arquivo ignorado: ${arquivo.nome} (não cabe no pendrive).`);
      }
    }
  
    console.log("\nSeleção finalizada. Arquivos escolhidos:");
    selecionados.forEach(pdf => console.log(`${pdf.nome} - ${pdf.paginas} páginas, ${pdf.peso}MB`));
  
    return selecionados;
}
  
const capacidadePendrive = 200;
const arquivos: PDF[] = [
  { nome: "Algoritmos em C", paginas: 350, peso: 50 },
  { nome: "Estruturas de Dados", paginas: 500, peso: 60 },
  { nome: "Introdução à IA", paginas: 250, peso: 40 },
  { nome: "Redes Neurais", paginas: 300, peso: 45 },
  { nome: "Programação Dinâmica", paginas: 400, peso: 55 },
];

selecionarPDFsComDetalhes(capacidadePendrive, arquivos);