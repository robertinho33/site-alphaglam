<?php
// Configurações do banco de dados
$host = "localhost";
$user = "root"; // Usuário do MySQL
$password = ""; // Senha do MySQL
$dbname = "cadastro_usuarios";

// Conexão com o banco de dados
$conn = new mysqli($host, $user, $password, $dbname);

// Verificar se houve erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obter dados do formulário
$nome = $_POST['nome'];
$celular = $_POST['celular'];
$instagram = $_POST['instagram'];

// Preparar e executar o comando SQL
$sql = "INSERT INTO usuarios (nome, celular, instagram) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $celular, $instagram);

if ($stmt->execute()) {
    echo "Dados cadastrados com sucesso!";
} else {
    echo "Erro ao cadastrar os dados: " . $conn->error;
}

// Fechar a conexão
$stmt->close();
$conn->close();
?>
