import React, { Component } from 'react';

const RecursiveDivision = require('../../../../utils/algorithms/RecursiveDivsion');
const DFSBased = require('../../../../utils/algorithms/DFSbasedMazeGenerator');

const CreateTable = (props) => {
    console.log("Rendered Table");
    const rows = props.rows;
    const columns = props.columns;
    const styles = props.styles;;
    let results = [];
    const grid = props.grid;
    for(let i =0;i<rows;i++){
        var col = []
        for(let j=0;j<columns;j++){
            let cls = grid[i][j]===1?` ${styles["animated-wall"]}`:'';
            col.push(<td onClick={(e)=>props.clickCell(i,j)} className={`${styles.cell}${cls}`} key={`${i}${j}`} id={`${i}-${j}`}></td>)
        }
        results.push(<tr key={`${i}`} id={`${i}`}>{col}</tr>)
    }
    var table = <div id={styles.grid} className={styles["no-margin"]}><table cellSpacing="0"><tbody>{results}</tbody></table></div>
    return table;
}

export default class PathVisualizor extends Component {
    constructor(props) {
        super(props);
        let cell_width = 15;
        let rows = 4;
        rows += rows % 2 ? 0 : 1;
        let columns = 4;
        columns += columns % 2 ? 0 : 1;
        let min_width = 3;
        let arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(columns).fill(0);
        }

        this.state = {
            rows: rows,
            columns: columns,
            selected: {
                x: 0, y: 0
            },
            grid: arr,
            min_width: min_width,
            cell_width: cell_width,
            animation_speed: 5
        }

        this.animateGrid = [];
        this.styles = props.styles
    };

    updateGrid = (row, column, value) => {
        let new_arr = this.state.grid;
        new_arr[row][column] = value;
        this.setState(prevState => ({
            grid: new_arr
        }));
    }
    createWall = (row, column) => {
        this.updateGrid(row, column, this.state.grid[row][column] ? 0 : 1);
    }
    clearGrid = (callback) => {
        var promise = new Promise((resolve, reject) => {
            let rows = this.state.rows;
            let columns = this.state.columns;
            var arr = new Array(rows);
            for (let i = 0; i < rows; i++) {
                arr[i] = new Array(columns).fill(0);
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    document.getElementById(`${i}-${j}`).classList.remove(this.styles["animated-wall"])
                }
            }
            this.setState({
                grid: arr
            }, resolve("Done"));
        });
        promise.then((val) => callback())

    }

    initBoard = (boundary, initial = 0) => {
        let rows = this.state.rows;
        let columns = this.state.columns;
        var arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(columns).fill(initial);
        }
        let board = {
            content: arr,
            nodes: []

        }
        if (boundary) {
            for (let i = 0; i < rows; i++) {
                board.content[i][0] = 1;
                board.content[i][columns - 1] = 1;
                board.nodes.push([i, 0]);
                board.nodes.push([i, columns - 1]);
            }
            for (let i = 0; i < columns; i++) {
                board.content[0][i] = 1;
                board.content[rows - 1][i] = 1;
                board.nodes.push([0, i]);
                board.nodes.push([rows - 1, i]);
            }
        }
        return board;
    }
    DFSBasedMazeGenerator = () => {
        this.clearGrid(() => {
            let rows = this.state.rows;
            let columns = this.state.columns;
            let vis = new Array(rows);
            for (let i = 0; i < rows; i++) {
                vis[i] = new Array(columns).fill(0);
            }
            let board = this.initBoard(false, 0);
            let x = Math.round(Math.random() * this.state.rows);
            let y = Math.round(Math.random() * this.state.columns);
            DFSBased(board, vis, x, y, { x: x, y: y }, this.state.rows, this.state.columns);
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    board.content[i][j] = board.content[i][j] ? 0 : 1;
                }
            }
            this.animateMaze(board);
        });
    }

    RecursiveDivisionMazeGenerator = () => {
        this.clearGrid(() => {
            let start_x = 0;
            let start_y = 0;
            let end_x = this.state.rows;
            let end_y = this.state.columns;
            let board = this.initBoard(true);
            RecursiveDivision(start_x, end_x - 1, start_y, end_y - 1, board, this.state.min_width);
            this.animateMaze(board);

        });
    }

    animateMaze = (board) => {
        const timeout = (resolve, index) => {
            setTimeout(() => {
                if (index === board.nodes.length) {
                    resolve("Animation Done")
                    return;
                }
                let x = board.nodes[index][0];
                let y = board.nodes[index][1];
                let cell = document.getElementById(`${x}-${y}`);
                cell.className = `${this.styles.cell} ${this.styles['animated-wall']}`;
                timeout(resolve, index + 1);
            }, this.animation_speed)
        };
        var promise = new Promise((resolve, reject) => {
            timeout(resolve, 0);
        });
        promise.then((val) => {
            this.clearGrid(() => {
                this.setState({
                    grid: board.content
                })
            })
        });
    }
    componentDidMount() {
        let rows = Math.floor((window.innerHeight - 50) / this.state.cell_width) - 2;
        rows += rows % 2 ? 0 : 1;
        let columns = Math.floor(window.innerWidth / this.state.cell_width) - 5;
        columns += columns % 2 ? 0 : 1;
        let arr = new Array(rows);
        for (let i = 0; i < rows; i++) {
            arr[i] = new Array(columns).fill(0);
        }
        const temp_state = {...this.state,
            rows: rows,
            columns: columns,
            grid: arr,
        }
        this.setState(temp_state)
        var objs = document.getElementsByClassName(this.styles.cell);
        for (let i = 0; i < objs.length; i++) {
            objs[i].style.height = `${this.state.cell_width}px`;
            objs[i].style.width = `${this.state.cell_width}px`;
        }
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.DFSBasedMazeGenerator()}>Generate Maze</button>
                <button onClick={(e) => this.RecursiveDivisionMazeGenerator()}>Generate Maze Recursively</button>
                <button onClick={(e) => this.clearGrid(() => { })}>Clear Maze</button>
                <CreateTable grid={this.state.grid} clickCell={this.createWall} rows={this.state.rows} columns={this.state.columns} styles={this.styles} />
            </div>
        );
    }
}