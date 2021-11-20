
const AVAILABLE_MOVES = ['rock','scissors','paper'];
const PLAYER_WINS = 1 ;
const DRAW = 0 ;
const COMPUTER_WINS = -1 ;

const game_container = document.querySelector('#game-container');
const info_p = document.querySelector('#info');
const buttons = document.querySelectorAll('.control-btn');
const user_score = document.querySelector('#user-side .score');
const user_choice = document.querySelector('#user-side .choice');
const com_score = document.querySelector('#com-side .score');
const com_choice = document.querySelector('#com-side .choice');


let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    return AVAILABLE_MOVES[Math.floor(Math.random() * AVAILABLE_MOVES.length)];
}

function playRound(playerSelection) {
    let computerSelection = computerPlay();
    if (playerSelection == computerSelection){
        updateGameState(playerSelection,computerSelection,DRAW);
        return;
    }
    else if ((AVAILABLE_MOVES.indexOf(playerSelection) + 1) % AVAILABLE_MOVES.length  == AVAILABLE_MOVES.indexOf(computerSelection)){
        playerScore += 1;
        updateGameState(playerSelection,computerSelection,PLAYER_WINS);
        return;
    }
    computerScore += 1;
    updateGameState(playerSelection,computerSelection,COMPUTER_WINS);
    return;
}

function updateGameState(playerSelection,computerSelection,outcome) {
    if (info_p){
        info_p.remove();
    }
    let user_color;
    let com_color;
    switch (outcome){
        case PLAYER_WINS:
            user_color= 'green';
            com_color = 'red';
            break;
        case COMPUTER_WINS:
            user_color= 'red';
            com_color = 'green';
            break;
        case DRAW:
            user_color= 'gray';
            com_color = 'gray';
    }

    //update scores
    user_score.textContent = 'User: ' + playerScore;
    com_score.textContent = 'Com: ' + computerScore;
    //update choices
    user_choice.textContent = playerSelection;
    com_choice.textContent = computerSelection;

    //update colors
    user_score.style.color = user_color;
    user_choice.style.color = user_color;
    com_score.style.color = com_color;
    com_choice.style.color = com_color;

    if (playerScore == 5){
        gameOver('player');
    }
    else if (computerScore == 5){
        gameOver('computer');
    }
}

function gameOver(winner) {
    let message = winner + ' won';

    while (game_container.firstChild) {
        game_container.removeChild(game_container.lastChild);
    }

    let end_game_div =  document.createElement('div');
    end_game_div.style.display = 'flex';
    end_game_div.style.flexDirection = 'column';
    end_game_div.style.justifyContent = 'center';
    end_game_div.style.alignItems = 'center';

    let winner_h =  document.createElement('h2');
    winner_h.textContent = message;

    let play_again_h =  document.createElement('button');
    play_again_h.textContent = 'Play again ?';

    play_again_h.addEventListener('click', () => {
        location.reload(); //reload page so that game restarts, I know not the most efficient method
    });

    end_game_div.appendChild(winner_h);
    end_game_div.appendChild(play_again_h);
    game_container.appendChild(end_game_div);
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playRound(button.id);
    });
});