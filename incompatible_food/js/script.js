$(document).ready(function() {
    var prediction = $("#search_bg #search_bg_content .prediction");
    var food_input = $("#search_bg #search_bg_content .food_input");
    var search = $("#search_bg #search_bg_content #search");
    food_input.focus();

    food_input.focus(function() {
    });

    food_input.keyup(function(event) {
        console.log("food_input.keyup");
        if (food_input.val() == "" || food_input.val() == " ") {
            return;
        }
        if (event.which != 39 && event.which != 40 && event.which != 37 && event.which != 38 && event.which != 13)
            $.ajax({
                url: "http://suggestion.baidu.com/su",
                type: "GET",
                dataType: "jsonp",
                jsonp: 'jsoncallback',
                async: false,
                timeout: 5000, //请求超时
                data: {
                    "wd": food_input.val(),
                    "cb": "show_prediction"
                },
                success: function(json) {},
                error: function(xhr) {
                    return;
                }

            });
    });

    search.click(function() {
        console.log("Click");
        if ($("#search_bg #search_bg_content  .food_input").val().length != 0) {
            console.log("Not empty");

            prediction.animate({
                height: 0
            }, 100, function() {
                prediction.css({
                    display: "none",
                    height: "auto"
                });
                prediction.empty();
            });

            var food_id = food_input.val();
            addFoodBtn("food_panel_content", food_id, food_id);

            $( "#search_bg #search_bg_content  .food_input").val("");
        } else {
            console.log("Empty");
        }
        food_input.focus();
    });

function foodBtnClick(obj) {
    console.log("lalalal");
}

function addFoodBtn(obj, id, text) {
    var parent = document.getElementById(obj);
    var div = document.createElement("div");
    div.setAttribute("id", id);
    div.setAttribute("class", "ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-right");
    div.setAttribute("style", "border-radius: 5px; line-height: 0.45;font-size:0.9em;");
    // div.setAttribute("onclick", function foodBtnClick(id));

    div.onclick=function foodBtnClick(div) {
        alert(div.innerHTML);
    };

    div.innerHTML = text;
    parent.appendChild(div);
}



});

function show_prediction(keys) {
    console.log("show_prediction");
    var max_len = 5;
    var len = keys.s.length;
    var prediction = $("#search_bg #search_bg_content .prediction");
    var food_input = $("#search_bg #search_bg_content .food_input");
    if (len == 0) {
        prediction.css({
            display: "none"
        });
    } else {
        prediction.css({
            display: "block"
        });
        if (len > max_len) {
        	len = max_len;
        }
    }
    var spans = "";
    for (var i = 0; i < len; i++) {
        spans += "<span>" + keys.s[i] + "</span>"
    }
    prediction.html(spans);
    prediction.animate({
        height: (prediction.children().height() + 1) * len
    }, 100);
    //点击候选词汇
    prediction.children().click(function() {
    	console.log("prediction.children");
        food_input.val($(this).html()); 

        prediction.animate({
            height: 0 
        }, 10, function() {
            prediction.css({
                display: "none",
                height: "auto"
            });
            prediction.empty(); 
        });

        food_input.focus(); 

    });

    prediction.mouseleave(function() { 
        prediction.animate({
            height: 0
        }, 100, function() {
            prediction.css({
                display: "none",
                height: "auto"
            });
            prediction.empty();
        });
    });

    prediction.children().mouseover(function() {
        numspan = $(this).index();
        for (var i = 0; i < len; i++) {
            if (numspan == i) {
                prediction.children().eq(i).css({
                    "background-color": "rgba(0,0,0,0.3)"
                });
            } else {
                prediction.children().eq(i).css({
                    "background-color": "rgba(255,255,255,0.3)"
                });
            }
        }
        food_input.val(prediction.children().eq(numspan).html());
    });

}
