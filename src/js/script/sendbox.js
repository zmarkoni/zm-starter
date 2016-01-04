;
define([
    "sendbox/screen",
    "sendbox/scrollto"
],function(Screen, ScrollTo){

    var Sendbox = {

        getUrlParam: function (name)
        {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        screen: function()
        {
            return Screen;
        },

        scrollTo: function(selector)
        {
            return ScrollTo.call(null, selector);
        }
    };

    return Sendbox;
});