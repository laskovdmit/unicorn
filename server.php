<?php
// echo var_dump($_POST);
$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$phone = $_POST['phone'];
$whishes = $_POST['whishes'];

echo $name;
echo "  ";
echo $phone;
echo "  ";
echo $whishes;
// echo var_dump($_POST);

$to = 'swiffy@mail.ru';
$subject = 'Заявка с сайта unicorn.ru';
$message = 'Имя:' . $name . '<br />' . 'Телефон' . $phone . '<br />' . 'Пожелания' . $whishes;
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

mail($to, $subject, $message, $headers);
?>
