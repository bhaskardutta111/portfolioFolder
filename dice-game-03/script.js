/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CHALLENGE 3
	Add another dice to the game, so that there are two dices now. 
	The player looses his current score when one of them is a 1. 
	(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var scores, activePlayer, currentScore, gamePlaying;

init();

//CREATING EVENT AND EVENT LISTNER 'roll dice button'

document.querySelector('.btn-roll-dice').addEventListener('click', function() {
	if (gamePlaying) {

		//GENERATING RANDOM NUMBER
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		//DISPLAY RESULT on UI
		document.getElementById('dice-1').style.display = "block";
		document.getElementById('dice-2').style.display = "block";
		document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';


		// UPDATE THE SCORE BY ADDING IT IF NOT 1
		if (dice1 !== 1 && dice2 !== 1) {
			currentScore += dice1 + dice2;
			document.getElementById('current-' + activePlayer).textContent = currentScore;

		}
		else{
			//CHANCE GOES TO NEXT PLAYER
			//activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
            document.getElementById('dice-1').src = 'images/dice-' + dice1 + '.png';
            document.getElementById('dice-2').src = 'images/dice-' + dice2 + '.png';
            
			nextPlayer();
		}

	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {

		//ADD CURRENT SCORE TO TOTAL SCORE
		scores[activePlayer] += currentScore;

		//DISPLAY IN UI
		document.getElementById('total-score-' + activePlayer).textContent = scores[activePlayer];


		//CHECK WHO IS WINNER
		if (scores[activePlayer] >=100) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner";
			document.getElementById('dice-1').style.display = 'none';
		    document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-name-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-name-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		} else {
			//NEXT PLAYER
			nextPlayer();
		} 
        document.getElementById('dice-1').style.display = 'none';
	    document.getElementById('dice-2').style.display = 'none';
	}
});

document.querySelector('.btn-new-game').addEventListener('click', init);

function nextPlayer(){
	if (activePlayer == 0) {
			activePlayer = 1;
		}
		else{
			activePlayer = 0;
		}

		currentScore = 0;
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;


		//document.querySelector('.player-name-2-panel').classList.add('active');
		//document.querySelector('.player-name-1-panel').classList.remove('active');
		document.querySelector('.player-name-0-panel').classList.toggle('active');
		document.querySelector('.player-name-1-panel').classList.toggle('active');
		
}

function init(){
	scores = [0,0];
	currentScore = 0;
	activePlayer = 0;
	gamePlaying = true;

		//all values to 0
		document.getElementById('total-score-0').textContent = '0';
		document.getElementById('total-score-1').textContent = '0';
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';


		document.getElementById('dice-1').style.display = 'none';
	    document.getElementById('dice-2').style.display = 'none';

		document.getElementById('name-0').textContent = "Player 1";
		document.getElementById('name-1').textContent = "Player 2";

		document.querySelector('.player-name-0-panel').classList.remove('winner');
		document.querySelector('.player-name-1-panel').classList.remove('winner');

		document.querySelector('.player-name-0-panel').classList.remove('active');
		document.querySelector('.player-name-1-panel').classList.remove('active');

		document.querySelector('.player-name-0-panel').classList.add('active');
}





//document.querySelector('#current-' + activePlayer).textContent = dice;

//var x = document.querySelector("total-score-1").textContent();
