<?php

// make hash from body and secret key to sign request for 
// Hypercomments api
// http://www.hypercomments.com/documentation/api-request-general/#form_sign

$secretKey = 'your-secret-key-goes-here';
$shaHash = sha1($_GET['body'] . $secretKey);

echo json_encode($shaHash);
exit();