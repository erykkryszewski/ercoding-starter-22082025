document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".ercodingtheme-phone-number").forEach(function (ercoding_el) {
        let ercoding_phone_text = ercoding_el.textContent.replace(/\D+/g, "");

        if (ercoding_phone_text.startsWith("48") && ercoding_phone_text.length === 11) {
            ercoding_phone_text = `+${ercoding_phone_text}`;
        } else if (!ercoding_phone_text.startsWith("+48") && ercoding_phone_text.length === 9) {
            ercoding_phone_text = `+48${ercoding_phone_text}`;
        }

        let match = ercoding_phone_text.match(/^\+48(\d{3})(\d{3})(\d{3})$/);
        if (match) {
            let formatted = `+48 ${match[1]} ${match[2]} ${match[3]}`;
            ercoding_el.textContent = formatted;

            let parent_link = ercoding_el.closest("a[href^='tel:']");
            if (parent_link) {
                parent_link.setAttribute("href", "tel:" + formatted.replace(/\s+/g, ""));
            }
        }
    });
});
