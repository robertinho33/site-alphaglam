import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!imagem) {
      alert("Selecione uma imagem!");
      return "";
    }

    const imgRef = ref(storage, `produtos/${imagem.name}`);
    await uploadBytes(imgRef, imagem);
    return getDownloadURL(imgRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imgUrl = await handleUpload();
      if (!imgUrl) return;

      await addDoc(collection(db, "produtos"), {
        nome,
        descricao,
        valor: parseFloat(valor),
        imagem: imgUrl,
      });

      alert("Produto cadastrado!");
      setNome("");
      setDescricao("");
      setValor("");
      setImagem(null);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImagem(e.target.files[0])} required />
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

export default ProductForm;
