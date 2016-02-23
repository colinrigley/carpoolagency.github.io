/*
 * Startup
 * Copyright 2015, Binh Nguyen, Carpool Agency
 * http://carpoolagency.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Friday Oct 16 2015
 */

// Footer Navigation binding
var showMessageForm = function() {
    // Do nothing if whole top footer not showing
    if ($('.footerTopContainer').css('position') === "fixed") {
        return;
    }

    if ($(".footer .footerTopContainer .textBottom .tableText").text() === "Stalk us on Instagram. We don't mind.") {
        $(".footer .footerTopContainer .textBottom .tableText").fadeOut(200, function() {
            $(this).text("Send us a love letter").fadeIn(200);
        });
    }
    if ($(".footer .messageFormBackground").is(':hidden')) {
        $(".footer .messageFormBackground").slideDown(200);
    }
    $(".footerTopContainer").css("height", "auto");
};

var hideMessageForm = function() {
    if ($(".footer .footerTopContainer .textBottom .tableText").text() === "Send us a love letter") {
        $(".footer .footerTopContainer .textBottom .tableText").fadeOut(200, function() {
            $(this).text("Stalk us on Instagram. We don't mind.").fadeIn(200);
        });
    }

    if ($(".footer .messageFormBackground").is(':visible')) {
        $(".footer .messageFormBackground").slideUp(200);
    }
    $(".footerTopContainer").css("height", "auto");
};

var showContactFormDropdown = function() {
    $(".footer .contactFormDropdownContainer").slideDown(200);
};

var hideContactFormDropdown = function() {
    $(".footer .contactFormDropdownContainer").slideUp(200);
};

var showLocationDropdown = function() {
    $(".footer .locationDropdownContainer").slideDown(200);
};

var hideLocationDropdown = function() {
    $(".footer .locationDropdownContainer").slideUp(200);
};

