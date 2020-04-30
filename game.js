var level = 0;
var started = false;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  $("h1").text("Level " + level);
  level++;
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}



function checkAnswer(currentCheck) {
  if(userClickedPattern[currentCheck]===gamePattern[currentCheck])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game over,Press any key to restrat!");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
 }
