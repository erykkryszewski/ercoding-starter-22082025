window.addEventListener("DOMContentLoaded", function () {
    const trackNodeList = document.querySelectorAll(".gallery__items");
    if (!trackNodeList.length) return;

    const waitForImages = function (root) {
        const imagesList = Array.from(root.querySelectorAll("img"));
        if (!imagesList.length) return Promise.resolve();
        const promisesList = imagesList.map(function (img) {
            if (typeof img.decode === "function") return img.decode().catch(function () {});
            if (img.complete) return Promise.resolve();
            return new Promise(function (resolve) {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
            });
        });
        return Promise.all(promisesList);
    };

    const initSingleTrack = async function (track) {
        const viewportElement = track.closest(".gallery__viewport") || track.parentElement;
        const containerElement = track.closest(".gallery");
        if (!viewportElement || !containerElement) return;

        const baseInnerHtml = track.dataset.base || track.innerHTML;
        track.dataset.base = baseInnerHtml;
        track.innerHTML = baseInnerHtml;

        await waitForImages(track);

        const computedStyleObject = getComputedStyle(track);
        const gapValue =
            parseFloat(computedStyleObject.columnGap || computedStyleObject.gap || "0") || 0;

        const getElementWidth = function (el) {
            return el.getBoundingClientRect().width;
        };

        const measureTotalWidth = function () {
            const childrenArray = Array.from(track.children);
            const childrenWidth = childrenArray.reduce(function (sum, el) {
                return sum + getElementWidth(el);
            }, 0);
            return childrenWidth + gapValue * Math.max(0, childrenArray.length - 1);
        };

        const viewportWidth = viewportElement.getBoundingClientRect().width;
        while (measureTotalWidth() < viewportWidth * 2) {
            track.insertAdjacentHTML("beforeend", baseInnerHtml);
        }

        let widthsArray = Array.from(track.children).map(getElementWidth);

        const baseSpeedNumber = parseFloat(track.getAttribute("data-speed") || "140");
        const pauseOnHoverEnabled = String(track.getAttribute("data-pause")) === "true";

        let translateX = 0;
        let headIndex = 0;
        let lastTimestamp = performance.now();
        let isPaused = false;

        const onMouseEnter = function () {
            if (pauseOnHoverEnabled) {
                isPaused = true;
                containerElement.classList.add("is-paused");
            }
        };

        const onMouseLeave = function () {
            if (pauseOnHoverEnabled) {
                isPaused = false;
                containerElement.classList.remove("is-paused");
            }
        };

        containerElement.addEventListener("mouseenter", onMouseEnter);
        containerElement.addEventListener("mouseleave", onMouseLeave);

        if (track._raf) cancelAnimationFrame(track._raf);

        const animationStep = function (now) {
            const deltaTime = Math.min((now - lastTimestamp) / 1000, 1 / 30);
            lastTimestamp = now;

            let velocity = baseSpeedNumber;
            if (isPaused) {
                velocity = 0;
            }

            translateX -= velocity * deltaTime;

            let headWidthWithGap = widthsArray[headIndex] + gapValue;
            while (-translateX >= headWidthWithGap) {
                track.appendChild(track.firstElementChild);
                translateX += headWidthWithGap;
                headIndex = (headIndex + 1) % widthsArray.length;
                headWidthWithGap = widthsArray[headIndex] + gapValue;
            }

            track.style.transform = "translate3d(" + translateX + "px,0,0)";
            track._raf = requestAnimationFrame(animationStep);
        };

        track._raf = requestAnimationFrame(animationStep);

        let resizeTimer;
        const onWindowResize = function () {
            if (track._raf) cancelAnimationFrame(track._raf);
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                initSingleTrack(track);
            }, 150);
        };
        window.addEventListener("resize", onWindowResize, { passive: true });
    };

    Array.from(trackNodeList).forEach(initSingleTrack);
});
