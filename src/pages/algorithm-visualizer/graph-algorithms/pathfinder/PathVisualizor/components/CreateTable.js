import React from 'react';

function CreateTable(props) {
    console.log("Rendered Table");
    const rows = props.rows;
    const columns = props.columns;
    const styles = props.styles;;
    var results = [];
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

export default CreateTable;
