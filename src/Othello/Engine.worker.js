import Engine from './Engine.js'

self.addEventListener('message', function(e) {
    var board = e.data[0];
    var player = e.data[1];
    var depth = e.data[2];
    var start = performance.now()
    var engine = new Engine();
    var bestMove = engine.findMove(board, player, depth);
    var end = performance.now()
    postMessage({
        x: bestMove.x,
        y: bestMove.y,
        score: bestMove.score,
        evals: engine.getNumEvals(),
        time: Math.round(end - start)
    });
}, false);