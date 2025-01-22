let games = []; // Armazena todos os jogos adicionados pelo usuário

// Mock para buscar os últimos números sorteados
async function fetchLastResult() {
    try {
        const response = await fetch('https://api.example.com/lotofacil/latest'); // Substitua pela API real
        const data = await response.json();

        // Exemplo de estrutura retornada pela API
        // {
        //   "concurso": 2750,
        //   "data": "2025-01-20",
        //   "numeros": [10, 3, 5, 8, 7, 12, 15, 13, 22, 20, 19, 2, 25, 6, 1]
        // }

        const sortedNumbers = data.numeros.sort((a, b) => a - b); // Ordena em ordem crescente
        return {
            concurso: data.concurso,
            data: data.data,
            numeros: sortedNumbers,
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
    if (!lastDraw) return;

    const { concurso, data, numeros } = lastDraw;

    // Exibe os detalhes do último sorteio
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Concurso: <strong>${concurso}</strong></p>
        <p>Data: <strong>${data}</strong></p>
        <p>Números Sorteados (em ordem crescente): <strong>${numeros.join(', ')}</strong></p>
    `;

    // Verifica os jogos contra o resultado sorteado
    games.forEach((game, index) => {
        const matchedNumbers = game.filter(num => numeros.includes(num));
        resultsDiv.innerHTML += `
            <p>Jogo ${index + 1}: ${game.join(', ')} - 
            Acertos: <strong>${matchedNumbers.length}</strong> (${matchedNumbers.join(', ')})</p>
        `;
    });
});
const rowClass = matchedNumbers.length >= 11 ? 'text-success' : 'text-muted';
resultsDiv.innerHTML += `
    <p class="${rowClass}">Jogo ${index + 1}: ${game.join(', ')} - 
    Acertos: <strong>${matchedNumbers.length}</strong> (${matchedNumbers.join(', ')})</p>
`;
resultsDiv.innerHTML = `
    <h3>Resultados do Último Sorteio</h3>
    <p>Concurso: <strong>${concurso}</strong></p>
    <p>Data: <strong>${data}</strong></p>
    <p>Números Sorteados: <strong>${numeros.join(', ')}</strong></p>
    <h3>Verificação dos Jogos</h3>
`;
const game = input.split(',').map(num => parseInt(num.trim())).filter(num => num >= 1 && num <= 25 && !isNaN(num));
