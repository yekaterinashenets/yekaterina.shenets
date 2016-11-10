"use strict";
let token = 'DaUnfPNXSAWwKQaPkCWCFbRB0E9S92yX0PwpBs9rgMHdwAkSeo',
blog_name="russianquotes.tumblr.com",
tages=["life", "ветви дуба", "молко", "рэй брэдбери"];
var i=0;
let getInfo = () => {
    $.ajax({ 
            type: 'GET',
            url:'http://api.tumblr.com/v2/blog/'+blog_name+'/posts/quote?api_key='+token+'&tag='+tages[i],
            dataType:'jsonp',
            headers: {
                    'api_key': token,
            },
             success: 
             function(blog) { 
                console.log(blog);
                document.getElementById("header").innerHTML='Цитаты  блога russianquotes из tumblr, содержащие #'+tages[i];
                 let template = Handlebars.compile( $('#template').html()  );
                 $('.posts').empty().append( template(blog)  );
                 i++;
                if(i==tages.length)
                    i=0;
             },
             error:function(xhr, ajaxOptions, thrownError) {
                    document.getElementById("error").style.display="block";
                    document.getElementById("error").innerHTML=xhr.status + ': ' + xhr.statusText;
                    $('#loading').hide();
             }
     });
     
}

$(document).ready(function () {
    getInfo();
    setInterval(getInfo, 3000);
})
