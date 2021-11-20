
const AVAILABLE_MOVES = ['rock','scissors','paper'];
const NUMBER_OF_ROUNDS = 5 ;
const PLAYER_WINS = 1 ;
const DRAW = 0 ;
const COMPUTER_WINS = -1 ;

function computerPlay() {
    return AVAILABLE_MOVES[Math.floor(Math.random() * AVAILABLE_MOVES.length)];
}

function playRound(playerSelection ,computerSelection ) {
    if (playerSelection == computerSelection){
        return DRAW;
    }
    else if ((AVAILABLE_MOVES.indexOf(playerSelection) + 1) % AVAILABLE_MOVES.length  == AVAILABLE_MOVES.indexOf(computerSelection)){
        return PLAYER_WINS;
    }
    return COMPUTER_WINS;
}

function game() {
    // for debug
    function outcome2string (outcome) {
        switch (outcome){
            case PLAYER_WINS:
                return 'player wins'
            case DRAW:
                return 'draw'
            case COMPUTER_WINS:
                return 'computer wins'
            default:
                console.log('invalid input')
                return 'none'
        }
    }
    let computerSelection;
    let playerSelection;
    let outcome;
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
        //player input
        do {
            playerSelection = prompt('write "rock","paper" or "scissors"');
            playerSelection = playerSelection.toLowerCase();
            isInvalid = !AVAILABLE_MOVES.includes(playerSelection);
            if (isInvalid){
                alert('invalid input');
            }
        }
        while (isInvalid);
        //computer input
        computerSelection = computerPlay();
        //play a round
        outcome = playRound(playerSelection ,computerSelection );
        //declare round winner
        console.log('computer choose ' + computerSelection + ' player choose ' + playerSelection + ' outcome: ' + outcome2string(outcome));
        //update total score
        outcome > 0 ? playerScore +=1 : computerScore +=1 ;
      }
    alert('game over \nplayer score: ' + playerScore + '\ncomputer score: ' + computerScore);
}


game();