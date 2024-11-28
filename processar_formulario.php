<?php
// Dados de conexão com o banco de dados
$host = 'localhost';
$user = 'root'; // Nome de usuário correto para o XAMPP por padrão
$password = ''; // Senha padrão do usuário root no XAMPP (geralmente vazia)
$dbname = 'alpha_db'; // Nome do banco de dados correto

// Cria a conexão
$connex = new mysqli($host, $user, $password, $dbname);

// Verifica se houve algum erro na conexão
if ($connex->connect_errno) {
    echo "Erro: " . $connex->connect_error;
} else {
    echo "Certo";
}

/*
 * Descrição: Método responsável por 
 * 
 
*try {
    * Conexão com o banco de dados usando PDO
    *$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    *$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    * Verificar se os dados foram enviados pelo formulário
   * if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    *    $nome = $_POST['nome'];
       * $email = $_POST['instagram'];
*
    *    // Inserir os dados na tabela
    *    $sql = "INSERT INTO usuarios (nome, instagram) VALUES (:nome, :instagram)";
    *    $stmt = $conn->prepare($sql);
    *    $stmt->bindParam(':nome', $nome);
    *    $stmt->bindParam(':instagram', $email);
*
    *    $stmt->execute();
*
       * echo "Dados inseridos com sucesso!";
   * }
*} catch (PDOException $e) {
    *echo "Erro ao conectar com o banco de dados: " . $e->getMessage();
*}*/
?>
