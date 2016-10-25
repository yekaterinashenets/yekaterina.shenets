"use strict";
let token = 'O4EwAgqignUjMlpU0WfwE9elsI6jTymAmScBAAMK8PsHOHviiq',
blog_name="russianquotes.tumblr.com",
tag="жизнь";
let getInfo = () => {
    $.ajax({ 
            type: 'GET',
            url:'http://api.tumblr.com/v2/blog/'+blog_name+'/posts/quote?api_key='+token+'&tag='+tag,
            dataType:'jsonp',
            headers: {
                    'api_key': token,
            },
             success:function(blog) { 
                console.log(blog);
                 let template = Handlebars.compile( $('#template').html()  );
                 $('.posts').empty().append( template(blog)  );
             },
             error:function() {
                     console.log("error"); 
             }
     });
}

$(document).ready(function () {
    getInfo();
    setInterval(getInfo, 10000);
})
