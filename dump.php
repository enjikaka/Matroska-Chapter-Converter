<?php
$cont = isset($_GET['c']) ? $_GET['c'] : null;
if ($cont == null) die('No content.');
$fn = 'tmp_'+time();
file_put_contents($fn, $cont);

header('Content-type: text/plain');
header('Content-Disposition: attachment; filename="'.time().'.srt"');

readfile($fn);
unlink($fn);
?>