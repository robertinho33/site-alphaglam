import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// 🔹 Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3785y6GPsFH7xuwfwjcBoPjvUfE3kSMw",
    authDomain: "alphaglamstart.firebaseapp.com",
    databaseURL: "https://alphaglamstart-default-rtdb.firebaseio.com",
    projectId: "alphaglamstart",
    storageBucket: "alphaglamstart.appspot.com",
    messagingSenderId: "885178660314",
    appId: "1:885178660314:web:1bb3a78be9fa7fdcdefce3",
    measurementId: "G-094SYXW35Q"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Função para carregar produtos da planilha Google Sheets
async function carregarProdutos() {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcl5R1I3Wf7hXsmDdr4wBzQ7qpt4hIgHrTBqTvuxL5KF6wZDeJT32ppYJCgJef0plAxBCjMvb7XBLo/pub?output=csv"; // Removida a vírgula extra ❌

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na requisição: " + response.status);
        const data = await response.text();
        const linhas = data.split("\n").map(linha => linha.split(","));

        const cabecalho = linhas[0];
        const produtos = linhas.slice(1);

        const nomeIndex = cabecalho.indexOf("nome");
        const valorIndex = cabecalho.indexOf("valor_de_presente");
        const descricaoIndex = cabecalho.indexOf("descricao");
        const imagemIndex = cabecalho.indexOf("link_foto_principal");

        const container = document.querySelector(".produtos");
        container.innerHTML = "";

        produtos.forEach(produto => {
            if (produto.length < 1 || !produto[0]) return;

            const nome = nomeIndex !== -1 ? produto[nomeIndex] : "Produto sem nome";
            const valor = valorIndex !== -1 ? `R$ ${produto[valorIndex]}` : "Preço indisponível";
            const descricao = descricaoIndex !== -1 ? produto[descricaoIndex] : "Sem descrição disponível.";
            let imagem = imagemIndex !== -1 ? produto[imagemIndex].trim() : "";

            if (!imagem.startsWith("http")) {
                imagem = "https://via.placeholder.com/200";
            }

            // 🔹 Limitando caracteres
            const nomeFormatado = nome.length > 25 ? nome.substring(0, 25) + "..." : nome;
            const descricaoFormatada = descricao.length > 80 ? descricao.substring(0, 80) + "..." : descricao;

            const card = `
                <div class="produto">
                    <img src="${imagem}" alt="${nome}" onerror="this.onerror=null;this.src='https://via.placeholder.com/200';">
                    <p><strong>${nomeFormatado}</strong></p>
                    <p>Preço: ${valor}</p>
                    <p>${descricaoFormatada}</p>
                    <a href="#" class="botao-comprar">Ver mais</a>
                </div>
            `;
            container.innerHTML += card;
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        document.querySelector(".produtos").innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
}

// 🔹 Executar a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);

// ======= AUTENTICAÇÃO =======
// 🔹 Função para login com Google
function login() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // O usuário foi autenticado com sucesso
            const user = result.user;
            console.log('Login bem-sucedido:', user);
        })
        .catch((error) => {
            // Exibir mensagem de erro detalhada
            console.error('Erro ao tentar fazer login:', error.message);
            alert('Houve um erro ao tentar fazer login. Tente novamente.');
        });
}
  
// 🔹 Função para logout
function logout() {
    signOut(auth)
        .then(() => {
            alert("Logout realizado com sucesso!");
        })
        .catch((error) => {
            console.error("Erro ao sair", error);
        });
}

// 🔹 Adicionar eventos ao botão de login/logout
document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("login-btn");
    const btnLogout = document.getElementById("logout-btn");

    if (btnLogin) btnLogin.addEventListener("click", login);
    if (btnLogout) btnLogout.addEventListener("click", logout);
});

// 🔹 Verificar usuário logado
onAuthStateChanged(auth, (user) => {
    const btnLogin = document.getElementById("login-btn");
    const btnLogout = document.getElementById("logout-btn");

    if (user) {
        if (btnLogin) btnLogin.style.display = "none";
        if (btnLogout) btnLogout.style.display = "block";
    } else {
        if (btnLogin) btnLogin.style.display = "block";
        if (btnLogout) btnLogout.style.display = "none";
    }
});
