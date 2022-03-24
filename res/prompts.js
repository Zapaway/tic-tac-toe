/**
 * Prompts that display within the terminal. 
 */

/* Open source libs */
import chalk from "chalk";
import animation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";

/**
 * Displays the welcome screen and asks if the players want to start the game.
 * @returns If "Yes", return true; otherwise false.
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
 * @param defaultName Default name if none is supplied.
 * @returns The player's name.
 */
export async function promptGetPlayerName(defaultName) {
    const res = await inquirer.prompt({
        name: "name",
        type: "input",
        message: `What is ${defaultName}'s name?`,
        default: () => defaultName,
    });

    return res.name.trim();
}

/**
 * 
 */
export async function promptGetBoardPosition() {
    const option = await inquirer.prompt({
        name: "pos",
        type: "list", 
        message: "What position do you want to pick on the board? 1 is the upperleft corner and 9 is the lowerright corner.",
        choices: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
        ]
    });

    return option.pos;
}
