;
define(function(){

    return function (selector) {
        $('html, body').animate({
            scrollTop: $(selector).offset().top
        });
    };
});