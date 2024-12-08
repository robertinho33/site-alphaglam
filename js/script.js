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

document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const viewBagBtn = document.getElementById("view-bag-btn");
    const bagModal = document.getElementById("bag-modal");
    const bagItems = document.getElementById("bag-items");
    const bagTotalPrice = document.getElementById("bag-total-price");
    const closeBagBtn = document.getElementById("close-bag-btn");
    const clearBagBtn = document.getElementById("clear-bag-btn");
    
    let cart = [];
    
    // Função para adicionar itens ao carrinho
    document.querySelectorAll(".image-grid img").forEach((img) => {
      img.addEventListener("click", function () {
          const name = img.getAttribute("data-name");
          const price = parseFloat(img.getAttribute("data-price"));
          const src = img.getAttribute("src");
    
          cart.push({ name, price, src });
    
          // Atualiza tanto o carrinho quanto a sacola
          updateCart();
          updateBag();
      });
    });
    
    // Função para atualizar o carrinho
    function updateCart() {
      cartItems.innerHTML = ""; // Limpa o carrinho
      let total = 0;
    
      cart.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
          cartItems.appendChild(listItem);
    
          total += item.price;
      });
    
      totalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
    
    // Função para atualizar a sacola
    function updateBag() {
      bagItems.innerHTML = ""; // Limpa a sacola
      let total = 0;
    
      cart.forEach((item, index) => {
          const listItem = document.createElement("li");
          listItem.style.display = "flex";
          listItem.style.alignItems = "center";
          listItem.style.marginBottom = "10px";
    
          // Imagem do item
          const img = document.createElement("img");
          img.src = item.src;
          img.style.width = "50px";
          img.style.height = "50px";
          img.style.marginRight = "10px";
    
          // Detalhes do item
          const details = document.createElement("span");
          details.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
          details.style.flexGrow = "1";
    
          // Botão para remover item
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "Excluir";
          removeBtn.style.backgroundColor = "red";
          removeBtn.style.color = "white";
          removeBtn.style.border = "none";
          removeBtn.style.borderRadius = "5px";
          removeBtn.style.padding = "2px 8px";
          removeBtn.style.fontSize = "12px";
          removeBtn.style.marginLeft = "10px";
          removeBtn.style.cursor = "pointer";
    
          // Função para remover o item
          removeBtn.addEventListener("click", function () {
              removeItem(index);
          });
    
          listItem.appendChild(img);
          listItem.appendChild(details);
          listItem.appendChild(removeBtn);
          bagItems.appendChild(listItem);
    
          total += item.price;
      });
    
      bagTotalPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
    
    // Função para remover um item do carrinho
    function removeItem(index) {
      cart.splice(index, 1); // Remove o item pelo índice
      updateCart();
      updateBag();
    }
    
    // Mostrar sacola
    viewBagBtn.addEventListener("click", function () {
      updateBag();
      bagModal.style.display = "flex";
    });
    
    // Fechar sacola
    closeBagBtn.addEventListener("click", function () {
      bagModal.style.display = "none";
    });
    
    // Limpar sacola
    clearBagBtn.addEventListener("click", function () {
      cart = [];
      updateCart();
      updateBag();
    });
    });
    