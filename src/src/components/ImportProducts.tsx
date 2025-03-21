import { useState } from "react";
import importTSVData from "../importProducts";

const ImportProducts = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async () => {
    if (!file) return alert("Selecione um arquivo!");

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result) {
        const tsvText = event.target.result.toString();
        await importTSVData(tsvText);
        alert("Importação concluída!");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h2>Importar Produtos</h2>
      <input type="file" accept=".tsv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleFileUpload}>Importar</button>
    </div>
  );
};

export default ImportProducts;
