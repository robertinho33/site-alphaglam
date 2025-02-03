document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");
    const cartContainer = document.getElementById("cart-container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    let allProducts = await loadCSV("../controllers/products.csv");

    // Exibe os produtos na tela
    renderProducts(allProducts);

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

    // Adiciona evento de busca
    [searchBtn, searchInput].forEach(element => {
        element.addEventListener("input", () => filterProducts(allProducts));
    });
});

function filterProducts(allProducts) {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
}
