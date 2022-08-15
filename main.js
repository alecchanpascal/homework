let word = 0
let guess = 0
const space = String.fromCharCode(20)
const words = [
    "stranger",
    "nothing",
    "something"
]

$(document).ready(function() {
    if (document.cookie){
        console.log(document.cookie)
        word = parseInt(document.cookie.split('=')[1])
    }
    $('img').hide()
    $('#0').show()
    $('h1').remove()
    $('button').removeClass('disabled')
    $('button').removeClass('highlight')
    words[word] = words[word].toUpperCase()
    let left = words[word].length
    for (let i = 0; i < words[word].length; i++){
        $('#letters').append(`<h1>${space}</h1>`)
        $('#letters').append(`<h1>${space}</h1>`)
        $('#letters').append(`<h1 class="${i}">${space}</h1>`)
        $('#letters').append(`<h1 id="end">${space}</h1>`)
    }
    $(document).on('keypress', event => {
        console.log(String.fromCharCode(event.which).toUpperCase())
    })
    $('button').click(function() {
        $(this).addClass('highlight')
        $(this).addClass('disabled')
        if (words[word].includes($(this).html())){
            for (let i = 0; i < words[word].length; i++){
                if (words[word][i] === $(this).html()){
                    $(`h1.${i}`).prev().remove()
                    $(`h1.${i}`).html($(this).html())
                    left--
                }
            }
            if (left === 0){
                word++
                if (word >= words.length){
                    if (confirm("You've Guessed Every Word!\nWould You Like to Restart?")){
                        document.cookie = 'username=0; expires=0'
                        location.reload()
                    } else {
                        // win page or something?
                    }
                } else {
                    if (confirm("You Win!\nWould You Like to Keep Playing?")){
                        document.cookie = `username=${word}; expires=0`
                        location.reload()
                    } else {
                        $('#buttons').hide()
                        // display a win page or something?
                    }
                }
            }
        } else {
            $(`#${guess}`).hide()
            guess++
            $(`#${guess}`).show()
            if (guess === 6){
                if (confirm("You Lose!\nWould You Like to Try Again?")){
                    document.cookie = `username=${word}; expires=0`
                    location.reload()
                } else {
                    $('#buttons').hide()
                    $('#letters').hide()
                    // display a lose page?
                }
            } 
        }
    })
})
