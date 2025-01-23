let games = []; // Armazena os jogos do usuário
let lastResult = null; // Armazena o último resultado inserido manualmente

// Atualiza a tabela de jogos
function updateGamesTable() {
    const tableBody = document.getElementById('gamesTable').querySelector('tbody');
    tableBody.innerHTML = '';
    games.forEach((game, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td><td>${game.join(', ')}</td>`;
        tableBody.appendChild(row);
    });
}

// Adicionar jogo
document.getElementById('addGameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('gameNumbers').value;
    const game = input.split(',').map(num => parseInt(num.trim())).filter(num => num >= 1 && num <= 25 && !isNaN(num));

    if (game.length !== 15) {
        alert('Cada jogo deve conter exatamente 15 números entre 1 e 25!');
        return;
    }

    games.push(game);
    updateGamesTable();
    document.getElementById('gameNumbers').value = '';
});

// Inserir o resultado manualmente
document.getElementById('resultForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('resultNumbers').value;
    const result = input.split(',').map(num => parseInt(num.trim())).filter(num => num >= 1 && num <= 25 && !isNaN(num));

    if (result.length !== 15) {
        alert('O resultado deve conter exatamente 15 números entre 1 e 25!');
        return;
    }

    lastResult = {
        concurso: "Manual",
        data: new Date().toISOString().split('T')[0], // Data atual
        numeros: result.sort((a, b) => a - b), // Ordena em ordem crescente
    };

    alert('Resultado salvo com sucesso!');
    document.getElementById('resultNumbers').value = '';
    checkResults();
});

// Verificar jogos com o resultado salvo
function checkResults() {
    if (!lastResult) {
        alert("Nenhum resultado foi inserido ainda!");
        return;
    }

    const { concurso, data, numeros } = lastResult;

    // Exibe os detalhes do último sorteio
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Último Resultado</h3>
        <p>Concurso: <strong>${concurso}</strong></p>
        <p>Data: <strong>${data}</strong></p>
        <p>Números Sorteados (em ordem crescente): <strong>${numeros.join(', ')}</strong></p>
        <h3>Verificação dos Jogos</h3>
    `;

    // Verifica os jogos armazenados
    games.forEach((game, index) => {
        const matchedNumbers = game.filter(num => numeros.includes(num));
        const rowClass = matchedNumbers.length >= 11 ? 'text-success' : 'text-muted';

        resultsDiv.innerHTML += `
            <p class="${rowClass}">
                Jogo ${index + 1}: ${game.join(', ')} - 
                Acertos: <strong>${matchedNumbers.length}</strong> (${matchedNumbers.join(', ')})
            </p>
        `;
    });
}