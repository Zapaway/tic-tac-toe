#!/usr/bin/env node

/* main.js */
/**
 * Two players can play a local game of tic-tac-toe in the terminal.
 */


/* Open source libs (please refer to "node_modules" folder to see all licenses for these libs)*/
import { createSpinner } from "nanospinner";  // https://github.com/usmanyunusov/nanospinner
import chalk from "chalk";  // https://github.com/chalk/chalk
import gradient from "gradient-string";  // https://github.com/bokub/gradient-string


/* Local files */
import { promptGetBoardPosition, promptGetPlayerName, promptWelcomeScreen, promptSelectYesOrNo } from "./res/prompts.js";
import { TicTacToeBoard } from "./res/tic-tac-toe-board.js";

/* Global constants */
const NL = () => console.log("\n");
const CLR = () => console.clear();
const LOADING_TIME_MS = 5000;
const MARKERS = ["O", "X"];

// game statuses
const NOT_DONE = Symbol();
const DONE_WIN = Symbol();
const DONE_TIE = Symbol();


/**
 * The game loop for tic-tae-toe. Handles all game events.
 * @param players The players within the game (turn order starts from index 0 and moves right).
 */
async function game(players) {
    const ticTacToeBoard = new TicTacToeBoard();
    let currTurnIndex = -1;
    let gameStatus = NOT_DONE;

    async function resetGameIfYes() {
        const isPlayingAgain = await promptSelectYesOrNo("Would you like to retry (keep name and turn order)?");
        if (isPlayingAgain) {
            ticTacToeBoard.reset();
            currTurnIndex = -1;
            gameStatus = NOT_DONE;
        }
        return isPlayingAgain;
    }

    // game loop
    while (true) {  
        // determine who's turn is it according to game status
        if (gameStatus === NOT_DONE) {  // change turn if NOT_DONE; keep turn if DONE to display winner/tie
            if (currTurnIndex + 1 === players.length) {
                currTurnIndex = 0;
            }
            else {
                currTurnIndex++;
            }
        }
        const currChar = MARKERS[currTurnIndex];
        const currPlayer = players[currTurnIndex];
        
        // display board and either current turn or restart menu
        NL();
        ticTacToeBoard.display();

        if (gameStatus !== NOT_DONE) {
            // determine msg based on game stat
            if (gameStatus === DONE_WIN) {
                console.log(gradient.pastel(`${currPlayer}, you have won!`));
            }
            else {  // DONE_TIE
                console.log(chalk.gray(`There is a tie!`));
            }

            // ask to restart
            if (await resetGameIfYes()) {
                CLR();
                continue;
            }
            else return;
        }
        console.log(`${currPlayer}, it's your turn!`)

        // get selected pos & replace
        const pos = await promptGetBoardPosition(ticTacToeBoard.avalPositions);
        ticTacToeBoard.replaceSpace(pos, currChar);

        // check to see if the board is done (match or full)
        if (ticTacToeBoard.checkForWin(currChar) !== null) {  // if there is a match
            gameStatus = DONE_WIN;
        }
        else if (ticTacToeBoard.avalPositions.length === 0) {  // if the board is full and there was no match
            gameStatus = DONE_TIE;
        }

        CLR();
    }
}

/**
 * Welcome players and get their information before starting the game.
 */
async function main() {
    // welcome players
    CLR();
    const isPlaying = await promptWelcomeScreen();
    if (!isPlaying) {
        NL();
        return;
    };
    
    // the players wants to play, so wait to get their info
    let players = [await promptGetPlayerName("Player 1"), await promptGetPlayerName("Player 2")];  // turn order is array order
    if (Math.random() > 0.5) players = players.reverse();  // randomize order

    // give moment before starting up game
    const loadingSpinner = createSpinner(chalk.green(`${chalk.bold(players[0])} will start first! Game will start shortly.`), {
        color: "green"
    }).start();
    
    setTimeout(async () => {
        loadingSpinner.success();
        NL();
        CLR();
        game(players);
    }, LOADING_TIME_MS);
}

await main();