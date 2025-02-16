var randomNumber = require('../utils');
const recursiveGeneratorUtil = (start_x, end_x, start_y, end_y, board, min_width) => {
    let W = end_y - start_y;
    let H = end_x - start_x;
    let vertical = W > H ? true : false;
    //vertical
    if (vertical) {
        if (W <= min_width) return;
        let skip_x = randomNumber(start_x + 1, end_x - 1);
        var mid_y = Math.floor((start_y + end_y) / 2);

        let flag1 = false;
        let flag2 = false;

        if (board.content[start_x][mid_y] === 0) {
            flag1 = true;
            skip_x = start_x + 1;
        }
        if (board.content[end_x][mid_y] === 0) {
            flag2 = true;
            skip_x = end_x - 1;
        }
        for (let i = start_x + 1; i < end_x; i++) {
            if (flag1 && flag2) {
                if (i === (start_x + 1) || i === (end_x - 1))
                    continue;
            } else if (i === skip_x) continue;
            board.content[i][mid_y] = 1;
            board.nodes.push([i, mid_y]);
        }
        recursiveGeneratorUtil(start_x, end_x, start_y, mid_y, board, min_width);
        recursiveGeneratorUtil(start_x, end_x, mid_y, end_y, board, min_width);

    } else { //horizontal
        if (H <= min_width) return;
        let skip_y = randomNumber(start_y + 1, end_y - 1);
        var mid_x = Math.ceil((start_x + end_x) / 2);

        let flag1 = false;
        let flag2 = false;
        if (board.content[mid_x][start_y] === 0) {
            flag1 = true;
            skip_y = start_y + 1;
        }
        if (board.content[mid_x][end_y] === 0) {
            flag2 = true;
            skip_y = end_y - 1;
        }
        for (let i = start_y + 1; i < end_y; i++) {
            if (flag1 && flag2) {
                if (i === (start_y + 1) || i === (end_y - 1))
                    continue;
            } else if (i === skip_y) continue;
            board.content[mid_x][i] = 1;
            board.nodes.push([mid_x, i]);
        }

        recursiveGeneratorUtil(start_x, mid_x, start_y, end_y, board, min_width);
        recursiveGeneratorUtil(mid_x, end_x, start_y, end_y, board, min_width);
    }
}
module.exports = recursiveGeneratorUtil;