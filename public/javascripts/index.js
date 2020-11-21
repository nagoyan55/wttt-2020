$(function(){
    $('.search-button').on('click', function(){
        var url = document.URL;
        var pos = url.indexOf("searchWord");
        if(pos > 0){
            url = url.substring(0, pos);
        }

        var searchWord = $('.search-field').val();
        location.href = url+'searchWord/'+searchWord;
    });
    var imageUrlJSON=$('.image-urls').val();
    var imageUrls = JSON.parse(imageUrlJSON);
    if(imageUrls == null){
        return;
    }

    var rootDiv = $('.container');
    for(var i = 0; i < imageUrls.length; i++){
        var img = $('<img>', {src: imageUrls[i]});
        img.appendTo(rootDiv);
    }
});
