/*
* Startup
* Copyright 2015, Binh Nguyen, Carpool Agency
* http://carpoolagency.com/
* Dual licensed under the MIT or GPL Version 2 licenses.
* Date: Friday Oct 16 2015
*/
$(function(){

    var currentChapterName = "home",
    currentPageName = "welcome",
    currentPageIndex = 0,
    $currentChapterElm = null,
    $visibleChapter = null,
    transitionDurationTime = 800;
    var lastScrollTop = 0;

    // This represents the state of the object
    var State = {
        InitialLoad: false, // The page is initally loaded
        InTransition: false, // The page is moving
        Sleep: true // For other reason where we want to stop doing stuff
    };

    // This a list of selectors being used in this class.
    // Not sure if this is the best way but it's probably better than hard coding.
    var selectors = {
        chapter: ".carpool-chapter",
        horizontal: ".horizontal",
        page: ".carpool-page",
        scrollTarget: window,
        navigation: ".carpool-nav"
    };

    var initChapter = function () {
        $(currentChapterName).children(selectors.page).css({
            height: 0,
            overflow: 'hidden',
            visibility: "hidden"
        });
    };

    var activeNavAnchors = function (page) {
        var $nav = $(selectors.navigation);
        var selector1 = 'a[href="#' + page + '"]';
        var $nav1 = $(selector1, $nav);
        $("a", $nav).removeClass('active');
        $nav1.addClass('active');

        // Update the page title here since we can obtain human friendly page name from the link.
        document.title = page;
    };

    // Get the top location of a page
    var getPageOffset = function (page) {
        var pageOffset = 0;
        // Page offset is caculate by the offest of the page minus the header height
        pageOffset = parseInt($($(page).get(0)).offset().top);
        return pageOffset;
    };

    // A function for getting windows size
    // This function automatically set the minimum width depending on the window size.
    // If the window size is smaller than the body width, it sets the body width.
    var getWindowSize = function () {
        var size = {
            width: 0,
            height: 0,
            changed: false
        };
        var oldOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        size.originalHeight = $(window).outerHeight();
        size.originalWidth = $(window).width();
        document.body.style.overflow = oldOverflow;

        //Height doesn't need to be changed
        size.height = size.originalHeight;

        //Get the body width to find the minimum width
        var bodyWidth = $('body').width();

        // check if the window size is smaller than the body width
        if (size.originalWidth < bodyWidth) {
            // Changed the width into the body width
            size.width = bodyWidth;
            size.changed = true;
        } else {
            // Use the original width
            size.width = size.originalWidth;
        }
        return size;
    };

    var smoothScrollTo = function (pageOffset, options) {
        if (Browser.isWP()) {
            // In Window Phone, there is a default scroll animation so we just set the scroll top.
            $(selectors.scrollTarget).scrollTop(pageOffset);
            // Update the State
            State.InTransition = false;
        } else {
            // Animate scroll to a page
            $("html, body").animate({
                scrollTop: pageOffset
            }, options);
        }
    };

    // Calculate the animation speed for hidding the header
    var calculateSpeed = function (gap) {
        var speed = 0;
        if (gap < 1000) {
            speed = 600;
        } else if (gap < 2000) {
            speed = 800;
        } else if (gap < 3000) {
            speed = 1200;
        } else {
            speed = gap / 2;
        }
        return speed;
    };

    // Show the targeted page
    var showPage = function(chapter, page) {
        // For updating the url
        var showPageArguments = arguments;

        // If page is null, it's the home for the chapter
        // Set page to the chapter to make the transition works
        if (page === null || page === "") {
            page = chapter;
            chapter = "home";
            if (page === "home") {
                page = "welcome";
            }
        }

        // Ignore events that happen during the transition
        if (State.InTransition === true) {
            return;
        }

        // Get the current chapter and stored it in this object
        $currentChapterElm = $('#' + chapter);

        // Get the current page, if its a chapter then choose the first page
        var $p = $('#' + page);

        // If the page doesn't exist return
        if ($p.length === 0) {
            return;
        }

        // Get next page
        var $nextPage = $p.next();

        var scrollTop = $(selectors.scrollTarget).scrollTop();

        // Recover the scroll top
        $(window).scrollTop(scrollTop);

        //Save page index
        currentPageIndex = $currentChapterElm.children(selectors.page).index($p);

        currentPageName = page;

        // Set active nav
        activeNavAnchors(page);

        // Show the header if it is not welcome page
        if (currentPageName !== "welcome") {
            $(".header .logoContainer").slideDown(200);
            $(".header .menuContainer").slideDown(200);
        } else {
            $(".header .logoContainer").slideUp(200);
            $(".header .menuContainer").slideUp(200);
        }

        // Reset the last scroll top for navigation scrolling
        lastScrollTop = 0;

        // Get the windows size
        var windowSize = getWindowSize();

        // Position variables
        var currentScrollTop = $(window).scrollTop();
        var pageOffset = getPageOffset($p);
        var nextPageOffset = ($nextPage.length !== 0) ? parseInt(getPageOffset($nextPage)) : 65535;
        var self = this;
        var finishTransition = function () {
            State.InTransition = false;
        };
        var startHorizontalTransition = function () {
            State.InTransition = true;
            // If the showPageArguments length is more than 2,
            // we don't scroll top. This is because it's most likely accessing an element within the chapter. (i.e. GPG)
            if (!showPageArguments[2]) {
                $(window).scrollTop(0);
            }
            $currentChapterElm.children(selectors.page).css({
                height: "auto",
                overflow: 'hidden',
                visibility: "visible"
            });
        };
        // For the horizontal layout, zero out the height of pages except the current one
        // so that the window fits to the page height
        var finishHorizontalTransition = function () {
            $currentChapterElm.children(selectors.page).css({
                height: 0,
                overflow: 'hidden',
                visibility: "hidden"
            });
            $p.css({
                height: "inherit",
                overflow: 'inherit',
                visibility: "visible"
            });
            finishTransition();
        };
        // Horizontal variables
        // TODO: We may need to add a support for older browsers (i.e. IE8) that don't support "vw".
        var scrollingMargin = (currentPageIndex * $currentChapterElm.children(selectors.page).width() * -1);

        // Immediately Scroll to initial page OR on chapter change
        if (State.InitialLoad === true || ($visibleChapter && $visibleChapter.attr('id') !== $($currentChapterElm).attr('id'))) {
            // Immediately scroll to chapter and page
            if ($($currentChapterElm).hasClass('horizontal')) {
                startHorizontalTransition();
                $($currentChapterElm).css('margin-left', scrollingMargin);
                finishHorizontalTransition();
            } else {
                $(selectors.scrollTarget).scrollTop(pageOffset);
                finishTransition();
            }
            State.InitialLoad = false;
        } else {
            if ($($currentChapterElm).hasClass('horizontal')) {
                startHorizontalTransition();
                $($currentChapterElm).animate({
                    'margin-left': scrollingMargin
                }, {
                    duration: transitionDurationTime,
                    easing: 'swing',
                    complete: function () {
                        finishHorizontalTransition();
                    }
                });
            } else {
                // Check if the top of the page is below the scrolling position
                // Check if the top of the next page is above the scrolling position
                if (pageOffset > currentScrollTop || nextPageOffset <= currentScrollTop) {
                    // Scroll when scrollTop is outside of the page
                    State.InTransition = true;
                    smoothScrollTo(pageOffset, {
                        easing: 'swing',
                        complete: finishTransition,
                        duration: calculateSpeed(Math.abs(pageOffset - currentScrollTop))
                    });
                }
            }
        }
    };

    // Smooth transition between pages
    $(".pageNavLink").unbind("click").bind("click", function(event) {
        event.preventDefault();
        //$('html,body').animate( { scrollTop:$(this.hash).offset().top } , 1000);
        console.log("location: ", window.location);
        console.log("PageNavLink: ", this);
        var page = $(this).attr("href").replace("#", "");
        showPage("home", page);
    });

    // Hide the navigation logo and menu on start up
    $(".header .logoContainer").hide();
    $(".header .menuContainer").hide();

    // video framerate animation
    // select video element
    var vid1 = document.getElementById('animationVideo1');
    var vid2 = document.getElementById('animationVideo2');

    // pause video on load
    vid1.pause();
    vid2.pause();

    var animationVideo1_offset = $("#welcome").height() / 10 - 100;
    var animationVideo2_offset = $("#about").height() / 5 - 100;
    // var animationVideo2_offset = $("#welcome").height() + $('#services').height() / 2 + 200;

    // Show the navigation on scrolling
    // Anchor offset with extra 100 height for unloaded image
    var anchor_offset = $("#welcome .video-overlay").offset().top + $("#welcome .video-overlay").height() + 100;

    
    $(window).scroll(function () {
        console.log("currentPageName: ", currentPageName);
        //$(".header .logoContainer").slideDown(200);
        //$(".header .menuContainer").slideDown(200);
        var video1Time = (window.pageYOffset - animationVideo1_offset) / 200;
        var video2Time = (window.pageYOffset - animationVideo2_offset) / 200;
        // var videoTime = window.pageYOffset / 400;
        console.log("pageYOffset: ", window.pageYOffset);
        console.log("video1Time: ", video1Time);
        console.log("video2Time: ", video2Time);
        if (currentPageName === "welcome") {
            vid1.currentTime = video1Time;
        }

        if (currentPageName === "about") {
            vid2.currentTime = video2Time;
        }

        // Detect scroll up or down
        var st = $(this).scrollTop();

        if (st > lastScrollTop){
            // Downscroll
            // Show navigation logo and hide navigation menu
            if (currentPageName !== "welcome") {
                if ($(".header .menuContainer").is(':visible')) {
                    $(".header .menuContainer").slideUp(200);
                }
                if (st > anchor_offset) {
                    if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
                        $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
                    }
                }
            } else {
                if (st > anchor_offset) {
                    if ($(".header .logoContainer").is(':hidden')) {
                        $(".header .logoContainer").slideDown(200);
                    }
                    if ($(".header .menuContainer").is(':visible')) {
                        $(".header .menuContainer").slideUp(200);
                    }
                    if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
                        $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
                    }
                }
            }
        } else {
            // Upscroll
            // Show navigation logo and show navigation menu
            if (st > anchor_offset) {
                if ($(".header .logoContainer").is(':hidden')) {
                    $(".header .logoContainer").slideDown(200);
                }
                if ($(".header .menuContainer").is(':hidden')) {
                    $(".header .menuContainer").slideDown(200);
                }
                if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
                    $(".downArrowContainer .downArrow").fadeTo(100, 0.3);
                }
            } else { // Hide navigation logo and hide navigation menu if close to top
                if (currentPageName === "welcome") {
                    if ($(".header .logoContainer").is(':visible')) {
                        $(".header .logoContainer").slideUp(200);
                    }
                    if ($(".header .menuContainer").is(':visible')) {
                        $(".header .menuContainer").slideUp(200);
                    }
                } else {
                    if ($(".header .logoContainer").is(':hidden')) {
                        $(".header .logoContainer").slideDown(200);
                    }
                    if ($(".header .menuContainer").is(':hidden')) {
                        $(".header .menuContainer").slideDown(200);
                    }
                }
                
                if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
                    $(".downArrowContainer .downArrow").fadeTo(100, 1);
                }
            }
        }
        lastScrollTop = st;

        
    });

    // Bind clicking to show menu dropdown container
    $(".header .rightContainer").unbind("click").bind("click", function() {
        $(".header .dropdownContainer").slideDown(200);
    })

    $(".header .closeContainer").unbind("click").bind("click", function() {
        $(".header .dropdownContainer").slideUp(200);
    })


    // Footer Navigation binding

    var showMessageForm = function() {
        if ($(".footer .messageFormBackground").is(':hidden')) {
            $(".footer .messageFormBackground").slideDown(200);
        }
    };

    var hideMessageForm = function() {
        if ($(".footer .messageFormBackground").is(':visible')) {
            $(".footer .messageFormBackground").slideUp(200);
        }
    };

    var showLocationDropdown = function() {
        if ($(".footer .footerTopContainer .textBottom").css("opacity") === "1") {
            $(".footer .footerTopContainer .textBottom").animate({opacity:0,"z-index":"-1"}, 200, function(){
                $(".footer .location1 span").animate({opacity:1,"font-weight":700}, 200);
                $(".footer .location2 span").animate({opacity:1}, 200);
                $(".footer .location3 span").animate({opacity:1}, 200);
                $(".footer .location4 span").animate({opacity:1}, 200);
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
            $(".footer .location1 span").animate({opacity:0}, 200);
            $(".footer .location2 span").animate({opacity:0}, 200);
            $(".footer .location3 span").animate({opacity:0}, 200);
            $(".footer .location4 span").animate({opacity:0}, 200, function() {
                $(".footer .footerTopContainer .textBottom").animate({opacity:1,"z-index":"1"}, 200);
            });
        }
    };

    // Email Message
    $(".footer .footerEmail").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideLocationDropdown();
        if ($(".footer .messageFormBackground").is(':hidden')) {
            showMessageForm();
        } else {
            hideMessageForm();
        }
    });

    // Location
    $(".footer .footerLocation").unbind("click").bind("click", function(event) {
        event.preventDefault();
        hideMessageForm();
        if ($(".footer .footerTopContainer .textBottom").css("opacity") === "1") {
            showLocationDropdown();
        } else {
            hideLocationDropdown();
        }
    });

    // $(".footer .location1 span").unbind("click").bind("click", function() {    
    //     if ($(".footer .locationDropdownContainer").is(':hidden')) {
    //         $(".footer .locationDropdownContainer").slideDown(200);
    //     } else {
    //         $(".footer .locationDropdownContainer").slideUp(200);
    //     }
    // });

    // Hide all pages
    initChapter();

    // $("#home #welcome").css({
    //     height: "auto",
    //     overflow: 'hidden',
    //     visibility: "visible"
    // });
    showPage("home", "welcome");
});