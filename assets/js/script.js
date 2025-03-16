let sacola = [];
let produtos = [];

async function carregarProdutos() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcl5R1I3Wf7hXsmDdr4wBzQ7qpt4hIgHrTBqTvuxL5KF6wZDeJT32ppYJCgJef0plAxBCjMvb7XBLo/pub?gid=0&single=true&output=tsv";

    try {
        const response = await fetch(url);
        const data = await response.text();
        const linhas = data.split("\n");
        const cabecalho = linhas[0].split("\t").map(h => h.trim().toLowerCase());

        const indiceNome = cabecalho.indexOf("nome");
        const indicePreco = cabecalho.indexOf("valor_de_presente");
        const indiceImagem = cabecalho.indexOf("link_foto_principal");
        const indiceDescricao = cabecalho.indexOf("descricao");
        const indiceCategoria = cabecalho.indexOf("categorias");

        if (indiceNome === -1 || indicePreco === -1 || indiceCategoria === -1) {
            console.error("Erro: Colunas obrigatórias não encontradas!");
            return;
        }

        let categorias = new Set();

        produtos = linhas.slice(1).map(linha => {
            const colunas = linha.split("\t");
            const categoria = colunas[indiceCategoria]?.trim() || "Sem Categoria";
            categorias.add(categoria);

            return {
                nome: colunas[indiceNome] || "Produto Sem Nome",
                preco: parseFloat(colunas[indicePreco]) || 0,
                imagem: colunas[indiceImagem] || "https://via.placeholder.com/250x250?text=Imagem+Indispon%C3%ADvel",
                descricao: colunas[indiceDescricao] || "Descrição indisponível",
                categoria: categoria
            };
        });

        carregarCategorias([...categorias]);
        exibirProdutos(produtos);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function carregarCategorias(categorias) {
    const select = document.getElementById("categoriaFiltro");
    select.innerHTML = `<option value="Todos">Todos</option>`;
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function exibirProdutos(listaProdutos) {
    const container = document.getElementById("produtos");
    container.innerHTML = "";

    listaProdutos.forEach((produto) => {
        if (produto.nome && produto.preco) {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";

            card.innerHTML = `
                <div class="card">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text"><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
                      
                       <button class="btn btn-info" onclick="mostrarDescricao('${produto.nome}', \`${produto.descricao.replace(/`/g, "\\`")}\`)">Detalhes</button>
                       <button class="btn-comprar" onclick="adicionarSacola('${produto.nome}', ${produto.preco})">Comprar</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

function adicionarSacola(nome, preco) {
    sacola.push({ nome, preco });
    atualizarSacola();
}

function removerItem(index) {
    sacola.splice(index, 1);
    atualizarSacola();
}

function limparSacola() {
    sacola = [];
    atualizarSacola();
}

function atualizarSacola() {
    const itensSacola = document.getElementById("itens-sacola");
    const totalSacola = document.getElementById("total-sacola");
    itensSacola.innerHTML = "";

    let total = 0;
    sacola.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "sacola-item";
        itemDiv.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">X</button>
        `;
        itensSacola.appendChild(itemDiv);
        total += item.preco;
    });

    totalSacola.innerText = total.toFixed(2);
}

function toggleSacola() {
    document.getElementById("sacola").classList.toggle("mostrar");
}

function finalizarCompra() {
    if (sacola.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    const formaPagamento = document.getElementById("forma-pagamento").value;
    let total = 0;
    const mensagem = sacola.map(item => {
        total += item.preco;
        return `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    }).join("%0A");

    const mensagemFinal = `Meu pedido:%0A${mensagem}%0A%0ATotal: R$ ${total.toFixed(2)}%0AForma de pagamento: ${formaPagamento}`;

    window.open(`https://wa.me/+(55)11986215473?text=${mensagemFinal}`, "_blank");
}

function voltarCompras() {
    toggleSacola();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function filtrarProdutos() {
    const categoriaSelecionada = document.getElementById("categoriaFiltro").value;
    if (categoriaSelecionada === "Todos") {
        exibirProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(produto => produto.categoria === categoriaSelecionada);
        exibirProdutos(produtosFiltrados);
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
