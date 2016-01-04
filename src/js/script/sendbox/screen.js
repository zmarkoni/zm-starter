;
define(function(){

    var screen = function(){};

    screen.prototype = {

        smallWidth: 803,

        mediumWith: 1280,

        isLarge: function()
        {
            return $(window).width() >= this.mediumWith;
        },

        isMedium: function()
        {
            return this.smallWidth <= $(window).width() &&
                $(window).width() < this.mediumWith;
        },

        isSmall: function()
        {
            return $(window).width() < this.smallWidth;
        },

        isLandscape: function(){
            return $(window).width() > $(window).height();
        },

        getContentHeight: function()
        {
            return $(window).height() - $("header").outerHeight();
        },

        getMessageConversationHeight: function()
        {
            if($("#messages-body-container").length > 0){
                return $(window).height() - $("#messages-body-container").offset().top - $("#messages-body-container .panel-heading").outerHeight() - $(".send-message-form").outerHeight();
            }
            return 0;
        },

        getPageContentHeight: function()
        {
            return $(window).height() - $("header").outerHeight() - $(".mobile_header").outerHeight();
        },

        getProfilePictureHeight: function()
        {
            return this.getContentHeight() - $(".profile-title").outerHeight() - $("#responsive_profile_buttons a.button").outerHeight();
        }
    };

    return new screen();
});