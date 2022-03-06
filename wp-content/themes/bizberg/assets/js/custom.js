function get_sticky_header(){

    // For admin bar
    if( bizberg_object.admin_bar_status == 1 && jQuery(window).scrollTop() > 50 && jQuery(window).width() > 639 && bizberg_object.primary_header_layout != 'center' ){
        jQuery('nav.navbar-default').css({ "top": jQuery('#wpadminbar').height() + 'px' });
    } else {
        jQuery('nav.navbar-default').css({ "top": "0px" });
    }

    var slide_in_animation_class = bizberg_object.slide_in_animation ? ' animated slideInDown' : '';

    // Add sticky class
    if ( jQuery(window).scrollTop() > 50 && bizberg_object.primary_header_layout != 'center' ) {
        jQuery('nav.navbar-default').addClass('sticky ' + slide_in_animation_class);
        add_remove_body_sticky_class( 'remove' );
    } 
    else if( bizberg_object.primary_header_layout == 'center' && jQuery(window).scrollTop() > jQuery('.primary_header_2_wrapper').outerHeight() ){
        jQuery('nav.navbar-default').css({ "top": jQuery('#wpadminbar').height() + 'px' });
        jQuery('nav.navbar-default').addClass('sticky ' + slide_in_animation_class);
        add_remove_body_sticky_class( 'remove' );
    } 
    else {
        jQuery('nav.navbar-default').removeClass('sticky ' + slide_in_animation_class);
        add_remove_body_sticky_class( 'add' );
    }

    /* For Transparent Header */
    if( bizberg_object.is_transparent_header == 'true' && jQuery(window).scrollTop() > 50 ){
        jQuery('nav.navbar-default').addClass( 'transparent_header_sticky');
    } else {
        jQuery('nav.navbar-default').removeClass( 'transparent_header_sticky');
    }

    // For transparent header
    if( bizberg_object.admin_bar_status == 1 && jQuery('body.bizberg_transparent_header').hasClass('bizberg_sticky_header_enabled') ){
        jQuery('body.bizberg_transparent_header.bizberg_sticky_header_enabled header').attr({
            'style' : 'margin-top:' + jQuery('#wpadminbar').height() + 'px'
        })
    } else {
        jQuery('body.bizberg_transparent_header.bizberg_sticky_header_disabled header').removeAttr( 'style' );
    }

}

function add_remove_body_sticky_class( status ){

    if( bizberg_object.is_transparent_header == 'true' ){

        if( status == 'add' ){
            jQuery('body').addClass('bizberg_sticky_header_enabled');
            jQuery('body').removeClass('bizberg_sticky_header_disabled');
        } else {
            jQuery('body').removeClass('bizberg_sticky_header_enabled');
            jQuery('body').addClass('bizberg_sticky_header_disabled');
        }

    }

}

