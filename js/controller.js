// Mock data (Model) - Últimos números sorteados
async function fetchLastResult() {
    try {
        const response = await fetch('https://api.example.com/lotofacil/latest'); // Substitua pela API real
        const data = await response.json();
        return data.numeros; // Ajuste conforme a estrutura do retorno
    } catch (error) {
        console.error("Erro ao buscar o último resultado:", error);
        alert("Não foi possível buscar o último resultado.");
        return null;
    }
}

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
document.getElementById('lotofacilForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Exemplo de 150 jogos do usuário
    const userGames = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        // Adicione mais 148 jogos...
    ];

    const lastDraw = await fetchLastResult();
    if (!lastDraw) return; // Sai se não conseguir buscar o resultado

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Números Sorteados: <strong>${lastDraw.join(', ')}</strong></p>`;

    userGames.forEach((game, index) => {
        const matchedNumbers = game.filter(num => lastDraw.includes(num));
        resultsDiv.innerHTML += `
            <p>Jogo ${index + 1}: ${game.join(', ')} - 
            Acertos: <strong>${matchedNumbers.length}</strong> (${matchedNumbers.join(', ')})</p>
        `;
    });
});

