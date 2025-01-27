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
    
    const cart = [];
    
    // Função para adicionar produto ao carrinho
    function addToCart(product) {
        cart.push(product);
        alert(`Produto "${product.title}" adicionado ao carrinho!`);
        updateCartView();
    }

    // Função para remover produto do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        alert("Produto removido do carrinho!");
        updateCartView();
    }

    // Calcular total do carrinho
    function calculateCartTotal() {
        return cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
    }

    // Gerar mensagem para WhatsApp
    function generateWhatsAppMessage() {
        if (cart.length === 0) {
            return "Meu carrinho está vazio.";
        }

        let message = "Olá, gostaria de realizar o seguinte pedido:\n\n";
        cart.forEach((product, index) => {
            message += `${index + 1}. ${product.title} - R$ ${parseFloat(product.price).toFixed(2)}\n`;
        });
        message += `\nTotal: R$ ${calculateCartTotal()}`;

        return message;
    }

    // Atualizar botão do WhatsApp
    function updateWhatsAppButton() {
        const whatsappButton = document.getElementById("whatsapp-button");
        const message = encodeURIComponent(generateWhatsAppMessage());
        whatsappButton.href = `https://wa.me/5511986215473?text=${message}`;
    }

    // Função para expandir descrição
    function toggleDescription(productId) {
        const description = document.getElementById(`description-${productId}`);
        const fullDescription = description.getAttribute("data-full-description");

        if (description.textContent.length <= 75) {
            description.textContent = fullDescription;
        } else {
            description.textContent = fullDescription.slice(0, 75) + "...";
        }
    }
    

    // Atualizar exibição do carrinho
    function updateCartView() {
        const cartList = document.getElementById("cart-list");
        const cartTotal = document.getElementById("cart-total");
        cartList.innerHTML = ""; // Limpa a lista

        if (cart.length === 0) {
            cartList.innerHTML = '<li class="list-group-item text-center">O carrinho está vazio.</li>';
            cartTotal.textContent = "0.00";
        } else {
            cart.forEach((product, index) => {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                listItem.innerHTML = `
                    ${product.title} - R$ ${parseFloat(product.price).toFixed(2)}
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remover</button>
                `;
                cartList.appendChild(listItem);
            });
            cartTotal.textContent = calculateCartTotal();
        }

        updateWhatsAppButton();
    }

    // Função para carregar o CSV
    async function loadCSV(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('Erro ao carregar o arquivo CSV.');
            const data = await response.text();
            console.log("CSV carregado:", data); // Verifica se o CSV foi carregado corretamente
            return parseCSV(data);
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    // Função para processar os dados do CSV
    function parseCSV(data) {
        const lines = data.split('\n').filter(line => line.trim() !== ''); // Remove linhas vazias
        const headers = lines[0].split(',').map(header => header.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.trim());
            return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
        });
    }

    // Inicializar o carregamento dos produtos
    document.addEventListener("DOMContentLoaded", async () => {
        const products = await loadCSV("products.csv");
        if (products.length === 0) {
            document.getElementById("products-container").innerHTML =
                '<p class="text-center">Nenhum produto encontrado.</p>';
        } else {
            renderProducts(products);
        }

        // Alternar entre produtos e carrinho
        document.getElementById("view-products-btn").addEventListener("click", () => {
            document.getElementById("products-container").style.display = "flex";
            document.getElementById("cart-container").style.display = "none";
        });

        document.getElementById("view-cart-btn").addEventListener("click", () => {
            document.getElementById("products-container").style.display = "none";
            document.getElementById("cart-container").style.display = "block";
        });
    });
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
        // Função para carregar os grupos dinamicamente
        function loadGroup(groupId) {
            const container = document.getElementById('product-groups');
            fetch(`resources/produtos.html #${groupId}`)
                .then(response => response.text())
                .then(data => {
                    container.innerHTML = data;
                })
                .catch(error => {
                    console.error('Erro ao carregar o grupo:', error);
                    container.innerHTML = '<p>Não foi possível carregar os produtos.</p>';
                });
        }