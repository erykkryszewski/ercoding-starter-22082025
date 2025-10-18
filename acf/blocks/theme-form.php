<?php
$url = "http://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
$background = get_field("background");
$section_id = get_field("section_id");

$form_id = get_field("form_id");

?>

<?php if (!empty($form_id)): ?>
<div class="theme-form <?php if ($background == 'true') { echo 'theme-form--background'; } ?>"
>
    <?php if (!empty($section_id)): ?>
    <div class="section-id" id="<?php echo esc_html($section_id); ?>"></div>
    <?php endif; ?>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-xl-8 offset-xl-2">
                <div class="theme-form__form ercoding-form"><?php echo gravity_form($form_id, false, false, false, '', false, 11); ?></div>
            </div>
        </div>
    </div>
</div>
<?php endif; ?>
