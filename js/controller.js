// Mock data (Model) - Últimos números sorteados
const lastDraw = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25, 4];

document.getElementById('lotofacilForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar os números inseridos pelo usuário
    const userInput = document.getElementById('userNumbers').value;
    const userNumbers = userInput.split(',').map(num => parseInt(num.trim()));

    if (userNumbers.length !== 15 || userNumbers.some(num => isNaN(num))) {
        alert('Por favor, insira exatamente 15 números válidos!');
        return;
    }

    // Comparar os números do usuário com os sorteados
    const matchedNumbers = userNumbers.filter(num => lastDraw.includes(num));

    // Exibir resultados (View)
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Números Sorteados: <strong>${lastDraw.join(', ')}</strong></p>
        <p>Seus Números: <strong>${userNumbers.join(', ')}</strong></p>
        <p>Números Acertados: <strong>${matchedNumbers.join(', ')}</strong></p>
        <p>Total de Acertos: <strong>${matchedNumbers.length}</strong></p>
    `;
});
