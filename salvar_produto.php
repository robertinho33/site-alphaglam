<?php
// Configuração do banco de dados
$host = "localhost";
$user = "root"; // Usuário do banco
$password = ""; // Senha do banco
$database = "produtos"; // Nome do banco

// Conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $database);

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Captura os dados enviados pelo formulário
$nome = $_POST['nome'];
$categoria = $_POST['categoria'];
$preco_compra = $_POST['preco_compra'];
$quant_estoq = $_POST['quant_estoq'];
$descricao = $_POST['descricao'];
$data_compra = $_POST['data_compra'];

// Prepara a consulta SQL para inserir os dados
$sql = "INSERT INTO estoque_ecobelle (nome, categoria, preco_compra, quant_estoq, descricao, data_compra) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdiss", $nome, $categoria, $preco_compra, $quant_estoq, $descricao, $data_compra);

// Executa a consulta e verifica se foi bem-sucedida
if ($stmt->execute()) {
    echo "Produto cadastrado com sucesso!";
} else {
    echo "Erro ao cadastrar o produto: " . $stmt->error;
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>
