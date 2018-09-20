var buttons = ['alienz','glitch','chillwave','cyber','vaporwave']

var altImgs = []

var saved = []

var currentGiph

var createButtons = function(){
    $('#buttons').empty()
    for(var i = 0;i<buttons.length;i++){
        var newButton = $( '<button>' )
        newButton.addClass('giphy')
        newButton.attr('data-name', buttons[i])
        newButton.text(buttons[i])
        $('#buttons').append(newButton)
    }
}

var searchGiphy = function (giphy){
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ giphy + '&api_key=RWQL0NEY3yW09w6yuz1nf4MlPLnK6F3x'
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        $('#displayGiphy').empty()
        for(var i = 0;i<10;i++){
            console.log(queryURL)
            var img = $( '<img>' )
            img.addClass('giph')
            img.attr('src',response.data[i].images.fixed_height_still.url)
            img.attr('data-animate',response.data[i].images.fixed_height.url)
            
        $('#displayGiphy').append(img)
        }
    })
    createButtons()
}

var playGiphy = function(){
    currentGiph = $(this)
    var newSrc = $(this).attr('src')
    var play = $(this).attr('data-animate')
    $(this).attr('src',play)
    $(this).attr('data-animate',newSrc)
}

$('#add-giphy').on('click',function(event){
    event.preventDefault();
    var giphy = $('#search-input').val().trim()
    if(!buttons.includes(giphy.toLowerCase()) && giphy){
        buttons.push(giphy)
    }
    createButtons()
    searchGiphy(giphy)
})

$('#save-giph').click(function(){
    if(currentGiph){
        $('#savedThumb').css('visibility','visible')
        setTimeout(function(){$('#savedThumb').css('visibility','hidden')},2000)
    }
    saved.push(currentGiph)
    
})

$(document).on("click", ".giphy",function(){
    var giphy = $(this).attr('data-name')
    searchGiphy(giphy)
})

$(document).on("click",".giph",playGiphy)

$('#saved').click(function(){
    $('#displayGiphy').empty()
    for(var i = 0; i<saved.length;i++){
        var img = saved[i]
        $('#displayGiphy').append(img)
    }
})

createButtons()