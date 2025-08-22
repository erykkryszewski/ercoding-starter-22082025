document.addEventListener('DOMContentLoaded', function () {
  function moveHeaderToFirst() {
    let archiveTitleElement = document.querySelector('.woocommerce-products-header');
    let parentContainerElement = document.querySelector('#primary main#main.site-main');
    if (!archiveTitleElement || !parentContainerElement) return;
    if (parentContainerElement.firstChild === archiveTitleElement) return;
    parentContainerElement.insertBefore(archiveTitleElement, parentContainerElement.firstChild);
  }

  let isScheduled = false;
  function scheduleMove() {
    if (isScheduled) return;
    isScheduled = true;
    setTimeout(function () {
      isScheduled = false;
      moveHeaderToFirst();
    }, 50);
  }

  moveHeaderToFirst();

  let domObserver = new MutationObserver(function () {
    scheduleMove();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });
});
