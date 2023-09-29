let userChoice='';
let computerMove = '';

const nameInput= document.querySelector('#name');
const userName = localStorage.getItem('userName') || '';
nameInput.value = userName;

nameInput.addEventListener('change', (e) => {
  localStorage.setItem('userName', e.target.value);
})

let score = { 
  wins: 0,
  losses: 0,
  ties: 0
};

const savedScore = JSON.parse(localStorage.getItem('score'));
if(savedScore){
  score =savedScore;
}

updateScore();

function resetScore(){
  score = {
    wins: 0,
    losses:0,
    ties:0
  };
  updateScore();
  localStorage.removeItem('score');
}

function pickComputerMove ()
{
   const randomeNum = Math.random();
   

   if(randomeNum >= 0 && randomeNum<1/3){
     computerMove = 'rock';
   }
   else if(randomeNum >= 1/3 && randomeNum<2/3){
     computerMove ='paper';
   }
   else if(randomeNum >=2/3 && randomeNum <=1){
     computerMove ='scissors';
   }

   return computerMove;
}

// 

function clicking(userChoice){
var image_location = "images/" + userChoice + "-1" + ".png";
var selector = document.getElementsByClassName("userGame");

selector[0].classList.add("addAnimation");
var sel = document.getElementsByClassName("addAnimation");
selector[0].style.setProperty("--userImage","url("+image_location+")");
setTimeout(function(){
  selector[0].classList.remove("addAnimation");
},500)
playMove(userChoice);
clearTimeout();

}

function playMove(userChoice)
{

  const computerMove = pickComputerMove();
  const result = document.querySelector('.js-result');

  var selector = document.getElementsByClassName("computerGame");
  var image_location = "images/" + computerMove + "-2" + ".png";
  selector[0].classList.add("addAnimation");
  var sel = document.getElementsByClassName("addAnimation");
  selector[0].style.setProperty("--computerImage","url("+image_location+")");
  setTimeout(function(){
    selector[0].classList.remove("addAnimation");
  },500)
  clearTimeout();

    if(userChoice === computerMove){
      result.innerHTML = 'Ties.';
      score.ties += 1;
    }
    else if( 
      (userChoice === 'rock' && computerMove === 'scissors') || 
      (userChoice ==='paper' && computerMove === 'rock') ||
      (userChoice === 'scissors' && computerMove === 'paper')  )
      {
        result.innerHTML = 'You Wins.';
        score.wins +=1;
      }
    else
    {
      result.innerHTML = 'You lose.';
      score.losses +=1;
    }
       

    updateScore();
    localStorage.setItem('score', JSON.stringify(score));

    
}

function updateScore(){
// alert(`You picked ${userChoice}. computer picked ${computerMove}. ${result}
//    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
document.querySelector('.js-score').innerHTML =`
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetGame(){
document.querySelector('.js-result').innerHTML = '';

var resetUserChoice = document.getElementsByClassName("userGame");
resetUserChoice[0].style.setProperty("--userImage", "url("+ +")");

var resetComputerChoice = document.getElementsByClassName("computerGame");
resetComputerChoice[0].style.setProperty("--computerImage","("+ +")");
}