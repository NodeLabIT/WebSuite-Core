$(document).ready(function () {
    $('#open-menu').on('click', function () {
        $('#main-nav').addClass('visible');
        $('.dark-overlay').addClass('visible');
    });

    $('#close-menu').on('click', function () {
        $('#main-nav').removeClass('visible');
        $('.dark-overlay').removeClass('visible');
    });

    $(window).on('scroll', function() {
        var headerHeight = $('header').height();

        if ($(document).scrollTop() > headerHeight) {
            $('#open-menu').addClass('dark');
        }

        else {
            $('#open-menu').removeClass('dark');
        }
    });

    $('.dropdown').on('click', function (e) {
        $(".dropdown").each(function () {
            if($(this).find(".dropdown-content").hasClass("visible")) {
                $(this).find(".dropdown-content").removeClass("visible");
            }
        });
        $(this).closest('.dropdown').find('.dropdown-content').stop().toggleClass('visible');
        return false;
    });

    $(document).on('click', function() {
        $('.dropdown-content.visible').toggleClass('visible');
    });
    $('.dropdown-content').on('click', function(e) {
        e.stopPropagation();
        return false;
    });
});