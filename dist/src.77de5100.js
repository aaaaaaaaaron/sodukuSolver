// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Box.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Box =
/** @class */
function () {
  function Box() {
    this.boxNum = null;
    this.possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
  /**
   * getBoxNum gets the current actaul value in the box.
   */


  Box.prototype.getBoxNum = function () {
    if (this.boxNum === null) {
      return "x";
    } else {
      return this.boxNum;
    }
  };
  /**
   * setBoxNum
   */


  Box.prototype.setBoxNum = function (num) {
    this.boxNum = num;
    this.possibleNums = [];
  };

  return Box;
}();

exports.Box = Box;
},{}],"Grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Box_1 = require("./Box");

var Grid =
/** @class */
function () {
  function Grid() {
    this.mainArray = [];
    this.fillArray();
  }

  Grid.prototype.fillArray = function () {
    for (var i = 0; i < 9; i++) {
      var row = []; // Creates a blank new row 9 times.

      for (var j = 0; j < 9; j++) {
        row.push(new Box_1.Box());
      }

      this.mainArray.push(row);
    }
  };

  Grid.prototype.getBox = function (row, column) {
    return this.mainArray[row][column];
  };

  return Grid;
}();

exports.Grid = Grid;
},{"./Box":"Box.ts"}],"Solver.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Solver =
/** @class */
function () {
  function Solver(toSolve) {
    this.toSolve = toSolve;
  }

  Solver.prototype.solve = function () {
    this.displayGrid();
    console.log("SOLVING...!!!");

    for (var i = 0; i < 300; i++) {
      this.passThrough(i);
    }

    this.displayGrid();
    console.log("Done solving (:"); // console.log(this.toSolve.getBox(5,3).possibleNums);
    // console.log(this.toSolve.getBox(5,4).possibleNums);
    // console.log(this.toSolve.getBox(6,3).possibleNums);
  };

  Solver.prototype.passThrough = function (iteration) {
    for (var row = 0; row < 9; row++) {
      for (var column = 0; column < 9; column++) {
        var currentBox = this.toSolve.getBox(row, column);

        if (currentBox.possibleNums.length === 1) {
          // if there is only one possible option, set that box to that option.
          currentBox.setBoxNum(currentBox.possibleNums[0]);
          console.log("one option left o:");
        }

        if (currentBox.getBoxNum() !== null) {
          // does the refining of possible nums around it
          this.refineRow(currentBox, row);
          this.refineColumn(currentBox, column);
          this.refineSquare(currentBox, row, column);

          if (iteration % 30 === 29) {
            // only use this every 30 loops
            // this.checkOnlyRow(currentBox, row, column);
            this.checkOnlyColumn(currentBox, row, column); // this.checkOnlySquare(currentBox, row, column);
          }
        }
      }
    }
  };

  Solver.prototype.refineRow = function (box, row) {
    var currentBoxNum = box.getBoxNum();

    for (var column = 0; column < 9; column++) {
      this.toSolve.getBox(row, column).possibleNums = this.arrayRemove(this.toSolve.getBox(row, column).possibleNums, currentBoxNum);
    }
  };

  Solver.prototype.refineColumn = function (box, column) {
    var currentBoxNum = box.getBoxNum();

    for (var row = 0; row < 9; row++) {
      this.toSolve.getBox(row, column).possibleNums = this.arrayRemove(this.toSolve.getBox(row, column).possibleNums, currentBoxNum);
    }
  };

  Solver.prototype.refineSquare = function (box, row, column) {
    var currentBoxNum = box.getBoxNum();
    var rowClassifier = Math.floor(row / 3);
    var columnClassifier = Math.floor(column / 3); // figures out what square they are in.
    // console.log(rowClassifier + ", " + columnClassifier + "  boxnum: " + currentBoxNum);

    for (var toCheckRow = 0; toCheckRow < 9; toCheckRow++) {
      for (var toCheckColumn = 0; toCheckColumn < 9; toCheckColumn++) {
        var toCheckRowClassifier = Math.floor(toCheckRow / 3);
        var toCheckColumnClassifier = Math.floor(toCheckColumn / 3);

        if (rowClassifier === toCheckRowClassifier && columnClassifier === toCheckColumnClassifier) {
          this.toSolve.getBox(toCheckRow, toCheckColumn).possibleNums = this.arrayRemove(this.toSolve.getBox(toCheckRow, toCheckColumn).possibleNums, currentBoxNum);
        }
      }
    }
  };

  Solver.prototype.checkOnlyRow = function (box, row, boxColumn) {
    var uniquePossibleNums = __spreadArrays(box.possibleNums); // copying array


    var _loop_1 = function _loop_1(column) {
      if (column !== boxColumn) {
        // we do this to make sure we don't subrtract self
        var currentPossibleNums_1 = __spreadArrays(this_1.toSolve.getBox(row, column).possibleNums);

        uniquePossibleNums = uniquePossibleNums.filter(function (x) {
          return currentPossibleNums_1.indexOf(x) < 0;
        });
      }
    };

    var this_1 = this;

    for (var column = 0; column < 9; column++) {
      _loop_1(column);
    }

    if (uniquePossibleNums.length === 1) {
      box.setBoxNum(uniquePossibleNums[0]);
    }
  };

  Solver.prototype.checkOnlyColumn = function (box, boxRow, column) {
    var uniquePossibleNums = __spreadArrays(box.possibleNums);

    var _loop_2 = function _loop_2(row) {
      if (row !== boxRow) {
        var currentPossibleNums_2 = __spreadArrays(this_2.toSolve.getBox(row, column).possibleNums);

        uniquePossibleNums = uniquePossibleNums.filter(function (x) {
          return currentPossibleNums_2.indexOf(x) < 0;
        });
      }
    };

    var this_2 = this;

    for (var row = 0; row < 9; row++) {
      _loop_2(row);
    }

    if (uniquePossibleNums.length === 1) {
      box.setBoxNum(uniquePossibleNums[0]);
    }
  };

  Solver.prototype.checkOnlySquare = function (box, boxRow, boxColumn) {
    var uniquePossibleNums = __spreadArrays(box.possibleNums);

    var boxRowID = Math.floor(boxRow / 3);
    var boxColumnID = Math.floor(boxColumn / 3);

    for (var row = 0; row < 9; row++) {
      var _loop_3 = function _loop_3(column) {
        if (row !== boxRow && column !== boxColumn && Math.floor(row / 3) === boxRowID && Math.floor(column / 3) === boxColumnID) {
          var currentPossibleNums_3 = __spreadArrays(this_3.toSolve.getBox(row, column).possibleNums);

          uniquePossibleNums = uniquePossibleNums.filter(function (x) {
            return currentPossibleNums_3.indexOf(x) < 0;
          });
        }
      };

      var this_3 = this;

      for (var column = 0; column < 9; column++) {
        _loop_3(column);
      }
    }

    if (uniquePossibleNums.length === 1) {
      box.setBoxNum(uniquePossibleNums[0]);
    }
  };

  Solver.prototype.arrayRemove = function (arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  };
  /**
   * displayGrid
   */


  Solver.prototype.displayGrid = function () {
    for (var row = 0; row < 9; row++) {
      console.log(this.toSolve.getBox(row, 0).getBoxNum() + ", " + this.toSolve.getBox(row, 1).getBoxNum() + ", " + this.toSolve.getBox(row, 2).getBoxNum() + ", " + this.toSolve.getBox(row, 3).getBoxNum() + ", " + this.toSolve.getBox(row, 4).getBoxNum() + ", " + this.toSolve.getBox(row, 5).getBoxNum() + ", " + this.toSolve.getBox(row, 6).getBoxNum() + ", " + this.toSolve.getBox(row, 7).getBoxNum() + ", " + this.toSolve.getBox(row, 8).getBoxNum());
    }
  };

  return Solver;
}();

exports.Solver = Solver;
},{}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Grid_1 = require("./Grid");

var Solver_1 = require("./Solver");

var grid = new Grid_1.Grid(); // TESTING FOR horizontal lines/////////////////////////////////////////
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
grid.getBox(8, 6).setBoxNum(6); // grid.getBox(6, 3).setBoxNum(9); //somehow adding these two helped solve the puzzle.
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

var solver = new Solver_1.Solver(grid);
solver.solve();
},{"./Grid":"Grid.ts","./Solver":"Solver.ts"}],"../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63346" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map