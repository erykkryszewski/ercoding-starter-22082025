<?php
$url = "http://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
$section_id = get_field("section_id");
$background = get_field("background");

$cards = get_field("cards");

?>

<?php if(!empty($cards)): ?>
<div class="flip-cards <?php if(!empty($background)) { echo 'flip-cards--background';}?>">
    <?php if(!empty($section_id)):?>
    <div class="section-id" id="<?php echo esc_html($section_id);?>"></div>
    <?php endif;?>
    <div class="container">
        <div class="flip-cards__wrapper">
            <div class="row">
                <?php foreach($cards as $key => $item): ?>
                <div class="col-12 col-md-6">
                    <div class="flip-cards__column">
                        <div class="flip-cards__item <?php if(!empty($item['flip_image'])) { echo 'flip-cards__item--has-flip';}?>">
                            <?php if(!empty($item['link'])):?>
                            <a class="cover" href="<?php echo esc_url_raw($item['link']['url']);?>"></a>
                            <?php endif;?> <?php if(!empty($item['small_info'])):?>
                            <div class="flip-cards__small-info"><?php echo esc_html($item['small_info']);?></div>
                            <?php endif;?> <?php if(!empty($item['image'])): ?>
                            <div class="flip-cards__image <?php if(!empty($item['flip_image'])) { echo 'flip-cards__image--has-flip';}?>">
                                <?php echo wp_get_attachment_image($item['image'], 'large', '', ['class' => 'object-fit-cover']); ?> <?php if(!empty($item['flip_image'])): ?> <?php echo wp_get_attachment_image($item['flip_image'], 'large', '', ['class' => 'object-fit-cover flip-image']); ?> <?php endif;?>
                            </div>
                            <?php endif;?>
                            <div class="flip-cards__content"><?php echo apply_filters('the_title', $item['content']);?></div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>
<?php endif;?>
