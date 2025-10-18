<?php

$global_phone_number = get_field("global_phone_number", "options");
$global_logo = get_field("global_logo", "options");
$global_email = get_field("global_email", "options");
$global_address = get_field("global_address", "options");
$global_social_media = get_field("global_social_media", "options");
$newsletter_shortcode = get_field("newsletter_shortcode", "options");
$cookies_text = get_field("cookies_text", "options");
$google_analytics_code = get_field("google_analytics_code", "options");
$popup = get_field("popup", "options");

$footer_second_column_content = get_field("footer_second_column_content", "options");
$footer_third_column_content = get_field("footer_third_column_content", "options");

?>

<?php if(!empty($popup == 'true')):?>
            <div class="popup popup--promotion">
                <div class="popup__wrapper popup__wrapper--promotion">
                    <button class="popup__close popup__close--promotion" id="popup-close-promotion">×</button>
                    <div class="popup__content popup__content--promotion">
                        <h2 class="popup__title popup__title--promotion">Tylko teraz <span>zapoznaj się z naszą ofertą<span></h2>
                        <p>Największe promocje, które już niedługo się kończą!</p>
                        <a href="/oferta/" class="button popup__button">Zobacz ofertę</a>
                    </div>
                </div>
            </div>
        <?php endif;?>

        <footer class="footer <?php if(is_front_page()) { echo 'footer--homepage'; } ?>">
            <div class="container">
                <div class="footer__wrapper">
                    <div class="row">
                        <div class="col-12 col-lg-4">
                            <div class="footer__column">
                                <a href="/" class="footer__logo mb-4"><?php if(!empty($global_logo)) { echo wp_get_attachment_image($global_logo, 'full', '', ["class" => ""]); } else { echo 'Logo'; } ?></a>
                                <?php if(!empty($global_phone_number)):?>
                                <a href="tel:<?php echo esc_html($global_phone_number);?>" class="footer__phone ercodingtheme-phone-number">Tel: <?php echo esc_html($global_phone_number);?></a>
                                <?php endif;?> <?php if(!empty($global_email)):?>
                                <a href="mailto:<?php echo esc_html($global_email);?>" class="footer__email">Email: <?php echo esc_html($global_email);?></a>
                                <?php endif;?> <?php if(!empty($global_address)):?>
                                <div class="footer__address">
                                    <span>Adres</span>
                                    <?php echo apply_filters('acf_the_content', $global_address);?>
                                </div>
                                <?php endif;?> <?php if(!empty($global_social_media)):?>
                                <div class="social-media footer__social-media">
                                    <?php foreach($global_social_media as $key => $item):?>
                                    <a href="<?php echo esc_url_raw($item['link']);?>" target="_blank"><?php echo wp_get_attachment_image($item['icon'], 'full', '', ['class' => 'object-fit-contain']);?></a>
                                    <?php endforeach;?>
                                </div>
                                <?php endif;?>
                            </div>
                        </div>
                        <?php if(!empty($footer_second_column_content)):?>
                        <div class="col-12 col-lg-4">
                            <div class="footer__column"><?php echo apply_filters('the_title', $footer_second_column_content);?></div>
                        </div>
                        <?php endif;?> <?php if(!empty($footer_third_column_content)):?>
                        <div class="col-12 col-lg-4">
                            <div class="footer__column"><?php echo apply_filters('the_title', $footer_third_column_content);?></div>
                        </div>
                        <?php endif;?>
                    </div>
                </div>
            </div>
            <div class="bottom-bar">
                <div class="container">
                    <div class="bottom-bar__wrapper">
                        <p>
                            <?php _e('Copyright', 'ercodingtheme');?>
                            © <?php echo date("Y"); ?>&nbsp;<?php _e('Ercoding', 'ercodingtheme');?>
                        </p>
                        <p>
                            Strona stworzona przez
                            <a href="https://ercoding.pl/" target="_blank">Ercoding</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>

        <?php if($google_analytics_code): ?> <?php echo wp_kses($google_analytics_code, ['script' => ['async' => [], 'src' => []]]);?> <?php endif; ?>
    </body>
</html>
<?php wp_footer(); ?>
