// Mock data (Model) - Últimos números sorteados
async function fetchLastResult() {
    try {
        const response = await fetch('https://api.example.com/lotofacil/latest'); // Substitua pela API real
        const data = await response.json();
        return data.numeros; // Ajuste conforme o retorno da API
    } catch (error) {
        console.error("Erro ao buscar o último resultado:", error);
        alert("Não foi possível buscar o último resultado.");
        return null;
    }
}

// Verificar jogos
document.getElementById('checkResults').addEventListener('click', async function () {
    const lastDraw = await fetchLastResult();
    if (!lastDraw) return;

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
let games = []; // Array para armazenar os jogos

// Adicionar jogo à lista
document.getElementById('addGameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('gameNumbers').value;
    const game = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    if (game.length !== 15) {
        alert('Cada jogo deve ter exatamente 15 números!');
        return;
    }

    games.push(game);
    updateGamesTable();
    document.getElementById('gameNumbers').value = '';
});

// Atualizar tabela com os jogos
function updateGamesTable() {
    const tableBody = document.getElementById('gamesTable').querySelector('tbody');
    tableBody.innerHTML = '';
    games.forEach((game, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${game.join(', ')}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Salvar jogos em arquivo JSON
document.getElementById('saveGames').addEventListener('click', function () {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jogos_lotofacil.json';
    link.click();
    URL.revokeObjectURL(url);
});

// Carregar jogos salvos
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
                games = JSON.parse(reader.result);
                updateGamesTable();
                alert('Jogos carregados com sucesso!');
            } catch (error) {
                alert('Erro ao carregar os jogos. Verifique o arquivo.');
            }
        };
        reader.readAsText(file);
    });
    input.click();
});

