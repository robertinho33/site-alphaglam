<?php
// Cabeçalho PHP (pode adicionar lógica aqui se necessário)
header('Content-Type: text/html; charset=UTF-8');
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loja Ro - Vendas Online</title>
    <link rel="stylesheet" href="assets/css/w.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
    <!-- Menu de Navegação -->
    <nav class="menu">
        <div class="logo"><?= "RoPHP Loja" ?></div>
        <div class="search-bar">
            <input type="text" placeholder="Buscar produtos...">
        </div>
        <div class="nav-links">
            <a href="#">Categorias</a>
            <a href="#">Ofertas</a>
            <a href="#">Minha Conta</a>
            <a href="#">Carrinho</a>
            <button id="login-btn">Login com Google</button>
            <button id="logout-btn" style="display: none;">Sair</button>
        </div>
    </nav>

    <!-- Cabeçalho -->
    <header>
        <h1><?= "Minha Loja Roberto" ?></h1>
        <p><?= "Os melhores produtos com os melhores preços!" ?></p>
    </header>

    <!-- Seção dos Produtos -->
    <section class="produtos">
        <?php
        // Exemplo de produtos dinâmicos (pode vir de um banco de dados ou array)
        $produtos = [
            ["nome" => "Produto 1", "descricao" => "Descrição breve do produto.", "preco" => 29.90],
            ["nome" => "Produto 2", "descricao" => "Descrição breve do produto.", "preco" => 49.90],
            ["nome" => "Produto 3", "descricao" => "Descrição breve do produto.", "preco" => 19.90]
        ];

        foreach ($produtos as $produto) {
            echo "<div class='produto'>";
            echo "<h2>{$produto['nome']}</h2>";
            echo "<p>{$produto['descricao']}</p>";
            echo "<p><strong>R$ " . number_format($produto['preco'], 2, ',', '.') . "</strong></p>";
            echo "<button onclick=\"adicionarProduto('{$produto['nome']}', {$produto['preco']})\">Adicionar ao Banco</button>";
            echo "</div>";
        }
        ?>
    </section>

    <!-- Rodapé -->
    <footer>
        <p><?= "© " . date("Y") . " Minha Loja Virtual - Todos os direitos reservados" ?></p>
    </footer>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"></script>

    <!-- Configuração do Firebase -->
    <script>
        window.addEventListener("load", function() {
            console.log("Página carregada, verificando Firebase...");

            if (typeof firebase === "undefined") {
                console.error("Firebase SDK não carregou.");
                alert("Erro: Firebase SDK não carregou. Verifique sua conexão ou o servidor.");
                fetch("https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js")
                    .then(response => {
                        console.log("Status firebase-app.js:", response.status);
                        if (!response.ok) throw new Error("Falha ao carregar firebase-app.js");
                        return fetch("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
                    })
                    .then(response => {
                        console.log("Status firebase-firestore.js:", response.status);
                        if (!response.ok) throw new Error("Falha ao carregar firebase-firestore.js");
                        console.log("Scripts estão acessíveis, problema é no servidor.");
                    })
                    .catch(err => {
                        console.error("Erro ao testar CDN:", err);
                        alert("Erro ao acessar a CDN do Firebase: " + err.message);
                    });
            } else {
                console.log("Firebase SDK carregado com sucesso!");
                initializeFirebase();
            }
        });

        function initializeFirebase() {
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

            try {
                const app = firebase.initializeApp(firebaseConfig);
                const auth = firebase.auth();
                const db = firebase.firestore();
                console.log("Firebase inicializado com sucesso!");

                // Login com Google
                const provider = new firebase.auth.GoogleAuthProvider();
                window.login = function() {
                    auth.signInWithPopup(provider)
                        .then((result) => {
                            const user = result.user;
                            console.log("Usuário logado:", user.displayName);
                            alert("Login bem-sucedido!");
                        })
                        .catch((error) => {
                            console.error("Erro no login:", error);
                            alert("Erro ao realizar login: " + error.message);
                        });
                };

                // Logout
                window.logout = function() {
                    auth.signOut()
                        .then(() => {
                            console.log("Usuário deslogado");
                            alert("Logout realizado com sucesso!");
                        })
                        .catch((error) => {
                            console.error("Erro ao sair:", error);
                            alert("Erro ao sair: " + error.message);
                        });
                };

                // Verificar estado de autenticação
                auth.onAuthStateChanged((user) => {
                    const btnLogin = document.getElementById("login-btn");
                    const btnLogout = document.getElementById("logout-btn");
                    if (user) {
                        btnLogin.style.display = "none";
                        btnLogout.style.display = "block";
                    } else {
                        btnLogin.style.display = "block";
                        btnLogout.style.display = "none";
                    }
                });

                // Adicionar produto ao Firestore
                window.adicionarProduto = function(nome, preco) {
                    console.log("Tentando adicionar produto:", nome, preco);
                    db.collection("produtos").add({
                        nome: nome,
                        preco: preco,
                        data: new Date().toISOString()
                    })
                    .then((docRef) => {
                        console.log("Produto adicionado com ID:", docRef.id);
                        alert("Produto " + nome + " adicionado com sucesso!");
                    })
                    .catch((error) => {
                        console.error("Erro ao adicionar produto:", error);
                        alert("Erro ao adicionar produto: " + error.message);
                    });
                };
            } catch (error) {
                console.error("Erro ao inicializar Firebase:", error);
                alert("Erro ao inicializar Firebase: " + error.message);
            }
        }

        // Adicionar eventos de clique
        document.getElementById("login-btn").addEventListener("click", login);
        document.getElementById("logout-btn").addEventListener("click", logout);
    </script>

    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>