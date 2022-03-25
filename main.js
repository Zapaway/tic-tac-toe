#!/usr/bin/env node

/**
 * Two players can play a local game of tic-tac-toe in the terminal.
 */


/* Open source libs (please refer to "node_modules" folder to see all licenses for these libs)*/
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

/* Local files */
import { promptGetBoardPosition, promptGetPlayerName, promptWelcomeScreen } from "./res/prompts.js";
import { TicTacToeBoard } from "./res/tic-tac-toe-board.js";

/* Global constants */
const NL = () => console.log("\n");


async function main() {
    const ticTacToeBoard = new TicTacToeBoard();

    // // welcome players
    // const isPlaying = await promptWelcomeScreen();
    // if (!isPlaying) {
    //     nl();
    //     return;
    // };
    
    // // the players wants to play, so wait to get their info
    // const player1 = await promptGetPlayerName("Player 1");
    // const player2 = await promptGetPlayerName("Player 2");
    while (true) {
        NL();
        ticTacToeBoard.display();
        const pos = await promptGetBoardPosition(ticTacToeBoard.avalPositions);
        ticTacToeBoard.replace(pos, "X");
        console.clear();

        if (ticTacToeBoard.checkForWin("X") !== null) {
            console.log("MEOW");
            break;
        }
    }
    // TIC_TAC_TOE_BOARD.replace(6, "X");
    // TIC_TAC_TOE_BOARD.display();
    // console.log(TIC_TAC_TOE_BOARD.avalPositions);
}
await main();

