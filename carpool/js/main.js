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
    $(".footerTopContainer").css("height","auto");
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
    $(".footerTopContainer").css("height","auto");
};

var showLocationDropdown = function() {
    $(".footer .locationDropdownContainer").slideDown(200);
};

var hideLocationDropdown = function() {
    $(".footer .locationDropdownContainer").slideUp(200);
};

$(function() {
    var currentPage = "";
    var isWelcomePage = false;
    var isAboutPage = false;
    var isArticlePage = false;
    var isScrollingAnimation = false;
if(navigator.userAgent.match(/Trident\/7\./)) {
    $('body').on("mousewheel", function () {
        event.preventDefault();

        var wheelDelta = event.wheelDelta;

        var currentScrollPosition = window.pageYOffset;
        window.scrollTo(0, currentScrollPosition - wheelDelta);
    });

    $('body').keydown(function (e) {

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

            default: return; // exit this handler for other keys
        } 
    });
}
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
        if (window.location.hash === "#services") {
            activeNavAnchors("/#services");
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

    // DownArrow click event
    $(".topMediaContainer .downArrow").unbind("click").bind("click", function(event) { 
        $('html,body').animate( { scrollTop:$(".topMediaContainer").height() } , 1000, function() {
            isScrollingAnimation = false;
        });
        return;
    });

    $(".topMediaContainer .downArrowText").unbind("click").bind("click", function(event) { 
        $('html,body').animate( { scrollTop:$(".topMediaContainer").height() } , 1000, function() {
            isScrollingAnimation = false;
        });
        return;
    });

    // Hide the navigation logo and menu on start up for welcome page

    var showArrow = function() {
        if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "0.3") {
            $(".downArrowContainer .downArrowText").fadeTo(100, 1);
        }

        if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
            $(".downArrowContainer .downArrow").fadeTo(100, 1);
        }
    };

    var blurArrow = function() {
        if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "1") {
            $(".downArrowContainer .downArrowText").fadeTo(100, 0.3);
        }

        if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
            $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
        }
    };

    // Smooth transition between pages
    $(".pageNavLink").unbind("click").bind("click", function(event) {        
        // Smooth transition to services on Welcome page
        if (isWelcomePage && $(this).attr("href") === "/#services") {
            event.preventDefault();
            isScrollingAnimation = true;
            blurArrow();
            $('html,body').animate( { scrollTop:$("#services").offset().top } , 1000, function() {
                activeNavAnchors("/#services");
                isScrollingAnimation = false;
            });
            return;
        } else if (!isWelcomePage && $(this).attr("href") === "/#services") {
            event.preventDefault();
            window.location.href = "/#services";
            return;
        } else if (isWelcomePage && $(this).attr("href") === "/") {
            event.preventDefault();
            isScrollingAnimation = true;
            showArrow();
            $('html,body').animate( { scrollTop: 0 } , 1000, function() {
                isScrollingAnimation = false;
            });     
            return;
        } 
    });

    var lastScrollTop = 0; // Previous page position
    var minScrollEffectDistance = 50;
    var upperTopMediaAnchorMark = 180;
    var lowerPageFooterAnchorMark = 100;

    // Scrolling event binding
    $(window).scroll(function(event) {
        var self = this;
        var st = $(this).scrollTop(); // Current page position

        if (isScrollingAnimation) {
            //console.log("Prevent scroll!");
            event.preventDefault();
            return false;
        }

        var upperTopMediaAnchor = $(".topMediaContainer").height() - upperTopMediaAnchorMark;

        if (isWelcomePage) {
            upperTopMediaAnchor = $(".topMediaContainer").height() - upperTopMediaAnchorMark - $("#welcome .welcomeMenu").height() - 25;
        }

        var topMediaAnchor = $(".topMediaContainer").height();
        var lowerPageFooterAnchor = $(".carpool-page").height() - lowerPageFooterAnchorMark;

        if (st < upperTopMediaAnchor) { // Top media portion
            showArrow();
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':hidden')) {
                    $("#welcome .welcomeMenu").show();
                }
                activeNavAnchors("/");
            }
        } else if (st >= upperTopMediaAnchor && st <= topMediaAnchor) { // Bottom media portion
            blurArrow();
            if (isArticlePage) { // Don't show nav on background media for article page
            } else {
            }
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/");
            }
        } else if (st > topMediaAnchor && st < lowerPageFooterAnchor) { // Content portion

            // Activate service nav anchor for welcome page
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/#services");
            }
        } else if (st > lowerPageFooterAnchor) { // Footer portion
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/#services");
            }
        }

        lastScrollTop = st;
    });

    // Email Message
    $(".footer .footerEmail").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideLocationDropdown();
        $(".footer .footerTopContainer table .iconLink").removeClass("active");
        if ($(".footer .messageFormBackground").is(':hidden')) {
            $(".footer .footerEmail").parent().addClass("active");
            showMessageForm();
        } else {
            hideMessageForm();
        }
    });

    // Topic dropdown
    $(".footer .messageFormBackground .topicInput").unbind("click").bind("click", function(event) {
        event.preventDefault();
        if ($(".footer .messageFormBackground .topicInputDropdown").is(':hidden')) {
            $(".footer .messageFormBackground .topicInputDropdown").slideDown(200);
        } else {
            $(".footer .messageFormBackground .topicInputDropdown").slideUp(200);
        }
    });

    // Topic dropdown selection
    $(".footer .messageFormBackground .topicInputDropdown li").unbind("click").bind("click", function(event) {
        event.preventDefault();
        $(".footer .messageFormBackground .topicInput").val($(this).html());
        $(".footer .messageFormBackground .topicInputDropdown").slideUp(200);
    });

    // Location
    $(".footer .footerLocation").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideMessageForm();
        $(".footer .footerTopContainer .iconLink").removeClass("active");
        if ($(".footer .locationDropdownContainer").is(':hidden'))  {
            $(".footer .footerLocation").parent().addClass("active");
            showLocationDropdown();
        } else {
            hideLocationDropdown();
        }
    });
});