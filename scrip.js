import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3785y6GPsFH7xuwfwjcBoPjvUfE3kSMw",
  authDomain: "alphaglamstart.firebaseapp.com",
  databaseURL: "https://alphaglamstart-default-rtdb.firebaseio.com",
  projectId: "alphaglamstart",
  storageBucket: "alphaglamstart.appspot.com",
  messagingSenderId: "885178660314",
  appId: "1:885178660314:web:1bb3a78be9fa7fdcdefce3",
  measurementId: "G-094SYXW35Q",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleUpload = async () => {
    if (!imagem) return alert("Selecione uma imagem!");

    const imgRef = ref(storage, `produtos/${imagem.name}`);
    await uploadBytes(imgRef, imagem);
    return getDownloadURL(imgRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = await handleUpload();

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
import ProductForm from "./components/ProductForm";

function App() {
  return (
    <div>
      <h1>Cadastro de Produtos</h1>
      <ProductForm />
    </div>
  );
}

export default App;
