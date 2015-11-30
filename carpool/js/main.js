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
    var isAboutPage = false;
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

    var showHamburgerMenu = function() {
        if ($(".header .dropdownContainer").is(':hidden')) {
            $(".header .dropdownContainer").slideDown(200);
            $(".header .dropDownCover").show();
        }
    };

    var closeHamburgerMenu = function() {
        if ($(".header .dropdownContainer").is(':visible')) {
            $(".header .dropdownContainer").slideUp(200);
            $(".header .dropDownCover").hide();
        }
    };

    // Bind clicking to show menu dropdown container
    $(".header .rightContainer").unbind("click").bind("click", function() {
        showHamburgerMenu();
    });

    $(".header .closeContainer").unbind("click").bind("click", function() {
        closeHamburgerMenu();
    });

    // Bind clicking outside the the dropdown to close the dropdown
    $(document).mouseup(function (e) {
        var container = $("header .dropdownContainer");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            closeHamburgerMenu();
        }
    });

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
    $(".header .logoContainer").hide();
    $(".header .menuContainer").hide();

    var showNavLogo = function() {
        if ($(".header .logoContainer").is(':hidden')) {
            $(".header .logoContainer").slideDown(200);
        }
    };

    var hideNavLogo = function() {
        if ($(".header .logoContainer").is(':visible')) {
            $(".header .logoContainer").slideUp(200);
        }
    };

    var instantShowNavLogo = function() {
        if ($(".header .logoContainer").is(':hidden')) {
            $(".header .logoContainer").show();
        }
    };

    var instantHideNavLogo = function() {
        if ($(".header .logoContainer").is(':visible')) {
            $(".header .logoContainer").hide();
        }
    };

    var showNavMenu = function() {
        if ($(".header .menuContainer").is(':hidden')) {
            $(".header .menuContainer").slideDown(200);
        }
    };

    var hideNavMenu = function() {
        if ($(".header .menuContainer").is(':visible')) {
            $(".header .menuContainer").slideUp(200);
        }
    };

    var instantShowNavMenu = function() {
        if ($(".header .menuContainer").is(':hidden')) {
            $(".header .menuContainer").show();
        }
    };

    var instantHideNavMenu = function() {
        if ($(".header .menuContainer").is(':visible')) {
            $(".header .menuContainer").hide();
        }
    };

    var showNavTransparentBackground = function() {
        if ($(".header .navContainer .transparentBg").is(':hidden')) {
            $(".header .navContainer .transparentBg").slideDown(200);
        }
    };

    var hideNavTransparentBackground = function() {
        if ($(".header .navContainer .transparentBg").is(':visible')) {
            $(".header .navContainer .transparentBg").slideUp(200);
        }
    };

    var instantShowNavTransparentBackground = function() {
        if ($(".header .navContainer .transparentBg").is(':hidden')) {
            $(".header .navContainer .transparentBg").show();
        }
    };

    var instantHideNavTransparentBackground = function() {
        if ($(".header .navContainer .transparentBg").is(':visible')) {
            $(".header .navContainer .transparentBg").hide();
        }
    };

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
            closeHamburgerMenu();
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
            hideNavTransparentBackground();
            hideNavLogo();
            hideNavMenu();
            closeHamburgerMenu();
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

    // video framerate animation
    // select video element 
    var iconVideo1;
    var iconVideo2;
    var iconVideo3;

    if (isWelcomePage || isAboutPage) {
        iconVideo1 = document.getElementById('iconVideo1');
        iconVideo2 = document.getElementById('iconVideo2');
        iconVideo3 = document.getElementById('iconVideo3');

        // pause video on load
        iconVideo1.pause();
        iconVideo2.pause();
        iconVideo3.pause();
    }

    // Scrolling event binding
    $(window).scroll(function(event) {
        var self = this;
        var st = $(this).scrollTop(); // Current page position

        // Icons Videos animation
        if (isWelcomePage || isAboutPage) {
            var iconVideo1Mark = $("#iconVideo1").offset().top - $(window).height();
            var iconVideo2Mark = $("#iconVideo2").offset().top - $(window).height();
            var iconVideo3Mark = $("#iconVideo3").offset().top - $(window).height();

            if (st > iconVideo1Mark) {
                var iconVideo1Time = (window.pageYOffset - (iconVideo1Mark + 100)) / 50;
                iconVideo1.currentTime = iconVideo1Time;
            }

            if (st > iconVideo2Mark) {
                var iconVideo2Time = (window.pageYOffset - (iconVideo2Mark + 100)) / 50;
                iconVideo2.currentTime = iconVideo2Time;
            }

            if (st > iconVideo3Mark) {
                var iconVideo3Time = (window.pageYOffset - (iconVideo3Mark + 100)) / 50;
                iconVideo3.currentTime = iconVideo3Time;
            }
            //console.log("pageYOffset: ", window.pageYOffset);
        }

        if (isScrollingAnimation) {
            //console.log("Prevent scroll!");
            event.preventDefault();
            return false;
        }

        var upperTopMediaAnchor = $(".topMediaContainer").height() - upperTopMediaAnchorMark;

        if (isWelcomePage) {
            upperTopMediaAnchor = $(".topMediaContainer").height() - upperTopMediaAnchorMark - $("#welcome .welcomeMenu").height() - 20;
        }

        var topMediaAnchor = $(".topMediaContainer").height();
        var lowerPageFooterAnchor = $(".carpool-page").height() - lowerPageFooterAnchorMark;

        // console.log("current st: ", st);
        // console.log("topMediaAnchor: ", topMediaAnchor);
        // console.log("lowerPageFooterAnchor: ", lowerPageFooterAnchor);


        // if (st > lastScrollTop) {            
        //     // Downscroll
        //     if (st > (lastScrollTop + 50)) { // scroll down more than 50 pixels
        //         hideNavTransparentBackground();
        //         hideNavLogo();
        //         hideNavMenu();
        //     } else if (st > topMediaAnchor && st < lowerPageFooterAnchor) {
        //         showNavTransparentBackground();
        //         showNavLogo();
        //         showNavMenu();
        //     } else if (st > lowerPageFooterAnchor) {
        //         showNavTransparentBackground();
        //     } else if (st < topMediaAnchor) {
        //         hideNavTransparentBackground();
        //         if (isWelcomePage) {
        //             hideNavLogo();
        //             hideNavMenu();
        //         }
        //     }
        // } else if (st < lastScrollTop) {
        //     // Upscroll
            
        // }

        if (st < upperTopMediaAnchor) { // Top media portion
            hideNavTransparentBackground();
            showArrow();
            instantHideNavLogo();
            instantHideNavMenu();
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':hidden')) {
                    $("#welcome .welcomeMenu").show();
                }
                activeNavAnchors("/");
            }
        } else if (st >= upperTopMediaAnchor && st <= topMediaAnchor) { // Bottom media portion
            instantHideNavTransparentBackground();
            blurArrow();
            instantShowNavLogo();
            instantShowNavMenu();
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/");
            }
        } else if (st > topMediaAnchor && st < lowerPageFooterAnchor) { // Content portion
            instantShowNavTransparentBackground();
            instantShowNavLogo();
            instantShowNavMenu();

            // if (st > lastScrollTop) { // Downscroll 
            //     hideNavTransparentBackground();
            //     hideNavMenu();
            // } else if (st < lastScrollTop) { // Upscroll
            //     showNavTransparentBackground();
            //     showNavLogo();
            //     showNavMenu();
            // }

            // Activate service nav anchor for welcome page
            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/#services");
            }
        } else if (st > lowerPageFooterAnchor) { // Footer portion
            if ($(".header .logoContainer").is(':visible') || $(".header .menuContainer").is(':visible')) {
                instantShowNavTransparentBackground();
            }

            if (isWelcomePage) {
                if ($("#welcome .welcomeMenu").is(':visible')) {
                    $("#welcome .welcomeMenu").hide();
                }
                activeNavAnchors("/#services");
            }
        }

        // Footer paper clip animation
        // if (st > topMediaAnchor) {
        //     // Get the anchor when the footer start coming into view
        //     var topFooterViewAnchor = $(".footer .footerTopContainer").offset().top - $(window).height() + $(".footer .footerTopContainer .textTop").height() + 10;
        //     var topFooterContainerAnchor = $(".footer .footerTopContainer").offset().top - ($(window).height() - $(".footer .footerTopContainer").height());

        //     var bottomFooterViewAnchor = $(".footer .footerBottomContainer").offset().top - $(window).height() + 50;
        //     var bottomFooterContainerAnchor = $(".footer .footerBottomContainer").offset().top - ($(window).height() - $(".footer .footerBottomContainer").outerHeight());
            
        //     // Animation when downscroll only
        //     // Top footer
        //     if (st > lastScrollTop && st > topFooterViewAnchor && st < (topFooterViewAnchor + 100)) {
        //         event.preventDefault();
        //         if (!isScrollingAnimation) {
        //             isScrollingAnimation = true;
        //             // Scroll above the video background and pull up the content of the page
        //             $("html, body").animate({
        //                 scrollTop: topFooterContainerAnchor
        //             }, {
        //                 duration: 600,
        //                 complete: function() {
        //                     lastScrollTop = $(window).scrollTop();
        //                     isScrollingAnimation = false;
        //                 }
        //             });
        //         }
        //     }

        //     // Animation when downscroll only
        //     // Bottom Footer
        //     if (st > lastScrollTop && st > bottomFooterViewAnchor && st < (bottomFooterViewAnchor + 200)) {
        //         event.preventDefault();
        //         if (!isScrollingAnimation) {
        //             isScrollingAnimation = true;
        //             // Scroll above the video background and pull up the content of the page
        //             $("html, body").animate({
        //                 scrollTop: bottomFooterContainerAnchor
        //             }, {
        //                 duration: 600,
        //                 complete: function() {
        //                     lastScrollTop = $(window).scrollTop();
        //                     isScrollingAnimation = false;
        //                 }
        //             });
        //         }
        //     }

        // }


        lastScrollTop = st;

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
