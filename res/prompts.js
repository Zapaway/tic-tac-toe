/* prompts.js */
/**
 * Prompts that display within the terminal. 
 */


/* Open source libs (please refer to "node_modules" folder to see all licenses for these libs)*/
import inquirer from "inquirer";  // https://github.com/SBoudrias/Inquirer.js
import gradient from "gradient-string";  // https://github.com/bokub/gradient-string
import figlet from "figlet";  // https://github.com/cmatsuoka/figlet

/**
 * Displays the welcome screen and asks if the players want to start the game.
 * @returns If "Yes", return true; otherwise false.
 */
export async function promptWelcomeScreen() {
    console.log(gradient.pastel.multiline(figlet.textSync("Tic Tac Toe")));
    console.log("Welcome to Tic-Tac-Toe! Whoever gets three in a row wins.\n");

    return await promptSelectYesOrNo("Would you like to play?");
}

/**
 * Prompts the user yes or no. 
 * @param message The message to prompt the user with.
 * @returns If "Yes", return true; otherwise false.
 */
export async function promptSelectYesOrNo(message) {
    const options = await inquirer.prompt({
        name: "chosen",
        type: "list",
        message: message,
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
 * Get a board position.
 * @returns Board position.
 */
export async function promptGetBoardPosition(avalPositions) {
    const option = await inquirer.prompt({
        name: "pos",
        type: "list", 
        message: "What available position do you want to pick on the board? 1 is the upperleft corner and 9 is the lowerright corner.",
        choices: avalPositions,
    });

    return option.pos;
}