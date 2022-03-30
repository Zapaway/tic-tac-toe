/* tic-tac-toe-board.js */

const DEFAULT_TIC_TAC_TOE_BOARD = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];  // nested array allows easier tracking of markers and calculation of finding any three-in-a-rows

/**
 * Class containing all methods and properties related to the 3x3 tic-tac-toe board.
 */
export class TicTacToeBoard {
    /**
     * Create an empty 3x3 tic-tac-toe-board.
     */
    constructor() {
        this.ticTacToeBoard = JSON.parse(JSON.stringify(DEFAULT_TIC_TAC_TOE_BOARD));  // make deep copy of nested array
    };

    /**
     * All available positions on the board.
     * @returns Array of available board positions.
     */
    get avalPositions() {
        const flatBoard = this.ticTacToeBoard.flat();

        // for every element, if there isn't an aval space, filter it out; turn array indices to board positions for aval spaces
        return flatBoard.map((val, i, _) => val === " " ? i + 1: null).filter(val => val !== null);
    }

    /**
     * Display the board (with a newline at end) to console.
     */
    display() {
        console.log(`
    ${this.ticTacToeBoard[0][0]}   |   ${this.ticTacToeBoard[0][1]}   |    ${this.ticTacToeBoard[0][2]} 
    ------------------
    ${this.ticTacToeBoard[1][0]}   |   ${this.ticTacToeBoard[1][1]}   |    ${this.ticTacToeBoard[1][2]} 
    ------------------
    ${this.ticTacToeBoard[2][0]}   |   ${this.ticTacToeBoard[2][1]}   |    ${this.ticTacToeBoard[2][2]} 

`);
    }

    /**
     * Replace an empty slot with a character.
     * @param pos Board position ranging from 1 (the upperleft corner) to 9 (the lowerright corner).
     * @param char The character to use. 
     * @returns If successful, return true; if space taken or doesn't exist, return false.
     */
    replaceSpace(pos, char) {
        if (pos < 1 || pos > 9) {  // out of bounds
            return false;
        }

        if (this._getCharAtPos(pos) !== " ") {  // if already taken
            return false;
        }

        this._setCharAtPos(pos, char);
        return true;
    }

    /** 
     * Check if the board contains a 3-in-a-row (a win).
     * @param target The character to look for. 
     * @returns The character if in the 3-in-a-row, otherwise null.
     */
    checkForWin(target) {
        // helper for checking if array indices indicate match by providing an arr
        const checkIndicesForMatch = arr => arr.map(x => this._getCharAtPos(x)).every(x => x === target);

        // check horizontally
        for (let row of this.ticTacToeBoard) {
            if (row.every(x => x === target)) {
                return target;
            }
        }

        // check vertically
        for (let i = 1; i < 4; ++i) {  
            if (checkIndicesForMatch([i, i+3, i+6])) {
                return target;
            }
        }

        // check diagonally 
        const upperleftToLowerright = [1, 5, 9];
        const upperrightToLowerleft = [3, 5, 7];
        if (checkIndicesForMatch(upperleftToLowerright) || checkIndicesForMatch(upperrightToLowerleft)) {
            return target;
        }
        
        return null;
    }

    /**
     * Reset the board.
     */
    reset() {
        this.ticTacToeBoard = JSON.parse(JSON.stringify(DEFAULT_TIC_TAC_TOE_BOARD));
    }

    /* private helpers */
    /**
     * Get character using board position.
     * @param pos Position starting at 1.  
     * @returns The character if found, or null.
     */
    _getCharAtPos(pos) {
        const {row, col} = this._getArrayIndicesFromBoardPos(pos);
        return this.ticTacToeBoard[row][col];
    }

    /**
     * Set character at given board position. 
     * @param pos Position starting at 1.  
     * @param char The character to set.
     */
     _setCharAtPos(pos, char) {
        const {row, col} = this._getArrayIndicesFromBoardPos(pos);
        this.ticTacToeBoard[row][col] = char;
    }

    /**
     * Turn board position (starts at 1) to 2D array indices. 
     * @param pos Position starting at 1.  
     * @returns [row, column]
     */
    _getArrayIndicesFromBoardPos(pos) {
        const flatIndex = pos - 1;  // index of flattened board; if board was  a 1D array, it's [" ", " ", " ", " ", " ", " ", " ", " "]
        const row = Math.floor(flatIndex/3);
        const column = flatIndex % 3;

        return {"row": row, "col": column};
    }
}