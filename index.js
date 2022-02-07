// alert("hello peter");

// $('h1').css('background-color','red');

var buttonColors = ['red','blue', 'green','yellow'];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = (Math.floor(Math.random()*4));
    console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);

    $('#'+randomChosenColor).fadeOut(300).fadeIn(300);

    buttonSound(randomChosenColor);

    level++;
    $('h1').text('Level ' + level);

    userClickedPattern = [];
}

function buttonSound (key) {
    switch (key) {
        case 'red':
            var red  = new Audio('sounds/red.mp3');
            red.play(); 
            break;
        case 'yellow':
            var yellow  = new Audio('sounds/yellow.mp3');
            yellow.play(); 
            break;
        case 'blue':
            var blue  = new Audio('sounds/blue.mp3');
            blue.play(); 
            break;
        case 'green':
            var green  = new Audio('sounds/green.mp3');
            green.play(); 
            break;
        default:
            var wrong = new Audio('sounds/wrong.mp3')
            wrong.play();
            break;
    }
}


// $('button').addEventListener('click', function(event) {
//     buttonSound(event.key);
// });

$(".btn").click(function() {
    
    var userChosenColor = this.id;
    buttonSound(userChosenColor);
    console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    // handler(event);
});

// function handler(event) {
//     var userChosenColor = event.attr('id');
//     console.log(userChosenColor);
// }

function animatePress(currrentColor) {

    $('#'+currrentColor).addClass('pressed');

    setTimeout( function() {
        $('#'+currrentColor).removeClass('pressed');
    },300);
}
$('body').keydown(function(event) {
    console.log(event.key);
    if (level === 0) {
        nextSequence();
        level = 1;
    };
});



function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success!');
        console.log(currentLevel+ ' ' + gamePattern.length);
        if (currentLevel + 1 === gamePattern.length) {
            
            setTimeout( nextSequence, 500);

        }
    }

    else {
        console.log('wrong!');

        buttonSound();

        console.log('gamePatern: ' + gamePattern);

        $('body').addClass('game-over');

        setTimeout( function () {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').text('Game over! Press any key to restart')

        startOver();
    }

    function startOver() {
        level = 0;
        gamePattern = [];
    }

    
}