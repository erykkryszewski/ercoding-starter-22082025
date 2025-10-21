<?php
$url = "http://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
$background = get_field("background");
$section_id = get_field("section_id");
$gallery = get_field("gallery");
$full_width = get_field("full_width");
$speed = get_field("speed");
$pause_on_hover = get_field("pause_on_hover");

$data_speed_value = "140";
if (!empty($speed)) {
    $data_speed_value = (string) $speed;
}

$data_pause_value = "false";
if (is_string($pause_on_hover) && $pause_on_hover === "true") {
    $data_pause_value = "true";
}
?>

<?php if (!empty($gallery)): ?>
<div class="gallery <?php if ($background === 'true') { echo 'gallery--background'; } ?>">
    <?php if (!empty($section_id)): ?>
    <div class="section-id" id="<?php echo esc_html($section_id); ?>"></div>
    <?php endif; ?>
    <div class="<?php if ($full_width === 'true') { echo 'container-fluid container-fluid--padding'; } else { echo 'container'; } ?>">
        <div class="gallery__wrapper">
            <div class="gallery__viewport">
                <div class="gallery__items" data-speed="<?php echo esc_attr($data_speed_value); ?>" data-pause="<?php echo esc_attr($data_pause_value); ?>">
                    <?php foreach ($gallery as $key => $item): ?>
                    <div class="gallery__item">
                        <?php $full_image_src = ''; if (!empty($item['image'])) { $src_arr = wp_get_attachment_image_src($item['image'], 'full'); if (!empty($src_arr) && !empty($src_arr[0])) { $full_image_src = $src_arr[0]; } } ?> <?php if (!empty($item['image']) && !empty($full_image_src)): ?>
                        <a class="gallery__image <?php if ($full_width === 'true') { echo 'gallery__image--full-width'; } ?>" data-fancybox="gallery" href="<?php echo esc_url($full_image_src); ?>">
                            <?php echo wp_get_attachment_image($item['image'], 'large', false, [ 'class' => 'object-fit-cover', 'alt' => 'galeria-' . ($key + 1), 'title' => 'galeria-' . ($key + 1), 'loading' => 'eager', 'decoding' => 'async', ]); ?>
                        </a>
                        <?php endif; ?>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php endif; ?>
