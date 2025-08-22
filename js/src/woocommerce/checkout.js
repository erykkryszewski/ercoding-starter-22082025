document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('woocommerce-checkout')) {
    let shopHeroHTML =
      '' +
      '<div class="shop-hero">' +
      '<div class="container">' +
      '<h1 class="shop-hero__title">Kasa</h1>' +
      '</div>' +
      '</div>';

    let mainElement = document.querySelector('main#main');
    if (mainElement) {
      mainElement.insertAdjacentHTML('afterbegin', shopHeroHTML);
    }
  }
});
