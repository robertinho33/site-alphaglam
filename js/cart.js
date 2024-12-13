document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const bagModal = document.getElementById("bag-modal");
    const bagItems = document.getElementById("bag-items");
    const bagTotalPrice = document.getElementById("bag-total-price");

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(listItem);
            total += item.price;
        });

        totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function updateBag() {
        bagItems.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            bagItems.appendChild(listItem);
            total += item.price;
        });

        bagTotalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    document.querySelectorAll(".image-grid img").forEach((img) => {
        img.addEventListener("click", () => {
            const name = img.dataset.name;
            const price = parseFloat(img.dataset.price);
            cart.push({ name, price });
            updateCart();
        });
    });

    document.getElementById("view-bag-btn").addEventListener("click", () => {
        updateBag();
        bagModal.classList.remove("hidden");
    });

    document.getElementById("clear-bag-btn").addEventListener("click", () => {
        cart.length = 0;
        updateCart();
        updateBag();
    });

    document.getElementById("close-bag-btn").addEventListener("click", () => {
        bagModal.classList.add("hidden");
    });
});
const ladies = [];

function adicionarLady() {
    const nomeLady = document.getElementById("nomeLady").value;
    const instagramLady = document.getElementById("instagramLady").value;
    const whatsappLady = document.getElementById("whatsappLady").value;
    const emailLady = document.getElementById("emailLady").value;

    if (!nomeLady || !instagramLady || !whatsappLady || !emailLady) {
        alert("Preencha todos os campos!");
        return;
    }

    ladies.push({ nomeLady, instagramLady, whatsappLady, emailLady });
    atualizarListaLadies();
    document.getElementById("form-ladies").reset();
}

function atualizarListaLadies() {
    const ladiesList = document.getElementById("ladiesList");
    ladiesList.innerHTML = "";

    ladies.forEach((lady) => {
        const li = document.createElement("li");
        li.textContent = `${lady.nomeLady} - ${lady.instagramLady} - ${lady.whatsappLady} - ${lady.emailLady}`;
        ladiesList.appendChild(li);
    });
}
