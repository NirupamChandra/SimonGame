$(document).ready(function () {
    
  var buttonColors = ["green", "red", "yellow", "blue"];
  var gamePattern = [];
  var userClickedPattern = [];
  var level = -1;
  var start = false;

  $(document).on("keypress", function(e) {
    if (start === false) {
      start = true;
      nextSeq();
    } else if ((e.key == "r" || e.key == "R") && start === true) {
      restart();
    }
  });

  function nextSeq() {
    var rand;
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    rand = Math.random();
    rand = Math.floor(rand * 4);

    var colorChose = buttonColors[rand];
    gamePattern.push(colorChose);
    console.log(gamePattern);

    $("#" + colorChose)
      .fadeIn(50)
      .fadeOut(100)
      .fadeIn(50);
    playSound(colorChose);
  }

  $(".btn").on("click", function() {

    var userChoseColor = $(this).attr("id");
    console.log(userChoseColor);

    userClickedPattern.push(userChoseColor);
    console.log(userClickedPattern);
    playSound(userChoseColor);
    animatePress(userChoseColor);
    checkSeq(userClickedPattern.length - 1);
  });

  function checkSeq(curPos) {
    if (gamePattern[curPos] === userClickedPattern[curPos]) {
      //i.e checking for each index of userPattern with gamePattern

      if (gamePattern.length === userClickedPattern.length) {
        console.log("Success");
        //calling for nextSequenceGeneration i.e newLevel...with some time gap
        setTimeout(nextSeq, 1000);
      }
    } else {
      failedError();
    }
  }

  function playSound(colorSound) {
    var str = `./sounds/${colorSound}.mp3`;
    var sound = new Audio(str);
    sound.play();
  }

  function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function() {
      $("." + currentColor).removeClass("pressed");
    }, 150);
  }

  function failedError() {
    $("#level-title").text("Game Over, Press Key (R/r) to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
  }

  function restart() {
    level = -1;
    gamePattern = [];
    start = true;
    nextSeq();
  }
});
