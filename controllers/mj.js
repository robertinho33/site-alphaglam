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
        renderProducts(allProducts);

        // Filtros: Categoria e Nome
        searchInput.addEventListener("input", () => filterProducts(allProducts));
        categoryFilter.addEventListener("change", () => filterProducts(allProducts));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
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
