export class Box {
    private boxNum: number | null;
    public possibleNums: Array<number>;
    
    constructor(){
        this.boxNum = null;
        this.possibleNums = [1,2,3,4,5,6,7,8,9];
    }

    // new comment

    /**
     * getBoxNum gets the current actaul value in the box.
     */
    public getBoxNum() {
        if (this.boxNum === null) {
            return "x";
        }
        else {
            return this.boxNum;
        }
    }

    /**
     * setBoxNum
     */
    public setBoxNum(num: number) {
        this.boxNum = num;
        this.possibleNums = [];
    }
}