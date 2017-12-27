$(document).ready(function () {
    $(window).on('scroll', function() {
        var headerHeight = $('header').height() - $('#open-menu').height() - ($('#open-menu').position().top / 2);

        if ($(document).scrollTop() > headerHeight) {
            $('#open-menu').addClass('dark');
        } else {
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