/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CODING CHALLANGE 2
	-Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
	(Hint: you can read that value with the .value property in JavaScript. 
	This is a good oportunity to use google to figure this out :)



*/

var scores, activePlayer, currentScore, gamePlaying;

init();

//CREATING EVENT AND EVENT LISTNER 'roll dice button'

document.querySelector('.btn-roll-dice').addEventListener('click', function() {
	if (gamePlaying) {

		//GENERATING RANDOM NUMBER
		var dice = Math.floor(Math.random() * 6) + 1;

		//DISPLAY RESULT 
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'images/dice-' + dice + '.png';

		// UPDATE THE SCORE BY ADDING IT IF NOT 1
		if (dice !== 1) {
			currentScore += dice;
			document.getElementById('current-' + activePlayer).textContent = currentScore;

		}
		else{
			//CHANCE GOES TO NEXT PLAYER
			//activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
            diceDOM.style.display = 'block';
            diceDOM.src = 'images/dice-1.png';

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

		//CHALLENGE 2
		var inputTarget = document.querySelector('.targetScore').value; 
		var winningScore;

		//IN INPUT FIELD, UNDEFINED, NULL ARE FALSE
		//REST ANY DATATYPE IS TRUE
		if (inputTarget) {
			winningScore = inputTarget;
		} else{
			winningScore = 100;
		}

		//CHECK WHO IS WINNER
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = "Winner";
			document.querySelector('.dice').style.display = "none";
			document.querySelector('.player-name-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-name-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		} else {
			//NEXT PLAYER
			nextPlayer();
		} document.querySelector('.dice').style.display = 'none';
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


		document.querySelector('.dice').style.display = 'none';

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
