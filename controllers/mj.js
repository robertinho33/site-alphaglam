document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

async function initApp() {
    const productsContainer = document.getElementById("products-container");
    const cartContainer = document.getElementById("cart-container");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("categoryFilter");

    if (!productsContainer || !cartContainer || !searchInput || !categoryFilter) {
        console.error("Erro: Elementos não encontrados.");
        return;
    }

    try {
        let allProducts = await loadCSV("../controllers/products.csv");

        // Carregar categorias dinâmicas
        loadCategories(allProducts);

        renderProducts(allProducts);

        // Eventos de filtro
        searchInput.addEventListener("input", () => filterProducts(allProducts));
        categoryFilter.addEventListener("change", () => filterProducts(allProducts));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function loadCategories(products) {
    const categoryFilter = document.getElementById("categoryFilter");

    // Pegar todas as categorias únicas
    let categories = ["all", ...new Set(products.map(product => product.category))];

    // Popular o <select> de categorias
    categoryFilter.innerHTML = categories
        .map(category => `<option value="${category.toLowerCase()}">${category}</option>`)
        .join("");
}

function filterProducts(allProducts) {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    const selectedCategory = document.getElementById("categoryFilter").value.toLowerCase();

    let filteredProducts = allProducts.filter(product => {
        const matchesName = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
        return matchesName && matchesCategory;
    });

    renderProducts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-container");

function displayProducts() {
    productsContainer.innerHTML = ""; // Limpa antes de adicionar novos produtos
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="../assets/images/${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="fw-bold">R$ ${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

displayProducts();
});