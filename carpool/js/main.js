/*
 * Startup
 * Copyright 2015, Binh Nguyen, Carpool Agency
 * http://carpoolagency.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Friday Oct 16 2015
 */
$(function() {
    var currentPage = "";
    var isWelcomePage = false;
    var isArticlePage = false;
    var isScrollingAnimation = false;

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

    // Smooth transition between pages
    $(".pageNavLink").unbind("click").bind("click", function(event) {        
        // Smooth transition to services on Welcome page
        if (isWelcomePage && $(this).attr("href") === "/#services") {
            event.preventDefault();
            isScrollingAnimation = true;
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
            $('html,body').animate( { scrollTop: 0 } , 1000, function() {
                activeNavAnchors("/");
                isScrollingAnimation = false;
            });     
            return;
        } 
    });

    // Hide the navigation logo and menu on start up for welcome page
    // if (isWelcomePage) {
    //     $(".header .logoContainer").hide();
    //     $(".header .menuContainer").hide();
    // }

    var lastScrollTop = 0; // Previous page position

    // Scrolling event binding
    $(window).scroll(function(event) {
        var self = this;

        if (isScrollingAnimation) {
            event.preventDefault();
            return false;
        }

        var st = $(this).scrollTop(); // Current page position

        var topMediaAnchor = $(".topMediaContainer").height();
        var lowerPageFooterAnchor = $(".carpool-page").height() - 100;

        console.log("current st: ", st);
        console.log("topMediaAnchor: ", topMediaAnchor);
        console.log("lowerPageFooterAnchor: ", lowerPageFooterAnchor);

        if (st > topMediaAnchor && st < lowerPageFooterAnchor) {
            if ($(".header .navContainer .transparentBg").is(':hidden')) {
                $(".header .navContainer .transparentBg").slideDown(200);
            }
            if ($(".header .logoContainer").is(':hidden')) {
                $(".header .logoContainer").slideDown(200);
            }
            if ($(".header .menuContainer").is(':hidden')) {
                $(".header .menuContainer").slideDown(200);
            }
        } else if (st > lowerPageFooterAnchor) {
            if ($(".header .navContainer .transparentBg").is(':visible')) {
                $(".header .navContainer .transparentBg").slideUp(200);
            }
        } else if (st < topMediaAnchor) {
            if ($(".header .navContainer .transparentBg").is(':visible')) {
                $(".header .navContainer .transparentBg").slideUp(200);
            }
            if ($(".header .logoContainer").is(':visible')) {
                $(".header .logoContainer").slideUp(200);
            }
            if ($(".header .menuContainer").is(':visible')) {
                $(".header .menuContainer").slideUp(200);
            }
        }



        // if (isScrollingAnimation) {
        //     event.preventDefault();
        //     return false;
        // }

        // var self = this;

        // var st = $(this).scrollTop(); // Current page position

        // var upper_anchor_offset = $(".topMediaContainer").height() - 200;
        // var lower_anchor_offset = $(".topMediaContainer").height();

        // // for Home page only
        // if (isWelcomePage) {
        //     var servicesAnchor = $("#services").offset().top - 200; 

        //     // Switch active nav anchor for home page and services
        //     if (!isScrollingAnimation) {
        //         if (st > servicesAnchor) { // services section
        //             activeNavAnchors("/#services");            
        //         } else { // welcome section
        //             activeNavAnchors("/");
        //         }
        //     }
        // }
        
        // if (st > lastScrollTop) {            
        //     // Downscroll
            
        //     lastScrollTop = st; 
            
        //     // Paper clip animation
        //     if (st > upper_anchor_offset && st < lower_anchor_offset) {
        //         if (!isScrollingAnimation) {
        //             isScrollingAnimation = true;
        //             // Scroll above the video background and pull up the content of the page
        //             $("html, body").animate({
        //                 scrollTop: lower_anchor_offset
        //             }, {
        //                 duration: 600,
        //                 complete: function() {
        //                     if ($(".header .logoContainer").is(':hidden')) {
        //                         $(".header .logoContainer").slideDown(200);
        //                     }
        //                     if ($(".header .menuContainer").is(':hidden')) {
        //                         $(".header .menuContainer").slideDown(200);
        //                     }
        //                     lastScrollTop = $(window).scrollTop();
        //                     isScrollingAnimation = false;
        //                 }
        //             });
        //         }
        //         return;
        //     }

        //     // Downscroll in content section
        //     // Other pages hide menu when not at the top
        //     if (currentPage !== "welcome") { // Other pages
        //         if ($(".header .menuContainer").is(':visible') && st > 0) {
        //             $(".header .menuContainer").slideUp(200);
        //         }
        //         if (st > upper_anchor_offset) {
        //             if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
        //                 $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
        //             }
        //         }
        //     } else { // Home page
        //         if (st > upper_anchor_offset) {
        //             if ($(".header .logoContainer").is(':hidden')) {
        //                 $(".header .logoContainer").slideDown(200);
        //             }
        //             if ($(".header .menuContainer").is(':visible') && st > lower_anchor_offset) {
        //                 $(".header .menuContainer").slideUp(200);
        //             } else if ($(".header .menuContainer").is(':hidden')) {
        //                 $(".header .menuContainer").slideDown(200);
        //             }
        //             if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
        //                 $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
        //             }
        //         }
        //     }
        // } else if (st < lastScrollTop) {
        //     // Upscroll
        //     // Show navigation logo and show navigation menu
        //     if (st > upper_anchor_offset) {
        //         if ($(".header .logoContainer").is(':hidden')) {
        //             $(".header .logoContainer").slideDown(200);
        //         }
        //         if ($(".header .menuContainer").is(':hidden')) {
        //             $(".header .menuContainer").slideDown(200);
        //         }
        //         if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
        //             $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
        //         }
        //     } else { // Hide navigation logo and hide navigation menu if close to top
        //         if (currentPage === "welcome") {
        //             if ($(".header .logoContainer").is(':visible')) {
        //                 $(".header .logoContainer").slideUp(200);
        //             }
        //             if ($(".header .menuContainer").is(':visible')) {
        //                 $(".header .menuContainer").slideUp(200);
        //             }
        //         } else {
        //             if ($(".header .logoContainer").is(':hidden')) {
        //                 $(".header .logoContainer").slideDown(200);
        //             }
        //             if ($(".header .menuContainer").is(':hidden')) {
        //                 $(".header .menuContainer").slideDown(200);
        //             }
        //         }

        //         if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
        //             $(".downArrowContainer .downArrow").fadeTo(100, 1);
        //         }
        //     }

        //     lastScrollTop = st;
        // }

        

    });



    // $(window).scroll(function() {
    //     var self = this;
    //     var anchor_offset;

    //     if (isWelcomePage) {

    //     }

    //     anchor_offset = $("#postArticle .defaultImage").height() / 2;

    //     if (!isPostArticlePage) {

    //         // Show the navigation on scrolling
    //         // Anchor offset with extra 100 height for unloaded image
    //         anchor_offset = $("#welcome .video-overlay").offset().top + $("#welcome .video-overlay").height() + 100;
    //         upper_anchor_offset = $("#welcome .outer-container").height() / 2;
    //         lower_anchor_offset = $("#welcome .outer-container").height();
    //         // var lower_anchor_offset = $("#welcome .outer-container").height();
    //     } else {
    //         anchor_offset = $("#postArticle .defaultImage").height() / 2;
    //         upper_anchor_offset = $("#postArticle .defaultImage").height() / 2;
    //         lower_anchor_offset = $("#postArticle .defaultImage").height();
    //     }

    //     //console.log("currentPageName: ", currentPageName);
    //     //$(".header .logoContainer").slideDown(200);
    //     //$(".header .menuContainer").slideDown(200);
    //     var video1Time = (window.pageYOffset - animationVideo1_offset) / 200;
    //     var video2Time = (window.pageYOffset - animationVideo2_offset) / 200;
    //     // var videoTime = window.pageYOffset / 400;
    //     //console.log("pageYOffset: ", window.pageYOffset);
    //     //console.log("video1Time: ", video1Time);
    //     //console.log("video2Time: ", video2Time);
    //     if (currentPageName === "welcome") {
    //         vid1.currentTime = video1Time;
    //     }

    //     if (currentPageName === "about") {
    //         vid2.currentTime = video2Time;
    //     }

    //     // Detect scroll up or down
    //     var st = $(this).scrollTop();

    //     //console.log("scrollTop: ", st);
    //     //console.log("lastScrollTop: ", lastScrollTop);

    //     if (st > lastScrollTop) {
    //         //console.log("downscroll!");
    //         lastScrollTop = st;
    //         // Downscroll
    //         // Show navigation logo and hide navigation menu
    //         //console.log("scrollTop: ", st);
    //         if (st > upper_anchor_offset && st < lower_anchor_offset) {
    //             if (!State.InTransition) {
    //                 State.InTransition = true;
    //                 // Scroll above the video background and pull up the content of the page
    //                 $("html, body").animate({
    //                     scrollTop: lower_anchor_offset
    //                 }, {
    //                     duration: 600,
    //                     complete: function() {
    //                         if ($(".header .logoContainer").is(':hidden')) {
    //                             $(".header .logoContainer").slideDown(200);
    //                         }
    //                         if ($(".header .menuContainer").is(':hidden')) {
    //                             $(".header .menuContainer").slideDown(200);
    //                         }
    //                         //console.log("animate complete: ", $(self).scrollTop());
    //                         //console.log("window: ", $(window).scrollTop());
    //                         lastScrollTop = $(window).scrollTop();
    //                         State.InTransition = false;
    //                     }
    //                 });
    //             }
    //             return false;
    //         }

    //         if (currentPageName !== "welcome") {
    //             if ($(".header .menuContainer").is(':visible') && st > (lower_anchor_offset + 20)) {
    //                 $(".header .menuContainer").slideUp(200);
    //             }
    //             if (st > anchor_offset) {
    //                 if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
    //                     $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
    //                 }
    //             }
    //         } else {
    //             if (st > anchor_offset) {
    //                 if ($(".header .logoContainer").is(':hidden')) {
    //                     $(".header .logoContainer").slideDown(200);
    //                 }
    //                 if ($(".header .menuContainer").is(':visible') && st > (lower_anchor_offset + 20)) {
    //                     $(".header .menuContainer").slideUp(200);
    //                 }
    //                 if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
    //                     $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
    //                 }
    //             }
    //         }
    //     } else if (st < lastScrollTop) {
    //         //console.log("upscroll!");
    //         // Upscroll
    //         // Show navigation logo and show navigation menu
    //         if (st > anchor_offset) {
    //             if ($(".header .logoContainer").is(':hidden')) {
    //                 $(".header .logoContainer").slideDown(200);
    //             }
    //             if ($(".header .menuContainer").is(':hidden')) {
    //                 $(".header .menuContainer").slideDown(200);
    //             }
    //             if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
    //                 $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
    //             }
    //         } else { // Hide navigation logo and hide navigation menu if close to top
    //             if (currentPageName === "welcome") {
    //                 if ($(".header .logoContainer").is(':visible')) {
    //                     $(".header .logoContainer").slideUp(200);
    //                 }
    //                 if ($(".header .menuContainer").is(':visible')) {
    //                     $(".header .menuContainer").slideUp(200);
    //                 }
    //             } else {
    //                 if ($(".header .logoContainer").is(':hidden')) {
    //                     $(".header .logoContainer").slideDown(200);
    //                 }
    //                 if ($(".header .menuContainer").is(':hidden')) {
    //                     $(".header .menuContainer").slideDown(200);
    //                 }
    //             }

    //             if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
    //                 $(".downArrowContainer .downArrow").fadeTo(100, 1);
    //             }
    //         }

    //         lastScrollTop = st;
    //     }
    // });

    // Bind clicking to show menu dropdown container
    $(".header .rightContainer").unbind("click").bind("click", function() {
        $(".header .dropdownContainer").slideDown(200);
        $(".header .dropDownCover").show();
    })

    $(".header .closeContainer").unbind("click").bind("click", function() {
        $(".header .dropdownContainer").slideUp(200);
        $(".header .dropDownCover").hide();
    })

    // Footer Navigation binding

    var showMessageForm = function() {
        $(".footer .footerTopContainer .textBottom .tableText").fadeOut(200, function() {
            $(this).text("Send us a love letter").fadeIn(200);
        });
        if ($(".footer .messageFormBackground").is(':hidden')) {
            $(".footer .messageFormBackground").slideDown(200);
        }
    };

    var hideMessageForm = function() {
        $(".footer .footerTopContainer .textBottom .tableText").fadeOut(200, function() {
            $(this).text("Stalk us on Instagram. We don't mind.").fadeIn(200);
        });
        if ($(".footer .messageFormBackground").is(':visible')) {
            $(".footer .messageFormBackground").slideUp(200);
        }
    };

    var showLocationDropdown = function() {
        if ($(".footer .footerTopContainer .textBottom").css("opacity") === "1") {
            $(".footer .footerTopContainer .textBottom").animate({
                opacity: 0,
                "z-index": "-1"
            }, 200, function() {
                $(".footer .location1 span").animate({
                    opacity: 1,
                    "font-weight": 700
                }, 200);
                $(".footer .location2 span").animate({
                    opacity: 1
                }, 200);
                $(".footer .location3 span").animate({
                    opacity: 1
                }, 200);
                $(".footer .location4 span").animate({
                    opacity: 1
                }, 200);
                if ($(".footer .locationDropdownContainer").is(':hidden')) {
                    $(".footer .locationDropdownContainer").slideDown(200);
                }
            });
        }
    };

    var hideLocationDropdown = function() {
        if ($(".footer .footerTopContainer .textBottom").css("opacity") === "0") {
            if ($(".footer .locationDropdownContainer").is(':visible')) {
                $(".footer .locationDropdownContainer").slideUp(200);
            }
            $(".footer .location1 span").animate({
                opacity: 0
            }, 200);
            $(".footer .location2 span").animate({
                opacity: 0
            }, 200);
            $(".footer .location3 span").animate({
                opacity: 0
            }, 200);
            $(".footer .location4 span").animate({
                opacity: 0
            }, 200, function() {
                $(".footer .footerTopContainer .textBottom").animate({
                    opacity: 1,
                    "z-index": "0"
                }, 200);
            });
        }
    };

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
        $(".footer .footerTopContainer table .iconLink").removeClass("active");
        if ($(".footer .footerTopContainer .textBottom").css("opacity") === "1") {
            $(".footer .footerLocation").parent().addClass("active");
            showLocationDropdown();
        } else {
            hideLocationDropdown();
        }
    });

});
