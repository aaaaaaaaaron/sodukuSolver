import {Grid} from "./Grid"
import {Box} from "./Box"


export class Solver {

    private toSolve: Grid;

    constructor(toSolve: Grid) {
        this.toSolve = toSolve;
    }

    public solve() {
        this.displayGrid();
        console.log("SOLVING...!!!")
        for (let i = 0; i < 300; i++) {
            this.passThrough(i);
        }
        this.displayGrid()
        console.log("Done solving (:");

        // console.log(this.toSolve.getBox(5,3).possibleNums);
        // console.log(this.toSolve.getBox(5,4).possibleNums);
        // console.log(this.toSolve.getBox(6,3).possibleNums);

    }

    private passThrough(iteration: number) { //passes through all boxes in a grid
        for (let row = 0; row < 9; row++){
            for (let column = 0; column < 9; column++) {
                let currentBox = this.toSolve.getBox(row, column);
                
                if (currentBox.possibleNums.length === 1) { // if there is only one possible option, set that box to that option.
                    currentBox.setBoxNum(currentBox.possibleNums[0])
                    console.log("one option left o:")
                }

                if (currentBox.getBoxNum() !== null) { // does the refining of possible nums around it
                    this.refineRow(currentBox, row);
                    this.refineColumn(currentBox, column);
                    this.refineSquare(currentBox, row, column);

                    if (iteration % 30 === 29) { // only use this every 30 loops
                        // this.checkOnlyRow(currentBox, row, column);
                        this.checkOnlyColumn(currentBox, row, column);
                        // this.checkOnlySquare(currentBox, row, column);
                    }
                }
            }
        }
    }

    private refineRow(box: Box, row: number) {
        let currentBoxNum = box.getBoxNum();

        for (let column = 0; column < 9; column++) {
            this.toSolve.getBox(row, column).possibleNums = this.arrayRemove(this.toSolve.getBox(row, column).possibleNums, currentBoxNum);
        }
    }

    private refineColumn(box: Box, column: number) {
        let currentBoxNum = box.getBoxNum();

        for (let row = 0; row < 9; row++) {
            this.toSolve.getBox(row, column).possibleNums = this.arrayRemove(this.toSolve.getBox(row, column).possibleNums, currentBoxNum);
        }

    }

    private refineSquare(box: Box, row: number, column: number) {
        let currentBoxNum = box.getBoxNum();

        let rowClassifier = Math.floor(row/3);
        let columnClassifier = Math.floor(column/3); // figures out what square they are in.

        // console.log(rowClassifier + ", " + columnClassifier + "  boxnum: " + currentBoxNum);

        for (let toCheckRow = 0; toCheckRow < 9; toCheckRow++){
            for (let toCheckColumn = 0; toCheckColumn < 9; toCheckColumn++) {
                let toCheckRowClassifier = Math.floor(toCheckRow/3);
                let toCheckColumnClassifier = Math.floor(toCheckColumn/3);

                if (rowClassifier === toCheckRowClassifier && columnClassifier === toCheckColumnClassifier) {
                    this.toSolve.getBox(toCheckRow, toCheckColumn).possibleNums = this.arrayRemove(this.toSolve.getBox(toCheckRow, toCheckColumn).possibleNums, currentBoxNum);
                }
            }
        }

    }

    private checkOnlyRow(box: Box, row: number, boxColumn: number) { // We have to keep track of box column because we don't want to subtact itself
        let uniquePossibleNums = [...box.possibleNums]; // copying array

        for (let column = 0; column < 9; column++) {
            if (column !== boxColumn){ // we do this to make sure we don't subrtract self
                let currentPossibleNums = [...this.toSolve.getBox(row, column).possibleNums];
                uniquePossibleNums = uniquePossibleNums.filter(function(x) { return currentPossibleNums.indexOf(x) < 0 })
            }
        }

        if  (uniquePossibleNums.length === 1) {
            box.setBoxNum(uniquePossibleNums[0]);
        }
    }

    private checkOnlyColumn(box: Box, boxRow: number, column: number) {
        let uniquePossibleNums = [...box.possibleNums];

        for (let row = 0; row < 9; row++) {
            if (row !== boxRow) {
                let currentPossibleNums = [...this.toSolve.getBox(row, column).possibleNums];
                uniquePossibleNums = uniquePossibleNums.filter(function(x) { return currentPossibleNums.indexOf(x) < 0 })
            }
        }

        if  (uniquePossibleNums.length === 1) {
            box.setBoxNum(uniquePossibleNums[0]);
        }
    }

    private checkOnlySquare(box: Box, boxRow: number, boxColumn: number) {
        let uniquePossibleNums = [...box.possibleNums];
        let boxRowID = Math.floor(boxRow/3);
        let boxColumnID = Math.floor(boxColumn/3);

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                if (row !== boxRow && column !== boxColumn && Math.floor(row/3) === boxRowID && Math.floor(column/3) === boxColumnID) {
                    let currentPossibleNums = [...this.toSolve.getBox(row, column).possibleNums];
                    uniquePossibleNums = uniquePossibleNums.filter(function(x) { return currentPossibleNums.indexOf(x) < 0 })
                }
            }
        }

        if  (uniquePossibleNums.length === 1) {
            box.setBoxNum(uniquePossibleNums[0]);
        }
    }


    private arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele != value;
        });
     
     }

     /**
      * displayGrid
      */
     public displayGrid() {
        for (let row = 0; row < 9; row++) {
            console.log(this.toSolve.getBox(row, 0).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 1).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 2).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 3).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 4).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 5).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 6).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 7).getBoxNum() + ", " + 
            this.toSolve.getBox(row, 8).getBoxNum())
        }
     }
     
    
}