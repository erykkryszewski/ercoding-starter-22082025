document.addEventListener('DOMContentLoaded', function () {
  let gallery = document.querySelector('.woocommerce-product-gallery');
  let summary = document.querySelector('.summary');

  if (gallery && summary) {
    let wrapper = document.createElement('div');
    wrapper.className = 'single-product-content';
    gallery.parentNode.insertBefore(wrapper, gallery);
    wrapper.appendChild(gallery);
    wrapper.appendChild(summary);
  }

  let flexControlNav = document.querySelector('.single-product-content .flex-control-nav');
  if (flexControlNav && typeof jQuery !== 'undefined' && jQuery(flexControlNav).slick) {
    jQuery(flexControlNav).slick({
      dots: true,
      arrows: false,
      infinite: false,
      speed: 550,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      cssEase: 'ease-out',
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 5,
          },
        },
      ],
    });

    let prev = document.querySelector('.slick-prev');
    let next = document.querySelector('.slick-next');
    let dots = document.querySelectorAll('ul.slick-dots > li > button');

    if (prev) prev.textContent = '';
    if (next) next.textContent = '';
    dots.forEach(function (btn) {
      btn.textContent = '';
    });
  }
});
