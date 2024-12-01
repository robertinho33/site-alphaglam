// Script JavaScript para gerenciar carrinho e interação
let cart = [];
const images = document.querySelectorAll('.image-grid img');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const formCadastro = document.getElementById('form-cadastro');
const formCarrinho = document.getElementById('form-carrinho');
const btnJaTenhoCadastro = document.getElementById('already-registered');
const btnNaoTenhoCadastro = document.querySelector('button[name="não-tenho-cadastro"]');

// Função para atualizar o carrinho
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.src}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px; border-radius: 5px;">
            ${item.name} - R$ ${item.price.toFixed(2)}
            <button class="remove-item" data-index="${index}">Excluir</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });
    totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Adicionar produtos ao carrinho ao clicar na imagem
images.forEach(image => {
    image.addEventListener('click', () => {
        const name = image.getAttribute('data-name');
        const price = parseFloat(image.getAttribute('data-price'));
        const src = image.getAttribute('src');
        cart.push({ name, price, src });
        updateCart();
    });
});

// Alternar entre formulários
btnJaTenhoCadastro.addEventListener('click', () => {
    formCadastro.style.display = 'none';
    formCarrinho.style.display = 'block';
});

btnNaoTenhoCadastro.addEventListener('click', () => {
    formCadastro.style.display = 'block';
    formCarrinho.style.display = 'none';
});

// Evento para finalizar a compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Adicione ao menos um item ao carrinho antes de finalizar a compra.');
        return;
    }

    const nome = document.getElementById('nome-carrinho').value.trim();
    const telefone = document.getElementById('telefone-carrinho').value.trim();

    // Verificar se os campos "nome" e "telefone" estão preenchidos
    if (!nome || !telefone) {
        alert('Por favor, preencha os campos Nome e Telefone antes de finalizar a compra.');
        return;
    }

    // Gerar a mensagem para o WhatsApp
    const items = cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('%0A');
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const message = `
        Olá! Gostaria de finalizar o seguinte pedido:%0A%0A
        ${items}%0A%0A
        Total: R$ ${total}%0A%0A
        Nome: ${nome}%0A
        Telefone: ${telefone}
    `.trim();

    // Abrir o link do WhatsApp
    window.open(`https://wa.me/5511986215473?text=${encodeURIComponent(message)}`, '_blank');
});

// Inicializar com os formulários ocultos
document.addEventListener('DOMContentLoaded', () => {
    formCadastro.style.display = 'none';
    formCarrinho.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.product-image');
    const productCard = document.getElementById('product-card');
    const cardImage = document.getElementById('card-image');
    const cardTitle = document.getElementById('card-title');
    const cardDescription = document.getElementById('card-description');
    const cardPrice = document.getElementById('card-price');
    const closeCardButton = document.getElementById('close-card');

    images.forEach(image => {
        image.addEventListener('click', () => {
            const name = image.getAttribute('data-name');
            const description = image.getAttribute('data-description');
            const price = image.getAttribute('data-price');
            const src = image.getAttribute('src');

            // Atualiza o conteúdo do card
            cardImage.src = src;
            cardTitle.textContent = name;
            cardDescription.textContent = description;
            cardPrice.textContent = `Preço: R$ ${parseFloat(price).toFixed(2)}`;

            // Exibe o card
            productCard.classList.remove('hidden');
        });
    });

    closeCardButton.addEventListener('click', () => {
        // Oculta o card
        productCard.classList.add('hidden');
    });
});
