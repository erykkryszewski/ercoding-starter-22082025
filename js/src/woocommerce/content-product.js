document.addEventListener('DOMContentLoaded', function () {
  function wrapProductElements() {
    let productImages = document.querySelectorAll('.products > li > a > img');
    productImages.forEach(function (img) {
      if (!img.parentElement.classList.contains('product__image')) {
        let wrapper = document.createElement('div');
        wrapper.className = 'product__image';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      }
    });

    let productButtons = document.querySelectorAll('.products > li > a.button.product__button');
    productButtons.forEach(function (btn) {
      if (!btn.parentElement.classList.contains('product__button-wrapper')) {
        let wrapper = document.createElement('div');
        wrapper.className = 'product__button-wrapper';
        btn.parentNode.insertBefore(wrapper, btn);
        wrapper.appendChild(btn);
      }
    });
  }

  wrapProductElements();

  let domObserver = new MutationObserver(function () {
    wrapProductElements();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });
});
