#!/usr/bin/env node

/* Open source libs */
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

/* Local files */
import { promptGetBoardPosition, promptGetPlayerName, promptWelcomeScreen } from "./res/prompts.js";
import { TicTacToeBoard } from "./res/tic-tac-toe-board.js";

const TIC_TAC_TOE_BOARD = new TicTacToeBoard();

async function main() {
    // const nl = () => console.log("\n");

    // // welcome players
    // const isPlaying = await promptWelcomeScreen();
    // if (!isPlaying) {
    //     nl();
    //     return;
    // };
    
    // // the players wants to play, so get their info
    // const player1 = await promptGetPlayerName("Player 1");
    // const player2 = await promptGetPlayerName("Player 2");
    while (true) {
        TIC_TAC_TOE_BOARD.display();
        const pos = await promptGetBoardPosition();
        TIC_TAC_TOE_BOARD.replace(pos, "X");
        console.clear();

        if (TIC_TAC_TOE_BOARD.checkForWin("X") !== null) {
            console.log("MEOW");
            break;
        }
    }
    // TIC_TAC_TOE_BOARD.replace(6, "X");
    // TIC_TAC_TOE_BOARD.display();
}
await main();