$(function() {
    // IE scrolling override for smooth fixed position background effect
    if (navigator.userAgent.match(/Trident\/7\./)) {
        $('body').on("mousewheel", function() {
            event.preventDefault();

            var wheelDelta = event.wheelDelta;

            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });

        $('body').keydown(function(e) {

            var currentScrollPosition = window.pageYOffset;

            switch (e.which) {

                case 38: // up
                    e.preventDefault(); // prevent the default action (scroll / move caret)
                    window.scrollTo(0, currentScrollPosition - 120);
                    break;

                case 40: // down
                    e.preventDefault(); // prevent the default action (scroll / move caret)
                    window.scrollTo(0, currentScrollPosition + 120);
                    break;

                default:
                    return; // exit this handler for other keys
            }
        });
    }

    var currentPage = "";
    var isWelcomePage = false;
    var isAboutPage = false;
    var isArticlePage = false;
    var isScrollingAnimation = false;
    var isScrollingToSubSection = false;

    // Set the active class for the navigation
    // Parameter is the href attribute for the navigation to be active
    var activeNavAnchors = function(href) {
        if ($(".pageNavLink.active").length > 0) {
            $(".pageNavLink.active").removeClass("active");
        }
        $(".pageNavLink[href='" + href + "']").addClass("active");
    };

    // Check the page
    if ($("#welcome").length > 0) {
        currentPage = "welcome";
        isWelcomePage = true;
        if (window.location.hash === "#approach") {
            activeNavAnchors("/#approach");
        }
        else if (window.location.hash === "#approached") {
            isScrollingAnimation = true;
            isScrollingToSubSection = true;
            activeNavAnchors("/#approach");
            window.location.hash = '';
            $('html,body').animate({
                scrollTop: $("#approach").offset().top
            }, 500, function() {
                isScrollingAnimation = false;
                isScrollingToSubSection = false;
            });
        }
    } else if ($("#about").length > 0) {
        currentPage = "about";
        isAboutPage = true;
    } else if ($("#work").length > 0) {
        currentPage = "work";
    } else if ($("#thoughts").length > 0) {
        currentPage = "thoughts";

        // Hide extra post for LoadMore function
        var $postList = $(".postList li");
        if ($postList.length < 4) { // Hide the loadMore if there is less than 4 posts
            $(".loadMoreArticlesContainer").hide();
        } else { // Bind click on loadMore to show all post
            $(".loadMoreArticles").unbind('click').bind('click', function() {
                $postList.show();
                $(".loadMoreArticlesContainer").hide();
            });
        }
    } else if ($("#connect").length > 0) {
        currentPage = "connect";
    } else if ($("#postArticle").length > 0) {
        currentPage = "postArticle";
        isArticlePage = true;
    }

    // Down Arrow click event
    $(".topMediaContainer .downArrow").unbind("click").bind("click", function(event) {
        $('html,body').animate({
            scrollTop: $(".topMediaContainer").height() - 66
        }, 1000, function() {
            isScrollingAnimation = false;
        });
        return;
    });

    // Down Arrow Text (on Thoughts Page)
    $(".topMediaContainer .downArrowText").unbind("click").bind("click", function(event) {
        $('html,body').animate({
            scrollTop: $(".topMediaContainer").height() - 66
        }, 1000, function() {
            isScrollingAnimation = false;
        });
        return;
    });

    // TODO: ask if we still need this, hard to see.
    // TODO: maybe animate
    // Fades opacity of down arrow as scroll position changes.
    // var showArrow = function() {
    //     if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "0.3") {
    //         $(".downArrowContainer .downArrowText").fadeTo(100, 1);
    //     }
    //     if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
    //         $(".downArrowContainer .downArrow").fadeTo(100, 1);
    //     }
    // };
    // var blurArrow = function() {
    //     if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "1") {
    //         $(".downArrowContainer .downArrowText").fadeTo(400, 0.3);
    //     }
    //
    //     if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
    //         $(".downArrowContainer .downArrow").fadeTo(400, 0.3);
    //     }
    // };

    // Smooth transition between pages
    // TODO: only the welcome page uses this. Get rid of if we separate this.
    $(".pageNavLink").unbind("click").bind("click", function(event) {
        // Smooth transition to approach on Welcome page
        if (isWelcomePage && $(this).attr("href") === "/#approach") {
            event.preventDefault();
            isScrollingAnimation = true;
            $('html,body').animate({
                scrollTop: $("#approach").offset().top
            }, 1000, function() {
                activeNavAnchors("/#approach");
                isScrollingAnimation = false;
            });
            return;
        } else if (!isWelcomePage && $(this).attr("href") === "/#approach") {
            event.preventDefault();
            window.location.href = "/#approached";
            return;
        } else if (isWelcomePage && $(this).attr("href") === "/") {
            event.preventDefault();
            isScrollingAnimation = true;
            $('html,body').animate({
                scrollTop: 0
            }, 1000, function() {
                isScrollingAnimation = false;
            });
            return;
        }
    });

    var upperTopMediaAnchorMark = 300;
    var lowerPageFooterAnchorMark = 100;
    // Scrolling event binding
    $(window).scroll(function(event) {
        var self = this;
        var st = $(this).scrollTop(); // Current page position

        var upperTopMediaAnchor = $(".topMediaContainer").height() - upperTopMediaAnchorMark;

        var topMediaAnchor = $(".topMediaContainer").height();
        var lowerPageFooterAnchor = $(".carpool-page").height() - lowerPageFooterAnchorMark;

        if (st < upperTopMediaAnchor) { // Top media portion
            if (isWelcomePage && !isScrollingToSubSection) {
                activeNavAnchors("/");
            }
        } else if (st >= upperTopMediaAnchor && st <= topMediaAnchor) { // Bottom media portion
     
            if (isWelcomePage && !isScrollingToSubSection) {
                activeNavAnchors("/");
            }
        } else if ((st > topMediaAnchor && st < lowerPageFooterAnchor) || st > lowerPageFooterAnchor) { // Content portion
            // Activate service nav anchor for welcome page
            if (isWelcomePage) {
                activeNavAnchors("/#approach");
            }
        }
    });

    // Contact form
    $(".footer .footerEmail").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideLocationDropdown();
        if ($(".footer .contactFormDropdownContainer").is(':hidden')) {
            showContactFormDropdown();
        } else {
            hideContactFormDropdown();
        }
    });

    // Location Dropdown
    $(".footer .footerLocation").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideContactFormDropdown();
        $(".footer .footerTopContainer .iconLink").removeClass("active");
        if ($(".footer .locationDropdownContainer").is(':hidden')) {
            $(".footer .footerLocation").parent().addClass("active");
            showLocationDropdown();
        } else {
            hideLocationDropdown();
        }
    });

    // Header shrink and logo animation
    $(document).on("scroll", function() {
        if ($(document).scrollTop() > 100) {
            $(".navContainer").addClass("shrink");
            $(".logoContainer").addClass("shrink");
        } else {
            $(".navContainer").removeClass("shrink");
            $(".logoContainer").removeClass("shrink");
        }
    });

    $('#aboutReadMore').readmore();

});