(function($){

	"use strict";

    var $window = $(window);
    $window.on( 'load', function () {
        
        $("#status").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");
        $("body").delay(350).css({ "overflow": "visible" });

        /* Preloader */
        
        $("#status").fadeOut();
        $("#preloader").delay(350).fadeOut("slow");

        /* END of Preloader */

    });

    // Add class if menu has desctiption
    jQuery('#responsive-menu li').each(function(){

        if( jQuery('nav #navbar').hasClass( 'has-menu-description' ) ){
            return false;
        }

        if( jQuery(this).find('a span').hasClass('sub') ){
            jQuery('nav #navbar').addClass( 'has-menu-description' );
            jQuery('nav #navbar').removeClass( 'has-no-menu-description' );
        } else {
            jQuery('nav #navbar').addClass('has-no-menu-description');
        }

    });

    var $main_header = $('.main_h');

    // If parent menu has submenu then add down arrow
    jQuery('#responsive-menu > li').each(function(){
        if( jQuery(this).find('ul').hasClass('sub-menu') ){
            jQuery(this).find('ul:first').prev('a').find('.eb_menu_title').append('<i class="has_sub_menu_parent fa fa-angle-down"></i>');
        }
    });

    $(window).on( 'scroll load resize' , function(event) {
        event.preventDefault();

        if( bizberg_object.sticky_header_status == 'false' ){
            return;
        }
        
        // IF page template is sticky
        get_sticky_header();

    });

    // Mobile Navigation
    $('.mobile-toggle').on( 'click' , function(event) {
        event.preventDefault();
        if ($main_header.hasClass('open-nav')) {
            $main_header.removeClass('open-nav');
        } 
        else {
            $main_header.addClass('open-nav');
        }
    });

    $('.main_h li a').on( 'click' , function(event) {
        event.preventDefault();
        if ($main_header.hasClass('open-nav')) {
            $('.navigation').removeClass('open-nav');
            $main_header.removeClass('open-nav');
        }
    });

    // contact form
    $(document).on( 'submit' , '#main-contact-form1', function(e){
        e.preventDefault();
        $.ajax({
            url: "mail/contact.php",
            type:   'POST',
            data: $('#main-contact-form1').serialize(),
            success: function(msg){
                $( '#mail_success_message' ).empty().html( msg ).show();
            },
        });
        return;
    }); 

    $(' #da-thumbs > li ').each( function() { 
        $(this).hoverdir(); 
    });

    /**
    * Slicknav - a Mobile Menu
    */
    var $slicknav_label;
    $('#responsive-menu').slicknav({
        duration: 500,
        closedSymbol: '<i class="fa fa-plus"></i>',
        openedSymbol: '<i class="fa fa-minus"></i>',
        prependTo: '#slicknav-mobile',
        allowParentLinks: true,
        nestedParentLinks : false,
        label:"" 
    });

    // Mouse-enter dropdown
    $('#navbar li').on("mouseenter focusin", function() {
        if( $(this).hasClass('bizberg_shop_browse_cat') && $(this).hasClass('show') && $('body').hasClass('page-template-home') ){
            return;
        }
        $(this).find('ul').first().stop(true, true).delay(10).slideDown(500);
    });
    // Mouse-leave dropdown
    $('#navbar li').on("mouseleave focusout", function() {
        if( $(this).hasClass('bizberg_shop_browse_cat') && $(this).hasClass('show') && $('body').hasClass('page-template-home') ){
            return;
        }
        $(this).find('ul').first().stop(true, true).delay(10).slideUp(150);
    });

    /**
     *  Arrow for Menu has sub-menu
     */
    if ($(window).width() > 992) {
        $(".navbar-arrow ul ul > li").has("ul").children("a").append("<i class='arrow-indicator fa fa-angle-right'></i>");
    }

     $(document).ready(function() {
      $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";
                }
        )
    });

    $(window).on( 'scroll' , function(){
        if($(window).scrollTop() > 500){
            $("#back-to-top").fadeIn(200);
        } else{
            $("#back-to-top").fadeOut(200);
        }
    });

    $(document).on("click",'#back-to-top a',function() {
        $('html, body').animate({ scrollTop:0 },'slow');
        return false;
    }); 

    setTimeout(function(){ 

        var $grid = jQuery('.blog-nosidebar-1 #content').masonry({
            itemSelector: '.blog-listing'
        });

        var $grid = jQuery('.blog-nosidebar #content').masonry({
            itemSelector: '.blog-listing'
        });

        $grid.imagesLoaded().progress( function() {
            $grid.masonry('layout');
        });

    }, 1000);  

    setTimeout(function(){ 

        var $grid1 = jQuery('.business_event_popular_posts_wrapper').masonry({
            itemSelector: '.business_event_popular_posts_wrapper .pop_wrapper'
        });

        $grid1.imagesLoaded().progress( function() {
            $grid1.masonry('layout');
        });

    }, 1000); 

    bizberg_post_slider(); 

    jQuery("body").prognroll({
        color: "#f75691"
    });

    jQuery('.prognroll-bar').appendTo('nav.navbar-default');

    if( bizberg_object.sticky_sidebar_status == true ){

        var wpadminbar_height = parseInt( jQuery('#wpadminbar').height() );
        var sticky_sidebar_margin_top_status = parseInt( bizberg_object.sticky_sidebar_margin_top_status );

        jQuery('.bizberg_blog_content,.bizberg_sidebar').theiaStickySidebar({
            additionalMarginTop : bizberg_object.admin_bar_status == 1 ? ( wpadminbar_height + sticky_sidebar_margin_top_status ) : bizberg_object.sticky_sidebar_margin_top_status,
            additionalMarginBottom : bizberg_object.sticky_sidebar_margin_bottom_status,
            minWidth : 900
        });

    }

})(jQuery);

