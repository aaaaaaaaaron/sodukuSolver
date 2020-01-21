import {Box} from "./Box"

export class Grid {
    private mainArray: Array<Array<Box>>;
    
    constructor() {
        this.mainArray = [];
        this.fillArray();
    }

    fillArray() {
        for (let i = 0; i < 9; i++) {
            let row = []; // Creates a blank new row 9 times.
            for (let j = 0; j < 9; j++) {
                row.push(new Box())
            }
            this.mainArray.push(row);
        }
    }

    getBox(row: number, column: number) {
        return this.mainArray[row][column]
    }
}