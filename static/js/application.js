// Some general UI pack related JS

$(function () {
    // Custom selects
    $("select").dropkick();
});

$(document).ready(function() {
    // Todo list
    $(".todo li").click(function() {
        $(this).toggleClass("todo-done");
    });

    // Init tooltips
    $("[data-toggle=tooltip]").tooltip("show");

    // Init tags input
    $("#tagsinput").tagsInput();

    // Init jQuery UI slider
    $("#slider").slider({
        min: 1,
        max: 5,
        value: 2,
        orientation: "horizontal",
        range: "min",
    });

    // JS input/textarea placeholder
    $("input, textarea").placeholder();

    // Make pagination demo work
    $(".pagination a").click(function() {
        if (!$(this).parent().hasClass("previous") && !$(this).parent().hasClass("next")) {
            $(this).parent().siblings("li").removeClass("active");
            $(this).parent().addClass("active");
        }
    });

    $(".btn-group a").click(function() {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    // Disable link click not scroll top
    $("a[href='#']").click(function() {
        return false
    });

});

/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
var disqus_shortname = 'votemvt'; // required: replace example with your forum shortname

/* * * DON'T EDIT BELOW THIS LINE * * */
(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

function vote(id) {

    if ($('a#'+id).hasClass('btn-primary')) {
        return;
    }

    var callback = function (response, status){
        if (response.response == 'OK') {
            $('a#'+response.pid).addClass('btn-primary').html('Τουρίστας!');
            $('h3#votes-' + response.pid).html(response.votes);
        }
    };
 
    var errorCallback = function(response, status, error) {
        console.log(response);
    };

    var data = {
        'player_id': id,
        'vote': 1,
        'csrfmiddlewaretoken': getCookie('csrftoken'),
    };

    params = {
        type        : "POST",
        data        : data,
        url         : "/vote/",
        success     : callback,
        error       : errorCallback,
    };

    $.ajax(params);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}