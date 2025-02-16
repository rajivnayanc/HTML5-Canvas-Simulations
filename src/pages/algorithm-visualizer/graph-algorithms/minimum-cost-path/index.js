import { useId, useState } from "react";
import Queue from "./Queue.src";
import styles from './page.module.css'

const solve = (grid, handleUpdatingSelectedCell) => {
    const n_rows = grid.length;
    const n_cols = grid[0].length;

    let matrix = [];
    let dp = [];
    let path = [];

    let bools = [];
    for (let i = 0; i < grid.length; i++) {
        let temp_row = [];
        let p = [];
        let p2 = [];
        let p3 = [];
        let m_row = grid[i];
        for (let j = 0; j < grid[i].length; j++) {
            let inp = parseFloat(grid[i][j], 10);
            temp_row.push(inp);
            p.push(100000000);
            p2.push([]);
            p3.push(0);
        }
        matrix.push(temp_row);
        dp.push(p);
        path.push(p2);
        bools.push(p3);
    }


    let q = new Queue;

    q.enqueue([0, 0]);

    dp[0][0] = matrix[0][0];
    path[0][0] = [0, 0];
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    while (!q.isEmpty()) {
        let a = q.peek();
        q.dequeue();

        for (let i = 0; i < 4; i++) {
            let x = a[0] + dx[i];
            let y = a[1] + dy[i];

            if (x >= 0 && x < n_rows && y >= 0 && y < n_cols) {
                let res = dp[a[0]][a[1]] + matrix[x][y];

                if (res < dp[x][y]) {
                    dp[x][y] = res;
                    path[x][y] = [a[0], a[1]];
                    q.enqueue([x, y]);
                }
            }
        }
    }


    let current = [n_rows - 1, n_cols - 1];
    while (current[0] != 0 || current[1] != 0) {
        bools[current[0]][current[1]] = 1;
        handleUpdatingSelectedCell(current[0], current[1], true);
        current = path[current[0]][current[1]];
    }
    bools[0][0] = 1;
    handleUpdatingSelectedCell(0, 0, true);
}


function CreateTable(props) {
    console.log("Rendered Table");
    const rows = props.grid.length;
    const columns = props.grid[0].length;
    let results = [];
    const grid = props.grid;
    for (let i = 0; i < rows; i++) {
        let col = []
        for (let j = 0; j < columns; j++) {
            let cls = props.selectedCells[i][j] ? styles.animated_cell : '';
            col.push(
                <td className={`cell${cls}`} key={`${i}${j}`} id={`${i}-${j}`}>
                    <input type='number' className={cls} value={grid[i][j]}
                        onChange={e => props.handleGrid(i, j, e)} />
                </td>)
        }
        results.push(<tr key={`${i}`} id={`${i}`}>{col}</tr>)
    }
    const table = <div id='grid' className="no-margin"><table cellSpacing="0"><tbody>{results}</tbody></table></div>
    const output = <div>
        {table}
        <br></br>
        <br></br>
        <button onClick={e => solve(props.grid, props.handleUpdatingSelectedCell)}> Solve </button>
    </div>
    return output;
}

const MinimumCostPath = () => {
    const [showTable, setShowTable] = useState(false);
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [grid, setGrid] = useState(Array.from({ length: rows }, v => Array.from({ length: cols }, v => 0)))
    const [selectedCells, setSelectedCells] = useState(Array.from({ length: rows }, v => Array.from({ length: cols }, v => false)))
    const id_rows_input = useId();
    const id_cols_input = useId();

    const handleUpdatingSelectedCell = (row, column, value) => {
        let copy = [...selectedCells];
        copy[row][column] = value;
        setSelectedCells(copy);
    }
    const handleGridSizeUpdate = (row, column) => {
        setRows(row);
        setCols(column);
        setGrid(Array.from({ length: row }, v => Array.from({ length: column }, v => 0)))
        setSelectedCells(Array.from({ length: row }, v => Array.from({ length: column }, v => false)))
    }
    const handleGridCellUpdate = (row, column, e) => {
        let copy = [...grid]
        copy[row][column] = e.target.value;
        setGrid(copy);
    }
    const handleGenerateButton = () => {
        setShowTable(true);
        handleGridSizeUpdate(rows, cols);
    }
    return (
        <div>
            <center>
                <div id="input_rc">
                    <label htmlFor={id_rows_input}>Rows</label>
                    <input type="number" id={id_rows_input} max="50" value={rows} style={{ width: '50px' }} onInput={e => handleGridSizeUpdate(e.target.value, cols)} />
                    <label htmlFor={id_cols_input}>Cols</label>
                    <input type="number" id={id_cols_input} max="50" value={cols} style={{ width: '50px' }} onInput={e => handleGridSizeUpdate(rows, e.target.value)} />
                    <button onClick={handleGenerateButton}>Generate</button>
                </div>
                <div id="matrix">{showTable ? < CreateTable handleUpdatingSelectedCell={handleUpdatingSelectedCell} selectedCells={selectedCells} grid={grid} handleGrid={handleGridCellUpdate} /> : null}</div>
            </center>
        </div>)
}

export default MinimumCostPath;