/*
* Startup
* Copyright 2015, Binh Nguyen, Carpool Agency
* http://carpoolagency.com/
* Dual licensed under the MIT or GPL Version 2 licenses.
* Date: Friday Oct 16 2015
*/
$(function(){

    // Smooth transition between pages
    $(".pageNavLink").unbind("click").bind("click", function(event) {
        event.preventDefault();
        $('html,body').animate( { scrollTop:$(this.hash).offset().top } , 1000);
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

    var animationVideo1_offset = $("#welcome").height() / 2 - 100;
    var animationVideo2_offset = $("#welcome").height() + $('#services').height() / 2 + 200;

    // Show the navigation on scrolling
    // Anchor offset with extra 100 height for unloaded image
    var anchor_offset = $("#welcome .video-overlay").offset().top + $("#welcome .video-overlay").height() + 100;

    var lastScrollTop = 0;
    $(window).scroll(function () {
        var video1Time = (window.pageYOffset - animationVideo1_offset) / 200;
        var video2Time = (window.pageYOffset - animationVideo2_offset) / 200;
        // var videoTime = window.pageYOffset / 400;
        // console.log("pageYOffset: ", window.pageYOffset);
        // console.log("videoTime: ", videoTime);
        vid1.currentTime = video1Time;
        vid2.currentTime = video2Time;

        // Detect scroll up or down
        var st = $(this).scrollTop();

        if (st > lastScrollTop){
            // Downscroll
            // Show navigation logo and hide navigation menu
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
                if ($(".header .logoContainer").is(':visible')) {
                    $(".header .logoContainer").slideUp(200);
                }
                if ($(".header .menuContainer").is(':visible')) {
                    $(".header .menuContainer").slideUp(200);
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







});