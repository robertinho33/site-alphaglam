<<?php

//Pegando dados vidos do formulário
$nome = 'nome';
$email = 'email';
$celular = 'celular';
$mensagem = 'mensagem';

//Configurações credenciais
$dbHost = 'localhost';
$dbUserName = 'root';
$dbPassword = '';
$dbName = 'sitealpha';

//conexão com o banco de dados
$conn = new mysqli($dbHost, $dbUserName, $dbPassword, $dbName);

//Verificar a conexão
if($conn->connect_error)
{
die("Falha ao se comuicar com o anco de dados ".$conn->connect_error);
}
else {
  echo "certo";
}
 ?>
