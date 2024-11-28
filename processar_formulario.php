<?php
define("SERVIDOR", "localhost");
define("USUARIO", "root");
define("SENHA", "");
define("BANCO", "alpha_db");

$conexao = mysqli_connect(SERVIDOR,USUARIO,SENHA,BANCO) or die("Erro na conexão dom o servidor de dados" .mysqli_connect_error());
if($conexao->connect_errno){mysqli_set_charset($conexao, 'utf8');
    // code...
   echo "erro". $conexao->connect_error;
}else{
    echo "sucesso";
}
