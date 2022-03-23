/**
 * Use
 */

/* Open source libs */
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

/**
 * Displays the welcome screen and asks if the players want to start the game.
 * If so, return true.
 */
export async function promptWelcomeScreen() {
    console.log(gradient.pastel.multiline(figlet.textSync("Tic Tac Toe")));
    console.log("Welcome to Tic-Tac-Toe! Whoever gets three in a row wins.\n");

    const options = await inquirer.prompt({
        name: "chosen",
        type: "list",
        message: "Would you like to play?",
        choices: [
            "Yes",
            "No",
        ],
    });

    return options.chosen === "Yes";
}

/**
 * Get a player's name.
 */
export async function promptGetPlayerName(defaultName) {
    const ans = await inquirer.prompt({
        name: "name",
        type: "input",
        message: `What is ${defaultName}'s name?`,
        default: () => defaultName,
    });

    return ans.name.trim();
}