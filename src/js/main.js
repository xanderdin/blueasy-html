(function($) {

$(document).ready(function() {

    // Scroll-Up button
    $(window).scroll(function(){
        var scrollup = $('.scrollup');
        if ($(this).scrollTop() > 100) {
            scrollup.fadeIn();
        } else {
            scrollup.fadeOut();
        }
    });


    // Skrollr init
    var skrl = skrollr.init();

    if (skrl.isMobile()) {
        // Don't use skorllr on mobile devices
        skrl.destroy();
        // And don't use smooth scrolling on mobile devices also
    } else {
        // Smooth scrolling on page anchors
        $('a.smooth-scroll').click(function(event){

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash === "") { return; }

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (700) specifies the number of milliseconds it
            // takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700);
        });
    }


    // Hide mobile menu on menu item click
    $('#bs-example-navbar-collapse-1 a').click(function(event){
        if ($('#bs-example-navbar-collapse-1').hasClass('in'))
            $('#bs-example-navbar-collapse-1').collapse('toggle');
    });


    // Portfolio filter
    $('.filters').on('click', 'a', function(event){
        event.preventDefault();
        $('.filters>li').each(function(){
            $(this).removeClass('active');
        });
        $(this).parent().addClass('active');
        var filter = $(this).attr('data-filter');
        if (filter) {
            $('.portfolio-item').each(function(){
                if ($(this).hasClass(filter)) {
                    $(this).show('fast', 'linear');
                } else {
                    $(this).hide('fast', 'linear');
                }
            });
        } else {
            $('.portfolio-item').each(function(){
                $(this).show('fast', 'linear');
            });
        }
    });


    // Simple Lightbox for portfolio images
    $('.portfolio-grid .image-overlay').click(function(){
        var images = [];
        // You can specify your own source of
        // images urls in the selector below
        $('.portfolio-item img').each(function(){
            if ($(this).is(':visible')) {
                images.push($(this).attr('src'));
            }
        });
        $.SimpleLightbox.open({
            items: images,
        });
    });
});

})(jQuery);