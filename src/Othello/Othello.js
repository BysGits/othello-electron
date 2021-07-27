import React, { Component } from 'react';
import './Othello.css';
import Engine from './Engine.js';
import Worker from './Engine.worker.js';
    
export default class Othello extends Component {

    componentDidMount() {
        // Handle playing the best move once the computer returns from its search
        this.worker = new Worker();
        this.worker.addEventListener('message', e => {
            var result = e.data;
            this.makeMove(result.x, result.y);
            this.setState({ 
                ai: { 
                    evals: result.evals,
                    time: result.time,
                    nps: Math.round(result.time > 0 ? (result.evals / (result.time / 1000)) : 0)
                } 
            });
            console.log("Move Score: " + result.score + " Evals: " + result.evals + " Time: " + result.time);
        });
    }

    constructor(props) {
        super(props);
        this.state = { 
            state: 1,
            player: 1,
            depth: 8,
            score: {
                white: 2,
                black: 2
            },
            board: [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            ai: { 
                evals: 0,
                time: 0,
                nps: 0
            }};
        this.engine = new Engine();
    }
    
    render() {
        var moves = this.engine.getAvailableMoves(this.state.board, this.state.player);
        var rows = [];
        for (var y = 0; y < 8; y++) {
            var squares = [];
            for (var x = 0; x < 8; x++) {
                squares.push(new this.Square(this.state.board[x][y], x, y, this.engine.isAvailableMove(moves, x, y), this));
            }
            rows.push(squares);
        }
        var gameState = this.state.state === 1 ? (this.state.player === 1 ? "white-turn" : "black-turn") : "game-over";
        return (
            <div className={"othello " + gameState}>
                <div>
                    <div>
                        <div className="status-bar">
                            <div className="status">
                                Computer (black)
                            </div>
                            <div className="scores black-score clearfix">
                                {this.state.score.black}
                            </div>
                        </div>
                        <div className="board clearfix">
                            {rows}
                            <div className="menu">
                                <span className="menu-message">Game Over</span>
                            </div>
                        </div>
                        <div className="status-bar">
                            <div className="status">
                                You (white)
                            </div>
                            <div className="scores white-score clearfix">
                                {this.state.score.white}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="evals">
                    {this.state.ai.nps.toLocaleString()} nps
                </div>
                <div className="copyright">
                    &copy; {new Date().getFullYear()} Scott Clayton
                </div>
            </div>
        );
    }

    Square(player, x, y, isMove, _this) {
        var cssPlayer = "";
        var cssAvailable = "";
        if (player === 1) {
            cssPlayer = "white";
        }
        else if (player === 2) {
            cssPlayer = "black";
        }
        if (isMove) {
            cssAvailable = "avail";
        }
        return (
            <div className={"square " + cssPlayer + " " + cssAvailable} onClick={e => _this.squareHandler(x, y, e)} data-x={x} data-y={y} key={x + "-" + y}>
            </div>
        );
    }
    
    squareHandler(x, y) {
        if (this.state.player == 1) {
            this.makeMove(x, y);
        }
    }
    
    makeMove(x, y) {
        if (this.engine.isValidMove(this.state.board, this.state.player, x, y)) {
            var newState = this.state.state;
            var newBoard = this.state.board;
            this.engine.makeMove(newBoard, this.state.player, x, y);
            var newPlayer = this.state.player === 1 ? 2 : 1;
            if (this.engine.getAvailableMoves(newBoard, newPlayer).length === 0) {
                // Opponent has no moves
                newPlayer = this.state.player;
                if (this.engine.getAvailableMoves(newBoard, newPlayer).length === 0) {
                    // We also have no moves, so the game is over
                    newState = 0;
                }
            }
            this.setState({
               player: newPlayer,
               board: newBoard,
               state: newState,
               score: {
                   white: this.engine.getScore(newBoard, 1),
                   black: this.engine.getScore(newBoard, 2)
               }
            }, () => {
                // After updating the player's move
                if (newState === 1 && newPlayer === 2) {
                    // Have the computer find the best move
                    this.worker.postMessage([newBoard, newPlayer, this.state.depth, JSON.stringify(this.engine)]);
                }
            });
        }
    }
}