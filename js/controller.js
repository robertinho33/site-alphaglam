let games = []; // Armazena todos os jogos adicionados pelo usuário

// Função para buscar o último resultado oficial da Lotofácil
async function fetchLastResult() {
    try {
        const response = await fetch('https://github.com/guto-alves/loterias-api.git'); // Substitua pela API real
        const data = await response.json();

        // Exemplo de retorno esperado da API:
        // {
        //   "concurso": 2750,
        //   "data": "2025-01-20",
        //   "numeros": [10, 3, 5, 8, 7, 12, 15, 13, 22, 20, 19, 2, 25, 6, 1]
        // }

        if (!data || !data.numeros || !data.concurso || !data.data) {
            throw new Error('Resposta inválida da API');
        }

        return {
            concurso: data.concurso,
            data: data.data,
            numeros: data.numeros.sort((a, b) => a - b), // Ordena os números em ordem crescente
        };
    } catch (error) {
        console.error("Erro ao buscar o último resultado:", error);
        alert("Não foi possível buscar o último resultado.");
        return null;
    }
}

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

// Verificar jogos com o último sorteio
document.getElementById('checkResults').addEventListener('click', async function () {
    const lastDraw = await fetchLastResult();
    if (!lastDraw) return;

    const { concurso, data, numeros } = lastDraw;

    // Exibe os detalhes do último sorteio
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Último Sorteio</h3>
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
});
