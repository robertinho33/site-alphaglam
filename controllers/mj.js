document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

async function initApp() {
    const productsContainer = document.getElementById("products-container");
    const cartContainer = document.getElementById("cart-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const viewProductsBtn = document.getElementById("view-products-btn");
    const viewCartBtn = document.getElementById("view-cart-btn");

    // Verifica se os elementos existem antes de continuar
    if (!productsContainer || !cartContainer || !searchInput || !searchBtn || !viewProductsBtn || !viewCartBtn) {
        console.error("Erro: Elementos do DOM não encontrados.");
        return;
    }

    try {
        let allProducts = await loadCSV("../controllers/products.csv");
        renderProducts(allProducts);

        // Alternar entre produtos e carrinho
        viewProductsBtn.addEventListener("click", () => {
            productsContainer.style.display = "flex";
            cartContainer.style.display = "none";
        });

        viewCartBtn.addEventListener("click", () => {
            productsContainer.style.display = "none";
            cartContainer.style.display = "block";
            updateCartView();
        });

        // Adiciona evento de busca no botão e no campo de entrada
        [searchBtn, searchInput].forEach(element => {
            element.addEventListener("input", () => filterProducts(allProducts));
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function filterProducts(allProducts) {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    if (!searchTerm) {
        renderProducts(allProducts);
        return;
    }

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}