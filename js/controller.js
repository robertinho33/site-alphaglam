let games = []; // Armazena todos os jogos adicionados pelo usuário

// Mock para buscar os últimos números sorteados
async function fetchLastResult() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Substitua por uma API real se disponível
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
    const game = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (game.length !== 15) {
        alert('Cada jogo deve conter exatamente 15 números!');
        return;
    }

    games.push(game);
    updateGamesTable();
    document.getElementById('gameNumbers').value = '';
});

// Salvar jogos
document.getElementById('saveGames').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(games)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'jogos_lotofacil.json';
    link.click();
    URL.revokeObjectURL(link.href); // Limpa o recurso alocado
});

// Carregar jogos
document.getElementById('loadGames').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', function () {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function () {
            try {
                const loadedGames = JSON.parse(reader.result);
                if (Array.isArray(loadedGames) && loadedGames.every(game => game.length === 15)) {
                    games = loadedGames;
                    updateGamesTable();
                    alert('Jogos carregados com sucesso!');
                } else {
                    throw new Error('Formato inválido.');
                }
            } catch (error) {
                alert('Erro ao carregar jogos. Verifique o formato do arquivo.');
            }
        };
        reader.readAsText(file);
    });

    input.click();
});

// Verificar jogos
document.getElementById('checkResults').addEventListener('click', async function () {
    const lastDraw = await fetchLastResult();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>Números Sorteados: <strong>${lastDraw.join(', ')}</strong></p>`;

    games.forEach((game, index) => {
        const matchedNumbers = game.filter(num => lastDraw.includes(num));
        resultsDiv.innerHTML += `
            <p>Jogo ${index + 1}: ${game.join(', ')} - 
            Acertos: <strong>${matchedNumbers.length}</strong> (${matchedNumbers.join(', ')})</p>
        `;
    });
});
