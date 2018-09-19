var buttons = ['rick and morty','supersmash bros','coding','fortnite']

var searchIndex = 0;

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
        var img = $( '<img>' )
        img.attr('src',response.data[searchIndex].images.fixed_height.url)
        $('#displayGiphy').append(img)
    })
    createButtons()
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

$(document).on("click", ".giphy",function(){
    var giphy = $(this).attr('data-name')
    searchGiphy(giphy)
    searchIndex++
})

createButtons()