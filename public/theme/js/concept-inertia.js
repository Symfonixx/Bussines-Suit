(function ($) {
    "use strict";

    function applyBackgrounds() {
        $(".intro[data-background], .bg-img-custom[data-background]").each(function () {
            var src = $(this).attr("data-background");
            if (src) {
                $(this).css("background-image", "url(" + src + ")");
            }
        });
    }

    function hidePreloader() {
        $("#status").fadeOut();
        $("#preloader").delay(10).fadeOut("slow");
    }

    function initCarousels() {
        if (!$.fn.carousel) {
            return;
        }
        $(".carousel").each(function () {
            var $el = $(this);
            try {
                $el.carousel($el.hasClass("carousel-big") ? { interval: 6500 } : { interval: 5000 });
            } catch (e) {
                // already initialized
            }
        });
    }

    function initWow() {
        if (typeof WOW !== "undefined") {
            new WOW().init();
        }
    }

    function initSwipebox() {
        if (!$.fn.swipebox) {
            return;
        }
        $(".swipebox").swipebox({
            useCSS: true,
            useSVG: false,
            hideCloseButtonOnMobile: false,
            hideBarsDelay: 0,
            videoMaxWidth: 1140,
            loopAtEnd: false,
            autoplayVideos: true,
        });
        $(".swipebox-video").swipebox();
    }

    function initRotator() {
        if (!$.fn.textrotator) {
            return;
        }
        $(".rotate").each(function () {
            var $el = $(this);
            if ($el.data("rotator-init")) {
                return;
            }
            $el.textrotator({ animation: "dissolve", separator: ",", speed: 3000 });
            $el.data("rotator-init", true);
        });
    }

    function initShuffle() {
        if (!$.fn.shuffle || !$("#grid").length) {
            return;
        }
        try {
            $("#grid").shuffle({ itemSelector: '[class*="col-"]' });
        } catch (e) {
            try {
                $("#grid").shuffle("update");
            } catch (err) {}
        }
    }

    function initSmartMenus() {
        if (!$.fn.smartmenus) {
            return;
        }
        $("ul.navbar-nav").each(function () {
            var $nav = $(this);
            if ($nav.data("smartmenus")) {
                try {
                    $nav.smartmenus("refresh");
                } catch (e) {}
                return;
            }
            $nav.addClass("sm").smartmenus({
                subMenusSubOffsetX: 2,
                subMenusSubOffsetY: -6,
                subIndicators: false,
                collapsibleShowFunction: null,
                collapsibleHideFunction: null,
                rightToLeftSubMenus: $nav.hasClass("navbar-right") || document.documentElement.dir === "rtl",
            });
        });
    }

    window.initConceptTheme = function () {
        if (typeof $ === "undefined") {
            return;
        }
        hidePreloader();
        applyBackgrounds();
        initCarousels();
        initWow();
        initSwipebox();
        initRotator();
        initShuffle();
        initSmartMenus();
    };

    $(function () {
        window.initConceptTheme();
    });
})(window.jQuery);
