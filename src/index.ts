import {Box} from "./Box"
import {Grid} from "./Grid"
import { Solver } from "./Solver";

const grid = new Grid();

// TESTING FOR horizontal lines/////////////////////////////////////////

// grid.getBox(0, 0).setBoxNum(1);
// grid.getBox(0, 1).setBoxNum(2);
// grid.getBox(0, 2).setBoxNum(3);
// grid.getBox(0, 3).setBoxNum(4);
// grid.getBox(0, 4).setBoxNum(5);
// grid.getBox(0, 5).setBoxNum(6);
// grid.getBox(0, 6).setBoxNum(7);
// grid.getBox(0, 7).setBoxNum(8);


// TESTING FOR VERTICAL LINES/////

// grid.getBox(0, 0).setBoxNum(8);
// grid.getBox(1, 0).setBoxNum(1);
// grid.getBox(2, 0).setBoxNum(2);
// grid.getBox(3, 0).setBoxNum(3);
// grid.getBox(4, 0).setBoxNum(4);
// grid.getBox(5, 0).setBoxNum(5);
// grid.getBox(6, 0).setBoxNum(6);
// grid.getBox(7, 0).setBoxNum(7);


// BIG TESTING//////////////////////////////////////////////////

grid.getBox(0, 4).setBoxNum(7);

grid.getBox(1, 3).setBoxNum(5);
grid.getBox(1, 7).setBoxNum(9);

grid.getBox(2, 3).setBoxNum(4);
grid.getBox(2, 5).setBoxNum(9);
grid.getBox(2, 8).setBoxNum(8);

grid.getBox(3, 1).setBoxNum(1);
grid.getBox(3, 2).setBoxNum(9);
grid.getBox(3, 4).setBoxNum(5);
grid.getBox(3, 7).setBoxNum(8);

grid.getBox(4, 0).setBoxNum(2);
grid.getBox(4, 3).setBoxNum(6);
grid.getBox(4, 4).setBoxNum(1);
grid.getBox(4, 6).setBoxNum(7);
grid.getBox(4, 8).setBoxNum(9);

grid.getBox(5, 2).setBoxNum(4);
grid.getBox(5, 8).setBoxNum(3);

grid.getBox(6, 4).setBoxNum(6);
grid.getBox(6, 7).setBoxNum(5);
grid.getBox(6, 8).setBoxNum(2);

grid.getBox(7, 1).setBoxNum(8);
grid.getBox(7, 3).setBoxNum(7);
grid.getBox(7, 6).setBoxNum(9);

grid.getBox(8, 2).setBoxNum(3);
grid.getBox(8, 4).setBoxNum(8);
grid.getBox(8, 5).setBoxNum(5);
grid.getBox(8, 6).setBoxNum(6);

// grid.getBox(6, 3).setBoxNum(9); //somehow adding these two helped solve the puzzle.
// grid.getBox(2, 0).setBoxNum(6);

// // grid.getBox(0, 0).setBoxNum(3); // these two do not help the puzzle
// // grid.getBox(0, 1).setBoxNum(9);



// TESTING FOR BOXES//////////////////////////// boxes work!

// grid.getBox(0,0).setBoxNum(1);
// grid.getBox(0,1).setBoxNum(2);
// grid.getBox(0,2).setBoxNum(3);

// grid.getBox(1,0).setBoxNum(4);
// grid.getBox(1,1).setBoxNum(5);
// grid.getBox(1,2).setBoxNum(6);

// grid.getBox(2,0).setBoxNum(7);
// grid.getBox(2,1).setBoxNum(8);

// TESTING FOR BOXES + LINES /////////////////////////////////////////////

// grid.getBox(0,0).setBoxNum(1);
// grid.getBox(0,1).setBoxNum(2);
// grid.getBox(0,2).setBoxNum(3);

// grid.getBox(1,0).setBoxNum(4);
// grid.getBox(1,1).setBoxNum(5);
// grid.getBox(1,2).setBoxNum(6);

// grid.getBox(2,0).setBoxNum(7);

// grid.getBox(5,2).setBoxNum(8); // ADDING an 8 below where the 9 should go


//////////////////////


const solver = new Solver(grid);
solver.solve();

