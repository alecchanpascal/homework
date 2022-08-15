let word = 0
let guess = 0
const space = String.fromCharCode(20)
const words = [
    "stranger",
    "nothing"
]

$(document).ready(hangman = () => {
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
                    alert("You Won!")
                } else {
                    if (confirm("You Win!\nWould You Like to Keep Playing?")){
                        guess = 0
                        hangman()
                    } else {
                        $('#buttons').hide()
                    }
                    // display a win page or something?
                }
            }
        } else {
            $(`#${guess}`).hide()
            guess++
            $(`#${guess}`).show()
            if (guess === 6){
                if (confirm("You Lose!\nWould You Like to Try Again?")){
                    guess = 0
                    hangman()
                } else {
                    $('#buttons').hide()
                    $('#letters').hide()
                    // display a lose page?
                }
            } 
        }
    })
})
