document.addEventListener('DOMContentLoaded', function () {
  if (document.body.classList.contains('woocommerce-cart')) {
    let shopHeroHTML =
      '' +
      '<div class="shop-hero">' +
      '<div class="container">' +
      '<h1 class="shop-hero__title">Koszyk</h1>' +
      '</div>' +
      '</div>';

    let mainElement = document.querySelector('main#main');
    if (mainElement) {
      mainElement.insertAdjacentHTML('afterbegin', shopHeroHTML);
    }

    function updateCartAndRedirect(targetUrl) {
      let updateCartButton = document.querySelector('button.button--update-cart');
      if (updateCartButton && !updateCartButton.disabled) {
        let redirected = false;
        function doRedirect() {
          if (redirected) return;
          redirected = true;
          if (domObserver) domObserver.disconnect();
          window.location.href = targetUrl;
        }
        let domObserver = new MutationObserver(function () {
          doRedirect();
        });
        domObserver.observe(document.body, { childList: true, subtree: true });
        updateCartButton.click();
        setTimeout(function () {
          doRedirect();
        }, 2000);
      } else {
        window.location.href = targetUrl;
      }
    }

    let continueButtons = document.querySelectorAll('a.button--continue-shopping');
    continueButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        let targetUrl = this.getAttribute('href');
        updateCartAndRedirect(targetUrl);
      });
    });

    let checkoutButtons = document.querySelectorAll('a.button--checkout');
    checkoutButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        let targetUrl = this.getAttribute('href');
        updateCartAndRedirect(targetUrl);
      });
    });
  }
});
