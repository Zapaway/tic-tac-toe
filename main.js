#!/usr/bin/env node

/* Open source libs */
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

/* Local files */
import { promptGetPlayerName, promptWelcomeScreen } from "./res/prompts.js";

const TIC_TAC_TOE_BOARD = [ 
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

async function main() {
    const newline = () => console.log("\n");

    // welcome players
    const isPlaying = await promptWelcomeScreen();
    if (!isPlaying) return;
    
    // the players wants to play, so get their info
    const player1 = await promptGetPlayerName("Player 1");
    const player2 = await promptGetPlayerName("Player 2");
}
await main();

