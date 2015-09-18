<?
/****************************************************
* OBR: Delivery
*
* Copyright © 2013 Open Business Solutions Ltd.  
*
* All rights to this product belong to Open business solutions, LLC
* All rights reserved and protected by Russian and international copyright laws.
* Any changes, distribution and sale can be made only with the written permission of the copyright holder.
*
* Copyright holder: http://www.open-bs.ru
* Support: dostavka.support@open-bs.ru
*
*****************************************************/
?>
<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die(); ?><?
    


define("ADMIN_SECTION", true);
$APPLICATION->restartBuffer();
if(isset($_GET['login']))
{
    header("Location: ./?");
    exit;
}
?>
<script type="text/javascript" src="<?= SITE_TEMPLATE_PATH . "/js/jquery-1.6.4.min.js" ?>"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('form[name="form_auth"]').attr('target', '');
	});
</script>
<?
$APPLICATION->AuthForm();
?>