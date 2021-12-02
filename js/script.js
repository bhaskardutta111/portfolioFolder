function diceGame00Active() {  
    app00DetailsPanel();
    navItem00();
}

function diceGame01Active() {
    app01DetailsPanel();
    navItem01();
}

function diceGame02Active() {
    app02DetailsPanel();
    navItem02();
}

function diceGame03Active(){
    app03DetailsPanel();
    navItem03();
}

function budgetAppActive(){
    app04DetailsPanel();
    navItem04();    
}

/*FUNCTIONS FOR DICE GAME 00*/
function app00DetailsPanel(){
        document.querySelector('.dice-game-00-rules').style.display = 'block';    
        document.querySelector('.dice-game-01-rules').style.display = 'none';
        document.querySelector('.dice-game-02-rules').style.display = 'none';
        document.querySelector('.dice-game-03-rules').style.display = 'none';
        document.querySelector('.budget-app-descrip').style.display = 'none';
        console.log('app00start');
}
function navItem00(){
        document.querySelector('.dice-game-00').classList.toggle('appLive');
        document.querySelector('.dice-game-01').classList.remove('appLive');
        document.querySelector('.dice-game-02').classList.remove('appLive');
        document.querySelector('.dice-game-03').classList.remove('appLive');
        document.querySelector('.budget-app').classList.remove('appLive');
}

/*FUNCTIONS FOR DICE GAME 01*/
    function app01DetailsPanel(){
        document.querySelector('.dice-game-01-rules').style.display = 'block';
        document.querySelector('.dice-game-00-rules').style.display = 'none';
        document.querySelector('.dice-game-02-rules').style.display = 'none';
        document.querySelector('.dice-game-03-rules').style.display = 'none';
        document.querySelector('.budget-app-descrip').style.display = 'none';
}
    function navItem01() {
        document.querySelector('.dice-game-01').classList.toggle('appLive');
        document.querySelector('.dice-game-00').classList.remove('appLive');
        document.querySelector('.dice-game-02').classList.remove('appLive');
        document.querySelector('.dice-game-03').classList.remove('appLive');
        document.querySelector('.budget-app').classList.remove('appLive');        
}

/*FUNCTIONS FOR DICE GAME 02*/
    function app02DetailsPanel(){
        document.querySelector('.dice-game-02-rules').style.display = 'block';
        document.querySelector('.dice-game-00-rules').style.display = 'none';
        document.querySelector('.dice-game-01-rules').style.display = 'none';
        document.querySelector('.dice-game-03-rules').style.display = 'none';
        document.querySelector('.budget-app-descrip').style.display = 'none';        
}

    function navItem02() {
        document.querySelector('.dice-game-02').classList.toggle('appLive');
        document.querySelector('.dice-game-00').classList.remove('appLive');
        document.querySelector('.dice-game-01').classList.remove('appLive');
        document.querySelector('.dice-game-03').classList.remove('appLive');
        document.querySelector('.budget-app').classList.remove('appLive');        
}


/*FUNCTIONS FOR DICE GAME 03*/
    function app03DetailsPanel(){
        document.querySelector('.dice-game-03-rules').style.display = 'block';
        document.querySelector('.dice-game-00-rules').style.display = 'none';
        document.querySelector('.dice-game-01-rules').style.display = 'none';
        document.querySelector('.dice-game-02-rules').style.display = 'none';
        document.querySelector('.budget-app-descrip').style.display = 'none';        
}
    function navItem03(){
        document.querySelector('.dice-game-03').classList.toggle('appLive');
        document.querySelector('.dice-game-00').classList.remove('appLive');
        document.querySelector('.dice-game-01').classList.remove('appLive');
        document.querySelector('.dice-game-02').classList.remove('appLive');
        document.querySelector('.budget-app').classList.remove('appLive');        
}


/*FUNCTIONS FOR BUDGET APP*/
    function app04DetailsPanel(){
        document.querySelector('.budget-app-descrip').style.display = 'block';
        document.querySelector('.dice-game-00-rules').style.display = 'none';
        document.querySelector('.dice-game-01-rules').style.display = 'none';
        document.querySelector('.dice-game-02-rules').style.display = 'none';
        document.querySelector('.dice-game-03-rules').style.display = 'none';         
}
    function navItem04(){
        document.querySelector('.budget-app').classList.toggle('appLive');
        document.querySelector('.dice-game-00').classList.remove('appLive');
        document.querySelector('.dice-game-01').classList.remove('appLive');
        document.querySelector('.dice-game-02').classList.remove('appLive');
        document.querySelector('.dice-game-03').classList.remove('appLive');   
}


document.querySelector('.dice-game-00').addEventListener('click', diceGame00Active);

document.querySelector('.dice-game-01').addEventListener('click', diceGame01Active);

document.querySelector('.dice-game-02').addEventListener('click', diceGame02Active);

document.querySelector('.dice-game-03').addEventListener('click', diceGame03Active);

document.querySelector('.budget-app').addEventListener('click', budgetAppActive);


/*
document.querySelector('.dice-game-00-btn').addEventListener('pointerout', () => {
    document.querySelector('.dice-game-00-btn').classList.add('.button');    
});
*/
document.querySelector('.dice-game-01-btn').addEventListener('pointerout', () => {
    document.querySelector('.dice-game-01-btn').classList.add('.button');    
});

document.querySelector('.dice-game-02-btn').addEventListener('pointerout', () => {
    document.querySelector('.dice-game-02-btn').classList.add('.button');    
});

document.querySelector('.dice-game-03-btn').addEventListener('pointerout', () => {
    document.querySelector('.dice-game-03-btn').classList.add('.button');    
});

document.querySelector('.budget-app-btn').addEventListener('pointerout', function () {
    document.querySelector('.budget-app-btn').classList.add('.button');    
});