function bizberg_post_slider(){

    // swiper slider

    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: bizberg_object.slider_loop,
        speed: parseInt( bizberg_object.slider_speed ) * 1000,
        grabCursor: bizberg_object.slider_grab_n_slider,
        SlidesPerView: 1,
        watchSlidesProgress: true,
        mousewheelControl: false,
        keyboardControl: false,
        allowTouchMove: bizberg_object.slider_grab_n_slider,
        watchOverflow: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        autoplay: {
            delay: parseInt( bizberg_object.autoplay_delay ) * 1000,
        },
        fadeEffect: {
            crossFade: true
        },
        on: {
            progress: function() {

                // Ignore for firefox
                if (navigator.userAgent.indexOf("Firefox") <= 0) {

                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress;
                        var innerOffset = swiper.width * interleaveOffset;
                        var innerTranslate = slideProgress * innerOffset;
                        swiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";
                    } 

                }

            },
            touchStart: function() {

                // Ignore for firefox
                if (navigator.userAgent.indexOf("Firefox") <= 0) {

                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = "";
                    }

                }

            },
            setTransition: function(speed) {

                // Ignore for firefox
                if (navigator.userAgent.indexOf("Firefox") <= 0) {

                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + "ms";
                        swiper.slides[i].querySelector(".slide-inner").style.transition = speed + "ms";
                    }

                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container-bizberg", swiperOptions);
        
}

// Photo gallery instagram style

