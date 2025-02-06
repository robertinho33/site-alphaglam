const cart = [];
let allProducts = []; // Armazena todos os produtos carregados

document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");
    const cartContainer = document.getElementById("cart-container");

    // Carrega os produtos do CSV
    allProducts = await loadCSV("../controllers/products.csv");
    renderProducts(allProducts);

    // Esconder carrinho inicialmente 
    cartContainer.style.display = "none";

    // Alternar entre produtos e carrinho
    document.getElementById("view-products-btn").addEventListener("click", () => {
        productsContainer.style.display = "flex";
        cartContainer.style.display = "none";
    });

    document.getElementById("view-cart-btn").addEventListener("click", () => {
        productsContainer.style.display = "none";
        cartContainer.style.display = "block";
        updateCartView();
    });

    // Configurar botão do WhatsApp
    const whatsappButton = document.getElementById("whatsapp-button");
    if (whatsappButton) {
        whatsappButton.addEventListener("click", () => {
            setTimeout(() => {
                cart.length = 0;
                updateCartView();
                alert("Pedido enviado! O carrinho foi esvaziado.");
            }, 1000);
        }, { once: true }); // Garante que o evento só será anexado uma vez
    }
});

// Função para renderizar produtos
function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");

        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text"><strong>Preço: R$ ${parseFloat(product.price.replace(',', '.')).toFixed(2)}</strong></p>
                    <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const title = this.getAttribute("data-title");
            const price = this.getAttribute("data-price").replace(',', '.');
            addToCart({ id, title, price: parseFloat(price) });
        });
    });
}

// Função para adicionar ao carrinho
function addToCart(product) {
    cart.push(product);
    alert(`Produto "${product.title}" adicionado ao carrinho!`);
    updateCartView();
}

// Atualizar exibição do carrinho
function updateCartView() {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="list-group-item text-center">O carrinho está vazio.</li>';
        cartTotal.textContent = "0.00";
    } else {
        cart.forEach((product, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            listItem.innerHTML = `
                ${product.title} - R$ ${product.price.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartList.appendChild(listItem);
        });
        cartTotal.textContent = calculateCartTotal();
    }
}

// Função para remover do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    alert("Produto removido do carrinho!");
    updateCartView();
}

// Calcular total do carrinho
function calculateCartTotal() {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
}

// Função para carregar o CSV
async function loadCSV(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Erro ao carregar o arquivo CSV.');
        const data = await response.text();
        return parseCSV(data);
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

// Função para processar os dados do CSV
function parseCSV(data) {
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
    });
}
