
/* Ação de eventos sobre o botão menu da tag nav (mobile). */
/* Parâmetros: Nome do evento, função. */
openMenu.addEventListener('click', () => {

	/* Sobrepõe a propriedade display: none aplicada no
	   CSS por display: flex que o torna visível. */ 
	menu.style.display = "flex"

	/* Captura o tamanho do menu nav e aplica na posição. */
	menu.style.right = (menu.offsetWidth * -1) + 'px'

	/* Após 10 milésimos de segundo, adiciona o atributo style, */
	/* e adiciona as propriedades CSS.*/
	setTimeout(()=> {
		/* Faz o menu nav aparecer na velocidade em que foi
		   determinado na propriedade transition no CSS.*/
		menu.style.opacity = '1'

		/* Move o menu nav para a posição 0 a direita. Utiliza 
		   também a velocidade definida, na propriedade transition 
		   no CSS para realizar o movimento mais suave.*/
		menu.style.right = "0"

		/* Oculta o botão que torna visível o elemento nav.*/
		openMenu.style.display = 'none'
	}, 10);
})

/* Ação de eventos sobre o botão X da tag nav (mobile). */
/* Parâmetros: Nome do evento, função. */
closeMenu.addEventListener('click', () => {

	/* Faz o menu nav desaparecer na velocidade em que foi
	   determinado na propriedade transition no CSS. */
	menu.style.opacity = '0'

	/* Captura o tamanho do menu nav e aplica na posição. */
	menu.style.right = (menu.offsetWidth * -1) + 'px'

	/* Torna visível o botão que apresenta o menu nav. */
	/* openMenu.style.display = 'block'*/
	
	/* Após 200 milésimos de 1 segundo, remove o atributo style. */
	setTimeout(()=> {
		menu.removeAttribute('style')
		openMenu.removeAttribute('style')
	}, 200);
})
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

    let atendimentos = [];

    function adicionarAtendimento() {
        const nomeCliente = document.getElementById('nomeCliente').value;
        const servico = document.getElementById('servico').value;
        const profissional = document.getElementById('profissional').value;
        const formaPagamento = document.getElementById('formaPagamento').value;
        const valorServico = parseFloat(document.getElementById('valorServico').value);
        const desconto = parseFloat(document.getElementById('desconto').value) || 0;

        const valorComDesconto = valorServico - (valorServico * desconto / 100);

        atendimentos.push({ nomeCliente, servico, profissional, formaPagamento, valorServico, desconto, valorComDesconto });

        const lista = document.getElementById('listaAtendimentos');
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${nomeCliente} - ${servico} - R$ ${valorComDesconto.toFixed(2)} - ${profissional}`;
        lista.appendChild(li);

        document.getElementById('atendimento-form').reset();
    }

    function gerarExcel() {
        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const hora = now.toTimeString().split(" ")[0];
        const dataHora = `${dia}/${mes}/${now.getFullYear()} ${hora}`;
        const nomeArquivo = `Atendimento${dia}${mes}.xlsx`;

        const headers = ["Nome do Cliente", "Serviço", "Profissional", "Forma de Pagamento", "Valor Serviço (R$)", "Desconto (%)", "Valor com Desconto (R$)"];
        const data = atendimentos.map(atendimento => [
            atendimento.nomeCliente,
            atendimento.servico,
            atendimento.profissional,
            atendimento.formaPagamento,
            atendimento.valorServico.toFixed(2),
            atendimento.desconto.toFixed(2),
            atendimento.valorComDesconto.toFixed(2)
        ]);

        const totalSemDesconto = atendimentos.reduce((acc, cur) => acc + cur.valorServico, 0).toFixed(2);
        const totalComDesconto = atendimentos.reduce((acc, cur) => acc + cur.valorComDesconto, 0).toFixed(2);

        data.push([]);
        data.push(["", "", "", "Data de Geração:", dataHora]);
        data.push(["", "", "", "Totais:", totalSemDesconto, totalComDesconto]);

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Atendimentos");

        XLSX.writeFile(workbook, nomeArquivo);
    }

    function compartilharWhatsApp() {
        const mensagem = encodeURIComponent("Lista de atendimentos disponível. Faça o download para visualizar.");
        const url = `https://wa.me/?text=${mensagem}`;
        window.open(url, '_blank');
    }