jQuery(function($) {

    var updateArrows = function(){
        $('.carouselGallery-right').removeClass('disabled');
        $('.carouselGallery-left').removeClass('disabled');
        var curIndex = $('.carouselGallery-carousel.active').data('index');
        updateArrows.nbrOfItems = updateArrows.nbrOfItems || $('.carouselGallery-carousel').length -1;

        curIndex === updateArrows.nbrOfItems && $('.carouselGallery-right').addClass('disabled');
        curIndex === 0 && $('.carouselGallery-left').addClass('disabled');
    }
    $('.carouselGallery-carousel').on('click', function(e){
        scrollTo = $('body').scrollTop();
       $('body').addClass('noscroll');
       $('body').css('position', 'fixed');
        $('.carouselGallery-col-1, .carouselGallery-col-2').removeClass('active');
        $(this).addClass('active');
        showModal($(this));
        updateArrows();
    });

    $('body').on('click', '.carouselGallery-right, .carouselGallery-left', function(e){
        if($(this).hasClass('disabled')) return;
        var curIndex = $('.carouselGallery-carousel.active').data('index');
        var nextItemIndex = parseInt(curIndex+1);
        if($(this).hasClass('carouselGallery-left')){
            nextItemIndex-=2;
        }
        var nextItem = $('.carouselGallery-carousel[data-index='+nextItemIndex+']');

        if(nextItem.length > 0){
            $('.carouselGallery-col-1, .carouselGallery-col-2').removeClass('active');
            $('body').find('.carouselGallery-wrapper').remove();
            showModal($(nextItem.get(0)));
            nextItem.first().addClass('active');
        }
        updateArrows();
    });

    var modalHtml = '';
    showModal = function(that){
   
        var username = that.data('username'),
        location = that.data('location'),
        imagetext = that.data('imagetext'),
        likes =  that.data('likes'),
        imagepath = that.data('imagepath'),
        carouselGalleryUrl = that.data('url');
        postURL =  that.data('posturl');

        maxHeight = $(window).height()-100;

        if ($('.carouselGallery-wrapper').length === 0) {
            if(typeof imagepath !== 'undefined') {
                modalHtml = "<div class='carouselGallery-wrapper'>";
                modalHtml += "<div class='carouselGallery-modal'><span class='carouselGallery-left'><span class='icons icon-arrow-left6'></span></span><span class='carouselGallery-right'><span class='icons icon-arrow-right6'></span></span>";
                modalHtml += "<div class='container'>";
                modalHtml += "<span class='icons iconscircle-cross close-icon'></span>";
                modalHtml += "<div class='carouselGallery-scrollbox' style='max-height:"+maxHeight+"px'><div class='carouselGallery-modal-image'>";
                modalHtml += "<img src='"+imagepath+"' alt='carouselGallery image'>";
                modalHtml += "</div>";
                modalHtml += "<div class='carouselGallery-modal-text'>";
                modalHtml += "<span class='carouselGallery-modal-username'><a href='javascript:void(0)'>"+username+"</a> </span>"
                modalHtml += "<span class='carouselGallery-modal-location'>"+location+"</span>";
                modalHtml += "<span class='carouselGallery-modal-imagetext'>";
                modalHtml += "<p>"+imagetext+"</p>";
                modalHtml += "</span></div></div></div></div></div>";
                $('body').append(modalHtml).fadeIn(2500);
            }
        }
    };

    $('body').on( 'click','.carouselGallery-wrapper', function(e) {
        if($(e.target).hasClass('.carouselGallery-wrapper')){
            removeModal();
        }
    });
    $('body').on('click', '.carouselGallery-modal .iconscircle-cross', function(e){
        removeModal();
    });

     var removeModal = function(){
        $('body').find('.carouselGallery-wrapper').remove();
        $('body').removeClass('noscroll');
        $('body').css('position', 'static');
        $('body').animate({scrollTop: scrollTo}, 0);
    };

    // Avoid break on small devices
    var carouselGalleryScrollMaxHeight = function() {
        if ($('.carouselGallery-scrollbox').length) {
            maxHeight = $(window).height()-100;
            $('.carouselGallery-scrollbox').css('max-height',maxHeight+'px');
        }
    }
    $(window).resize(function() { // set event on resize
        clearTimeout(this.id);
        this.id = setTimeout(carouselGalleryScrollMaxHeight, 100);
    });
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            removeModal();
        }
    };

    // $('.blog-listing').matchHeight();
    $('.comment-reply-link').addClass('btn-sm btn btn-primary');

});

function getTestimonialScrollbar( selector ){
    var custom = new scrollbot( selector );
    setScrollStyles(custom);
}

function setScrollStyles(custom3){

    custom3.setStyle({height:2});
    var onscrollfollower = document.createElement("div");
    onscrollfollower.style.width = "100%";
    onscrollfollower.style.height = "100%";
    onscrollfollower.style.backgroundColor = "#222222";
    onscrollfollower.style.position = "absolute";
    onscrollfollower.style.bottom = "100%";
    onscrollfollower.style.right = 0;
    custom3.scrollBarHolder.appendChild(onscrollfollower);
    custom3.onScroll(function(){onscrollfollower.style.bottom = 100 - parseFloat(this.scrollBar.style.top) + "%";})

}

// Search in header.
jQuery(document).on('click','.search-icon', function(e){
    e.preventDefault();
    jQuery('.full-screen-search').slideToggle();
    jQuery( ".search-field" ).focus();
});

// Close search screen
jQuery(document).on('click','.full-screen-search .close',function(){
    jQuery('.full-screen-search').slideToggle('fast');
})

// Close search on esc
jQuery(document).keyup(function(e) {

    if ( e.keyCode == 27 || e.keyCode == 9 ) { 
        if( jQuery('.full-screen-search').is(':visible') ){
            jQuery( ".search-icon" ).focus();
        } 
        jQuery('.full-screen-search').slideUp('fast');        
    }

    if( e.keyCode == 27 ){
        jQuery('#responsive-menu').slicknav('close');
    }

});

