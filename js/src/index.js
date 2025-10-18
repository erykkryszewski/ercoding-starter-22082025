/**
 * External dependencies
 */
import $ from "jquery";
import "slick-carousel";
import "@fancyapps/fancybox";
// import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import 'parallax-js';

(function () {
    "use strict";

    // on full load: hide preloader and optionally scroll to products on mobile
    window.addEventListener("load", function () {
        // preloader fade-out only if jQuery is present and the API exists
        if (window.jQuery && typeof window.jQuery.fn.fadeOut === "function") {
            window.jQuery(".preloader").fadeOut(100);
        }

        // scroll to products__elements on small screens if the element exists
        if (window.jQuery && window.innerWidth < 768) {
            const hasProductsElements = window.jQuery(".products__elements").length > 0;
            if (hasProductsElements) {
                const targetOffset = window.jQuery(".products__elements").offset();
                // guard: offset() can theoretically return undefined if detached
                if (targetOffset && typeof targetOffset.top === "number") {
                    window
                        .jQuery("html, body")
                        .delay(200)
                        .animate({ scrollTop: targetOffset.top }, 1000);
                }
            }
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        if (window.jQuery) {
            // smooth scroll for anchors if not on product pages
            window.jQuery(document).on("click", 'a[href^="#"]', function (event) {
                const currentHref = String(window.location.href);
                const isProductPage =
                    currentHref.indexOf("produkt") !== -1 || currentHref.indexOf("product") !== -1;

                // do nothing on product pages
                if (isProductPage) {
                    return;
                }

                // guard invalid or empty hashes
                const hrefValue = window.jQuery(this).attr("href");
                if (!hrefValue || hrefValue === "#" || hrefValue.trim() === "") {
                    return;
                }

                // guard: target must exist
                const $target = window.jQuery(hrefValue);
                if ($target.length === 0) {
                    return;
                }

                // perform animated scroll
                event.preventDefault();
                const targetOffset = $target.offset();
                if (targetOffset && typeof targetOffset.top === "number") {
                    window.jQuery("html, body").animate({ scrollTop: targetOffset.top }, 650);
                }
            });

            // fix auto sizes attr in images
            window.jQuery('img[sizes^="auto,"]').each(function () {
                const $imageElement = window.jQuery(this);
                const sizesValue = $imageElement.attr("sizes");
                if (typeof sizesValue === "string") {
                    const cleanedSizesValue = sizesValue.replace(/^auto,\s*/, "");
                    $imageElement.attr("sizes", cleanedSizesValue);
                }
            });

            // cleanup
            window.jQuery("img[title]").removeAttr("title");
            window.jQuery("p:empty").remove();
        }

        // empty pages redirect for not logged in users
        const bodyElement = document.body;
        const mainElement = document.querySelector("main#main");
        const isLoggedIn = bodyElement.classList.contains("logged-in");
        const isHomePath = window.location.pathname === "/" || window.location.pathname === "";

        // safer emptiness check: avoid redirect on homepage and ensure truly empty
        if (!isLoggedIn && mainElement) {
            const hasChildren = mainElement.children.length > 0;
            const hasText = mainElement.textContent && mainElement.textContent.trim().length > 0;
            const isTrulyEmpty = !hasChildren && !hasText;

            if (isTrulyEmpty && !isHomePath) {
                window.location.assign("/");
            }
        }
    });
})();

/* imports */

import "./global/recaptcha";
import "./global/zoom";

/* @blocks:start */
import "./blocks/blank-button";
import "./blocks/blank-image";
import "./blocks/blog-archive";
import "./blocks/border-divider";
import "./blocks/button-banner";
import "./blocks/contact";
import "./blocks/counter";
import "./blocks/cta-hero";
import "./blocks/cta";
import "./blocks/decorated-text";
import "./blocks/faq";
import "./blocks/gallery";
import "./blocks/hero-slider";
import "./blocks/icons";
import "./blocks/iframe";
import "./blocks/list";
import "./blocks/logos";
import "./blocks/map";
import "./blocks/motto-bar";
import "./blocks/numbers";
import "./blocks/offer";
import "./blocks/products";
import "./blocks/program";
import "./blocks/section-title";
import "./blocks/shortcode";
import "./blocks/stats";
import "./blocks/subpage-hero";
import "./blocks/team";
import "./blocks/testimonials";
import "./blocks/text-image-decorated";
import "./blocks/text-images";
import "./blocks/text-with-image";
import "./blocks/thank-you";
import "./blocks/three-boxes";
import "./blocks/three-columns-content";
import "./blocks/three-images";
import "./blocks/two-buttons";
import "./blocks/two-columns-list";
import "./blocks/two-columns-text";
import "./blocks/two-images";
import "./blocks/theme-form";
import "./blocks/wyswig-content";
/* @blocks:end */

import "./sections/header";
import "./sections/navigation";
import "./sections/main";

import "./components/spacer";
import "./components/popup";
import "./components/animated-number";
import "./components/form";
import "./components/phone-number";
