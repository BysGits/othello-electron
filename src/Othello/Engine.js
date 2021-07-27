export default class Engine {

    constructor() {
        this.num_evals = 0;
        this.square_values = [
            [  10,  -1,   0,   0,   0,   0,  -1,  10],
            [  -1,  -4,   0,   0,   0,   0,  -4,  -1],
            [   0,   0,   0,   0,   0,   0,   0,   0],
            [   0,   0,   0,   0,   0,   0,   0,   0],
            [   0,   0,   0,   0,   0,   0,   0,   0],
            [   0,   0,   0,   0,   0,   0,   0,   0],
            [  -1,  -4,   0,   0,   0,   0,  -4,  -1],
            [  10,  -1,   0,   0,   0,   0,  -1,  10]
        ];
    }

    getNumEvals() {
        return this.num_evals;
    }

    setNumEvals(val) {
        this.num_evals = val;
    }

    getScore(board, player) {
        var score = 0;
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (board[x][y] === player) {
                    score ++;
                }
            }
        }    
        return score;
    }

    isAvailableMove(availableMoves, x, y) {
        for (var i = 0; i < availableMoves.length; i++) {
            if (availableMoves[i].x === x && availableMoves[i].y === y) {
                return true;
            }
        }
        return false;
    }
        
    getAvailableMoves(board, player) {
        var moves = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (this.isValidMove(board, player, x, y)) {
                    moves.push({ x: x, y: y});
                }
            }
        }    
        return moves;
    }

    isValidMove(board, player, x, y) {
        if (board[x][y] !== 0) {
            return false;
        }

        var enemy = player === 1 ? 2 : 1;

        // Left Direction
        if (x > 0) {
            if (board[x - 1][y] === enemy) {
                for (let i = x - 2; i >= 0; i--) {
                    if (board[i][y] === 0) {
                        break;
                    }
                    if (board[i][y] === player) {
                        return true;
                    }
                }
            }
        }

        // Right Direction
        if (x < 7) {
            if (board[x + 1][y] === enemy) {
                for (let i = x + 2; i < 8; i++) {
                    if (board[i][y] === 0) {
                        break;
                    }    
                    if (board[i][y] === player) {
                        return true;
                    }
                }
            }
        }

        // Up Direction
        if (y > 0) {
            if (board[x][y - 1] === enemy) {
                for (let i = y - 2; i >= 0; i--) {
                    if (board[x][i] === 0) {
                        break;
                    }                        
                    if (board[x][i] === player) {
                        return true;
                    }
                }
            }
        }

        // Down Direction
        if (y < 7) {
            if (board[x][y + 1] === enemy) {
                for (let i = y + 2; i < 8; i++) {
                    if (board[x][i] === 0) {
                        break;
                    }    
                    if (board[x][i] === player) {
                        return true;
                    }
                }
            }
        }

        // Up-Left Direction
        if (x > 0 && y > 0) {
            if (board[x - 1][y - 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x - i < 0 || y - i < 0) {
                        break;
                    }    
                    if (board[x - i][y - i] === 0) {
                        break;
                    }    
                    if (board[x - i][y - i] === player) {
                        return true;
                    }
                }
            }
        }

        // Up-Right Direction
        if (x < 7 && y > 0) {
            if (board[x + 1][y - 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x + i > 7 || y - i < 0) {
                        break;
                    }
                    if (board[x + i][y - i] === 0) {
                        break;
                    }    
                    if (board[x + i][y - i] === player) {
                        return true;
                    }
                }
            }
        }

        // Down-Right Direction
        if (x < 7 && y < 7) {
            if (board[x + 1][y + 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x + i > 7 || y + i > 7) {
                        break;
                    }    
                    if (board[x + i][y + i] === 0) {
                        break;
                    }    
                    if (board[x + i][y + i] === player) {
                        return true;
                    }
                }
            }
        }

        // Down-Left Direction
        if (x > 0 && y < 7) {
            if (board[x - 1][y + 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x - i < 0 || y + i > 7) {
                        break;
                    }    
                    if (board[x - i][y + i] === 0) {
                        break;
                    }    
                    if (board[x - i][y + i] === player) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    makeMove(board, player, x, y) {        
        var enemy = player === 1 ? 2 : 1;
        var done = false;

        // Left Direction
        let left = -1;
        if (x > 0) {
            if (board[x - 1][y] === enemy) {
                for (let i = x - 2; i >= 0; i--) {
                    if (board[i][y] === 0) {
                        break;
                    }    
                    if (board[i][y] === player) {
                        board[x][y] = player;
                        done = true;
                        left = i;
                        break;
                    }
                }
                if (left !== -1) {
                    for (let i = x - 1; i > left; i--) {
                        board[i][y] = player;
                    }
                }
            }
        }

        // Right Direction
        let right = -1;
        if (x < 7) {
            if (board[x + 1][y] === enemy) {
                for (let i = x + 2; i < 8; i++) {
                    if (board[i][y] === 0) {
                        break;
                    }    
                    if (board[i][y] === player) {
                        board[x][y] = player;
                        done = true;
                        right = i;
                        break;
                    }
                }
                if (right !== -1) {
                    for (let i = x + 1; i < right; i++) {
                        board[i][y] = player;
                    }
                }
            }
        }

        // Up Direction
        let up = -1;
        if (y > 0) {
            if (board[x][y - 1] === enemy) {
                for (let i = y - 2; i >= 0; i--) {
                    if (board[x][i] === 0) {
                        break;
                    }    
                    if (board[x][i] === player) {
                        board[x][y] = player;
                        done = true;
                        up = i;
                        break;
                    }
                }
                if (up !== -1) {
                    for (let i = y - 1; i > up; i--) {
                        board[x][i] = player;
                    }
                }
            }
        }

        // Down Direction
        let down = -1;
        if (y < 7) {
            if (board[x][y + 1] === enemy) {
                for (let i = y + 2; i < 8; i++) {
                    if (board[x][i] === 0) {
                        break;
                    }    
                    if (board[x][i] === player) {
                        board[x][y] = player;
                        done = true;
                        down = i;
                        break;
                    }
                }
                if (down !== -1) {
                    for (let i = y + 1; i < down; i++) {
                        board[x][i] = player;
                    }
                }
            }
        }

        // Up-Left Direction
        let ul = -1;
        if (x > 0 && y > 0) {
            if (board[x - 1][y - 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x - i < 0 || y - i < 0) {
                        break;
                    }    
                    if (board[x - i][y - i] === 0) {
                        break;
                    }    
                    if (board[x - i][y - i] === player) {
                        board[x][y] = player;
                        done = true;
                        ul = i;
                        break;
                    }
                }
                if (ul !== -1) {
                    for (let i = 1; i < ul; i++) {
                        board[x - i][y - i] = player;
                    }
                }
            }
        }

        // Up-Right Direction
        let ur = -1;
        if (x < 7 && y > 0) {
            if (board[x + 1][y - 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x + i > 7 || y - i < 0) {
                        break;
                    }    
                    if (board[x + i][y - i] === 0) {
                        break;
                    }    
                    if (board[x + i][y - i] === player) {
                        board[x][y] = player;
                        done = true;
                        ur = i;
                        break;
                    }
                }
                if (ur !== -1) {
                    for (let i = 1; i < ur; i++) {
                        board[x + i][y - i] = player;
                    }
                }
            }
        }

        // Down-Right Direction
        let dr = -1;
        if (x < 7 && y < 7) {
            if (board[x + 1][y + 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x + i > 7 || y + i > 7) {
                        break;
                    }    
                    if (board[x + i][y + i] === 0) {
                        break;
                    }    
                    if (board[x + i][y + i] === player) {
                        board[x][y] = player;
                        done = true;
                        dr = i;
                        break;
                    }
                }
                if (dr !== -1) {
                    for (let i = 1; i < dr; i++) {
                        board[x + i][y + i] = player;
                    }
                }
            }
        }

        // Down-Left Direction
        let dl = -1;
        if (x > 0 && y < 7) {
            if (board[x - 1][y + 1] === enemy) {
                for (let i = 2; i < 8; i++) {
                    if (x - i < 0 || y + i > 7) {
                        break;
                    }    
                    if (board[x - i][y + i] === 0) {
                        break;
                    }    
                    if (board[x - i][y + i] === player) {
                        board[x][y] = player;
                        done = true;
                        dl = i;
                        break;
                    }
                }
                if (dl !== -1) {
                    for (let i = 1; i < dl; i++) {
                        board[x - i][y + i] = player;
                    }
                }
            }
        }

        return done;
    }

    getOtherPlayer(player) {
        return player === 1 ? 2 : 1;
    }

    evaluate(board) {
        // Calculate piece count difference
        var score = this.getScore(board, 1) - this.getScore(board, 2);
        
        // Calculate the reward or penalty of playing a piece into a specific square
        var squares = 0;
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                if (board[x][y] === 1) {
                    squares += this.square_values[x][y];
                }
                else if (board[x][y] === 1) {
                    squares -= this.square_values[x][y];
                }
            }
        }   
        
        // Return the heuristic evaluation of this position
        return score + squares;
    }

    findMove(board, player, depth, alpha = -1000000, beta = 1000000) {
        this.num_evals++;
        var opponent = this.getOtherPlayer(player);
        if (depth <= 0) {
            // Evaluation is based solely on piece count
            return { score: this.evaluate(board) };
        }
        
        var moves = this.getAvailableMoves(board, player);
        if (moves.length === 0) {
            // Player has no valid moves
            if (this.getAvailableMoves(board, opponent).length === 0) {
                // Opponent also has no valid moves, so the game is over
                return { score: this.evaluate(board) };
            }
            
            // Find moves for the opponent instead
            return this.findMove(board, opponent, depth - 1, alpha, beta);
        }
        
        var best = { score: player === 1 ? -100000 : 100000, x: moves[0].x, y: moves[0].y };
        for (let i = 0; i < moves.length; i++) {
            // Make the move on a copy of the board
            var copy = this.copyBoard(board);
            this.makeMove(copy, player, moves[i].x, moves[i].y);
            
            // Recursively look for a good counter move
            var counter = this.findMove(copy, opponent, depth - 1, alpha, beta);
            if (player === 1) {
                if (counter.score > best.score) {
                    best.score = counter.score;
                    best.x = moves[i].x;
                    best.y = moves[i].y;
                }
                alpha = Math.max(alpha, counter.score);
                if (alpha >= beta) {
                    break;
                }
            }
            if (player === 2) {
                if (counter.score < best.score) {
                    best.score = counter.score;
                    best.x = moves[i].x;
                    best.y = moves[i].y;
                }
                beta = Math.min(beta, counter.score);
                if (alpha >= beta) {
                    break;
                }
            }
        }
        
        return best;
    }

    copyBoard(board) {
        return board.map(function(a) {
            return a.slice();
        });
    }
    
    toJSON() {
        return { 
            square_values: this.square_values, 
            findMove: this.findMove
        };
    }
}