let word = 0;
const space = String.fromCharCode(20);
const words = [
    "stranger",
]

$(document).ready(function() {
    $('img').hide()
    $('#0').show()
    words[word] = words[word].toUpperCase()
    for (let i = 0; i < words[word].length; i++){
        $('#letters').append(`<h1 id="remove">${space}</h1>`)
        $('#letters').append(`<h1>${space}</h1>`)
        $('#letters').append(`<h1 class="${i}">${space}</h1>`)
        $('#letters').append(`<h1 id="end">${space}</h1>`)
    }
    $('button').click(function() {
        $(this).addClass('highlight')
        $(this).addClass('disabled')
        if (words[word].includes($(this).html())){
            $(`h1.${(words[word].indexOf($(this).html()))}`).prev().remove()
            $(`h1.${(words[word].indexOf($(this).html()))}`).html($(this).html())
        }
    })
})
