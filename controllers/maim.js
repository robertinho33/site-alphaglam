const cart = [];
document.addEventListener("DOMContentLoaded", async () => {
const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");

let allProducts = []; // Armazena todos os produtos carregados

document.addEventListener("DOMContentLoaded", async () => {
    allProducts = await loadCSV("../controllers/products.csv"); // Carrega os produtos
    renderProducts(allProducts); // Exibe os produtos inicialmente
});

// Certifique-se de que o carrinho está escondido inicialmente
cartContainer.style.display = "none";

// Botão para ver os produtos
document.getElementById("view-products-btn").addEventListener("click", () => {
productsContainer.style.display = "flex";
cartContainer.style.display = "none";
});

// Botão para ver o carrinho
document.getElementById("view-cart-btn").addEventListener("click", () => {
productsContainer.style.display = "none";
cartContainer.style.display = "block";
updateCartView(); // Atualiza a exibição do carrinho
});
});


// Função para adicionar produto ao carrinho
function addToCart(product) {
    cart.push(product);
    alert(`Produto "${product.title}" adicionado ao carrinho!`);
    updateCartView();
}
function updateCartView() {
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

cartList.innerHTML = ""; // Limpa o carrinho antes de atualizar

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

updateWhatsAppButton(); // Atualiza link do WhatsApp
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
}document.addEventListener("DOMContentLoaded", () => {
    const floatingCartBtn = document.getElementById("floating-cart-btn");
    const floatingCheckoutBtn = document.getElementById("floating-checkout-btn");

    if (floatingCartBtn) {
        floatingCartBtn.addEventListener("click", () => {
            document.getElementById("products-container").style.display = "none";
            document.getElementById("cart-container").style.display = "block";
            updateCartView();
        });
    }

    if (floatingCheckoutBtn) {
        floatingCheckoutBtn.addEventListener("click", () => {
            alert("Redirecionando para finalização da compra!");
            window.location.href = "checkout.html"; // Ajuste para a URL correta
        });
    }
});


// Atualizar botão do WhatsApp
function updateWhatsAppButton() {
const whatsappButton = document.getElementById("whatsapp-button");
const message = encodeURIComponent(generateWhatsAppMessage());

// Se o carrinho estiver vazio, não muda o link
if (cart.length === 0) {
whatsappButton.href = "#";
return;
}

whatsappButton.href = `https://wa.me/5511986215473?text=${message}`;

// Adiciona um evento para limpar o carrinho ao clicar no botão
whatsappButton.addEventListener("click", () => {
setTimeout(() => {
    cart.length = 0; // Esvazia o array do carrinho
    updateCartView(); // Atualiza a exibição
    alert("Pedido enviado! O carrinho foi esvaziado.");
}, 1000); // Pequeno delay para garantir que a mensagem foi enviada antes de limpar
}, { once: true }); // Garante que o evento só será anexado uma vez
}
    // Renderizar produtos
   function renderProducts(products) {
const container = document.getElementById("products-container");
container.innerHTML = ""; // Limpa o container antes de renderizar
products.forEach((product) => {
const truncatedDescription = product.description.length > 80 
    ? product.description.slice(0, 80) + "..." 
    : product.description;

const card = document.createElement("div");
card.classList.add("col-md-4");
card.innerHTML = `
 <section class="container mt-5">
<div class="row">     
    <div class="card"> 
        <p class="card-text"><strong>ID:</strong> ${product.id}</p>
       <h5> ${product.title}</h5>
        <img 
            "../assets/images/ecobelle/<img src=${product.image}"  alt="${produto.titulo}" width="200">
            class="card-img-top img-thumbnail" 
            alt="${product.title}" 
        >
        <p class="card-text">
            <strong>Descrição:</strong> ${truncatedDescription}
            <a href="#" class="text-primary" onclick="showFullDescription('${product.description}')">Leia mais</a>
        </p> 
        <div class="card-footer">
            <small class="text-muted"><strong>Preço:</strong> R$ ${parseFloat(product.price).toFixed(2)}</small>
        </div> 
        <button class="btn btn-primary cart-button" onclick='addToCart(${JSON.stringify(product)})'>
            Adicionar ao Carrinho
        </button>
    </div>
    </div>
`;
container.appendChild(card);
});
}

function showFullDescription(description) {
const fullDescriptionElement = document.getElementById("fullDescription");
fullDescriptionElement.textContent = description; // Define a descrição completa no modal
const descriptionModal = new bootstrap.Modal(document.getElementById("descriptionModal"));
descriptionModal.show(); // Abre o modal
}

// Atualizar exibição do carrinho
function updateCartView() {
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

cartList.innerHTML = ""; // Limpa o carrinho antes de atualizar

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

updateWhatsAppButton(); // Atualiza link do WhatsApp
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
    const products = await loadCSV("../controllers/products.csv");
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

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    // Evento para buscar ao clicar no botão
    searchBtn.addEventListener("click", () => {
        filterProducts();
    });

    // Evento para buscar enquanto o usuário digita
    searchInput.addEventListener("input", () => {
        filterProducts();
    });

    function filterProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filtra os produtos que contêm o termo de busca no título ou categoria
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        // Atualiza a exibição dos produtos filtrados
        renderProducts(filteredProducts);
    }
});