jQuery(".navbar .slicknav_nav > li:last-child").keydown(function(e) {

    if (e.which == 9 && e.shiftKey) {
        // do nothing
    } else if (e.which == 9) {
        jQuery('#responsive-menu').slicknav('close');   
    } 
    
});
        
// jQuery(document).on('click', 'a[href^="#"]', function (event) {

//     event.preventDefault();

//     if( jQuery.attr(this, 'href') == '#' ){
//         return;
//     }

//     var position = jQuery(jQuery.attr(this, 'href')).offset();

//     jQuery('html, body').animate({
//         scrollTop: position.top - 175
//     }, 500);

// });

jQuery(window).on( 'scroll load resize', function() {  

    /**
    * Fixed mobile menu
    */

    setTimeout(function(){ 

        var scrollTop = jQuery('header > nav.navbar').outerHeight();    
        var width = parseInt( screen.width );
    
        jQuery('ul.slicknav_nav').css({
            'top' :  scrollTop + 'px'
        });

    }, 100);    

});

jQuery(document).on(
    'focusin',
    '.navbar-nav > li', 
    function(){
        var selector_li_id = jQuery(this).attr('id');
        jQuery( 'head' ).append('<span class="navbar_li_background"><style>.navbar-default .navbar-nav > li#' + selector_li_id + '{background:' + bizberg_object.header_menu_color_hover + '} .navbar-default .navbar-nav > li#' + selector_li_id + ' > a{ color:#fff; }' + '</style></span>');
    }
).on(
    'focusout',
    '.navbar-nav > li', 
    function(){
        jQuery('.navbar_li_background').remove();
    }
);

jQuery(document).on(
    'mouseenter focusin',
    'header .navbar-default .navbar-nav li a', 
    function(){
        // Remove Border
        var selector_li_id = jQuery(this).closest('li.parent_menu_bizberg').prev('li').attr('id');
        jQuery( 'head' ).append('<span class="hide_prev_menu_separator"><style>.navbar-default .navbar-nav > li#' + selector_li_id + ' > a:after{display:none}</style></span>');
    }
).on(
    'mouseleave focusout',
    'header .navbar-default .navbar-nav li a', 
    function(){
        jQuery('.hide_prev_menu_separator').remove();
    }
);

jQuery(document).on(
    'mouseenter focusin',
    'header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > a,header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > ul > li > a,header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > ul > li > ul > li > a', 
    function(){

    var selector = jQuery(this).parents('ul.sub-menu').last().closest('li').find('a:first');
    var selector_li_id = jQuery(this).parents('ul.sub-menu').last().closest('li').attr('id');

    if( bizberg_object.is_transparent_header == 'true' ){
        selector.attr(
            'style' , 'border-color:' + bizberg_object.header_menu_color_hover
        );
    } else if( jQuery('.navbar-default').hasClass('sticky') ){ // Normal sticky menu
        selector.attr(
            'style' , 'border-color:' + bizberg_color_luminance( bizberg_object.header_menu_color_hover_sticky , -0.2 )
        );
    } else { // No sticky menu
        selector.attr(
            'style' , 'border-color:' + bizberg_color_luminance( bizberg_object.header_menu_color_hover , -0.2 )
        );
    }
    
    jQuery( 'head' ).append('<span class="hide_menu_separator"><style>.navbar-default .navbar-nav > li#' + selector_li_id + ' > a:after{display:none}</style></span>');

}).on(
'mouseleave focusout',
'header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > a,header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > ul > li > a,header .navbar-default:not(.transparent_header_sticky) .navbar-nav > li > ul > li > ul > li > ul > li > a', 
function(){

    var selector = jQuery(this).parents('ul.sub-menu').last().closest('li').find('a:first');
    selector.removeAttr('style');
    jQuery('.hide_menu_separator').remove();

});

function bizberg_color_luminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
}