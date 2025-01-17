let spreadsheetData = []; // Armazena os dados da planilha

// Evento de upload do arquivo
document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Processar os dados
    spreadsheetData = rows.filter(row => row.length > 0); // Remove linhas vazias
    displaySpreadsheetData();
  };
  reader.readAsArrayBuffer(file);
});

// Exibir os dados da planilha na tabela
function displaySpreadsheetData() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Limpa a tabela

  spreadsheetData.forEach((row, index) => {
    const rowHTML = `
      <tr>
        <td>${index + 1}</td>
        <td>${row.join("-")}</td>
      </tr>
    `;
    tableBody.innerHTML += rowHTML;
  });
}

// Comparação da sequência
document.getElementById("uploadForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userSequence = document.getElementById("sequenceInput").value.trim();
  const userArray = userSequence.split("-").map(num => num.trim());

  const matchingRows = []; // Armazena as linhas correspondentes

  // Verifica em quais linhas a sequência está presente
  spreadsheetData.forEach((row, index) => {
    if (JSON.stringify(row.map(String)) === JSON.stringify(userArray)) {
      matchingRows.push(index + 1); // Adiciona a linha (1-based)
    }
  });

  const resultDiv = document.getElementById("result");
  if (matchingRows.length > 0) {
    resultDiv.innerHTML = `
      <div class="alert alert-success">
        A sequência foi encontrada nas seguintes linhas: <strong>${matchingRows.join(", ")}</strong>.
      </div>`;
  } else {
    resultDiv.innerHTML = `
      <div class="alert alert-danger">
        A sequência não foi encontrada na planilha.
      </div>`;
  }
});

// Carregar o menu
fetch('menu.html')
  .then(response => {
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return response.text();
  })
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(error => console.error('Erro ao carregar o menu:', error));
