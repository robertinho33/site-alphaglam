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

        loadCategories(allProducts);
        renderProducts(allProducts);

        searchInput.addEventListener("input", () => filterProducts(allProducts));
        categoryFilter.addEventListener("change", () => filterProducts(allProducts));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function loadCategories(products) {
    const categoryFilter = document.getElementById("categoryFilter");
    let categories = ["all", ...new Set(products.map(product => product.category))];

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

function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    products.forEach((product) => {
        const truncatedDescription = product.description.length > 80
            ? product.description.slice(0, 80) + "..."
            : product.description;

        const card = document.createElement("div");
        card.classList.add("col-md-4");

        card.innerHTML = `
            <div class="card">
                <p class="card-text"><strong>ID:</strong> ${product.id}</p>
                <h5>${product.title}</h5>
                <img src="${product.image ? `../assets/images/ecobelle/${product.image}` : '../assets/images/default.jpg'}"
                     class="card-img-top img-thumbnail" 
                     alt="${product.title}">
                <p class="card-text">
                    <strong>Descrição:</strong> ${truncatedDescription}
                    <a href="#" class="text-primary read-more" data-full="${product.description}">Leia mais</a>
                </p> 
                <div class="card-footer">
                    <small class="text-muted"><strong>Preço:</strong> R$ ${parseFloat(product.price).toFixed(2)}</small>
                </div> 
                <button class="btn btn-primary cart-button" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    // Adicionando eventos para "Leia mais"
    document.querySelectorAll(".read-more").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            alert(event.target.getAttribute("data-full"));
        });
    });

    // Adicionando eventos para botão "Adicionar ao Carrinho"
    document.querySelectorAll(".cart-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const product = {
                id: event.target.getAttribute("data-id"),
                title: event.target.getAttribute("data-title"),
                price: event.target.getAttribute("data-price"),
                image: event.target.getAttribute("data-image")
            };
            addToCart(product);
        });
    });
}
