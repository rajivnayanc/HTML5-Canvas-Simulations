const generateMazeUtil = (board, vis, x, y, prev, rows, columns) => {
    if (x < 0 || x >= rows || y < 0 || y >= columns) return;
    if (vis[x][y] !== 1) {
        vis[x][y] = 1;
        var x_prev = Math.floor((x + prev.x) / 2);
        var y_prev = Math.floor((y + prev.y) / 2);
        board.content[x][y] = 1;
        board.content[x_prev][y_prev] = 1;
        board.nodes.push([x_prev, y_prev]);
        board.nodes.push([x, y]);
        let prev_ = { x: x, y: y };
        let funcs = [[x + 2, y], [x - 2, y], [x, y + 2], [x, y - 2]];
        funcs = funcs.sort(() => Math.random() - 0.5)
        generateMazeUtil(board, vis, funcs[0][0], funcs[0][1], prev_, rows, columns);
        generateMazeUtil(board, vis, funcs[1][0], funcs[1][1], prev_, rows, columns);
        generateMazeUtil(board, vis, funcs[2][0], funcs[2][1], prev_, rows, columns);
        generateMazeUtil(board, vis, funcs[3][0], funcs[3][1], prev_, rows, columns);

    }
}

module.exports = generateMazeUtil