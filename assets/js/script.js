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

async function finalizarCompra() {
    if (sacola.length === 0) {
        alert("Sua sacola está vazia!");
        return;
    }

    const nomeCliente = prompt("Digite seu nome:");
    const telefoneCliente = prompt("Digite seu telefone (com DDD):");

    if (!nomeCliente || !telefoneCliente) {
        alert("Nome e telefone são obrigatórios!");
        return;
    }

    const formaPagamento = document.getElementById("forma-pagamento").value;
    let total = 0;
    const itensPedido = sacola.map(item => {
        total += item.preco;
        return `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    }).join(", ");

    const dadosPedido = {
        nomeCliente,
        telefone: telefoneCliente,
        itens: itensPedido,
        total: total.toFixed(2),
        pagamento: formaPagamento
    };

    // Enviar pedido para o Google Sheets
    const webhookURL = "https://script.google.com/macros/library/d/1FkIZyzRaBdt7187pEDiV1WbLNrurPIG35a6CjkiWy4A3vN66pktQGA2d/2"; // Substitua pela URL do Apps Script
    
    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            body: JSON.stringify(dadosPedido),
            headers: { "Content-Type": "application/json" }
        });
        

        const resposta = await response.json();
        if (resposta.success) {
            alert("Pedido enviado com sucesso!");
            
            // Criar a mensagem do WhatsApp
            const mensagemWhatsApp = encodeURIComponent(
                `Novo Pedido!%0A%0A` +
                `Nome: ${nomeCliente}%0A` +
                `Telefone: ${telefoneCliente}%0A` +
                `Itens: ${itensPedido}%0A` +
                `Total: R$ ${total.toFixed(2)}%0A` +
                `Forma de Pagamento: ${formaPagamento}`
            );

            // Redirecionar para o WhatsApp
            window.open(`https://wa.me/+5511986215473?text=${mensagemWhatsApp}`, "_blank");

            // Limpar a sacola após o pedido
            limparSacola();
        } else {
            throw new Error(resposta.error);
        }
    } catch (erro) {
        console.error("Erro ao salvar pedido:", erro);
        alert("Erro ao salvar pedido. Tente novamente.");
    }
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVenp_Ev_M0cPa_IGoEuPDNBfgz26dAUU",
  authDomain: "novo-b4adb.firebaseapp.com",
  projectId: "novo-b4adb",
  storageBucket: "novo-b4adb.firebasestorage.app",
  messagingSenderId: "578134453072",
  appId: "1:578134453072:web:41d485a508c128c39b9a55",
  measurementId: "G-Z3SBF4EGXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

    // ✅ Função para salvar pedidos
    async function salvarPedido(nome, telefone, itens, total, pagamento) {
        try {
            const dadosPedido = {
                data: new Date().toISOString(),
                nome: nome,
                telefone: telefone,
                itens: itens,
                total: parseFloat(total),
                pagamento: pagamento
            };

            // Salvar no Firestore na coleção "pedidos"
            await addDoc(collection(db, "pedidos"), dadosPedido);
            alert("Pedido salvo com sucesso!");

            // Criar mensagem para o WhatsApp
            const mensagemWhatsApp = encodeURIComponent(
                `Novo Pedido!%0A%0A` +
                `Nome: ${nome}%0A` +
                `Telefone: ${telefone}%0A` +
                `Itens: ${itens}%0A` +
                `Total: R$ ${parseFloat(total).toFixed(2)}%0A` +
                `Forma de Pagamento: ${pagamento}`
            );

            window.open(`https://wa.me/+5511986215473?text=${mensagemWhatsApp}`, "_blank");

            document.getElementById("pedidoForm").reset();
        } catch (erro) {
            console.error("Erro ao salvar pedido:", erro);
            alert("Erro ao salvar pedido. Tente novamente.");
        }
    }

    // 📌 Evento de envio do formulário de pedidos
    document.getElementById("pedidoForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("nomePedido").value;
        const telefone = document.getElementById("telefone").value;
        const itens = document.getElementById("itens").value;
        const total = document.getElementById("total").value;
        const pagamento = document.getElementById("pagamento").value;
        await salvarPedido(nome, telefone, itens, total, pagamento);
    });


