import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const importTSVData = async (tsvText: string) => {
  const linhas = tsvText.split("\n");
  const cabecalho = linhas[0].split("\t");

  const indiceNome = cabecalho.indexOf("nome");
  const indiceValor = cabecalho.indexOf("valor_de_presente");
  const indiceImagem = cabecalho.indexOf("link_foto_principal");
  const indiceDescricao = cabecalho.indexOf("descricao");
  const indiceCategorias = cabecalho.indexOf("categorias");

  for (let i = 1; i < linhas.length; i++) {
    const colunas = linhas[i].split("\t");
    if (colunas.length < 5) continue; // Ignorar linhas incompletas

    const produto = {
      nome: colunas[indiceNome] || "Sem Nome",
      valor: parseFloat(colunas[indiceValor]) || 0,
      imagem: colunas[indiceImagem] || "",
      descricao: colunas[indiceDescricao] || "Sem descrição",
      categorias: colunas[indiceCategorias]?.split(",") || [],
    };

    try {
      await addDoc(collection(db, "produtos"), produto);
      console.log(`Produto "${produto.nome}" adicionado!`);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }
};

export default importTSVData;
