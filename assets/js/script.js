
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
    