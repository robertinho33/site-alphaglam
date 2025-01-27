document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { title: "Pó Descolorante", category: "descolorante", price: "R$ 50,00", image: "po-descolorante.jpg" },
        { title: "Ox", category: "descolorante", price: "R$ 30,00", image: "ox.jpg" },
        { title: "Matizador", category: "descolorante", price: "R$ 40,00", image: "matizador.jpg" },
        { title: "Shampoo Coco", category: "shampoo", price: "R$ 24,00", image: "shampoo-coco.jpg" },
        { title: "Shampoo Algas", category: "shampoo", price: "R$ 22,00", image: "shampoo-algas.jpg" },
        { title: "Shampoo Neutro", category: "shampoo", price: "R$ 20,00", image: "shampoo-neutro.jpg" },
        { title: "Hidratação Pistache", category: "hidratacao", price: "R$ 45,00", image: "hidratacao-pistache.jpg" },
        { title: "Hidratação Líquida", category: "hidratacao", price: "R$ 38,00", image: "hidratacao-liquida.jpg" },
        { title: "Hidratação Profunda", category: "hidratacao", price: "R$ 50,00", image: "hidratacao-profunda.jpg" }
    ];

    function showCategory(category) {
        // Limpar os cards existentes
        const container = document.getElementById('cards-container');
        container.innerHTML = '';

        // Filtrar produtos pela categoria selecionada
        const filteredProducts = products.filter(product => product.category === category);

        // Exibir os cards filtrados
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="../assets/images/${product.image}" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Preço: ${product.price}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Exibir os produtos da primeira categoria por padrão
    showCategory('descolorante');
        });
    fetch('../resources/menu.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('menu-container').innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o menu:', error));
   
    fetch('../resources/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o menu:', error));
