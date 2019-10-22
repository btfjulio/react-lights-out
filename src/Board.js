import React, {Component} from "react";
// import { selectRandEl } from './helper';
import Cell from "./Cell";
import './Board.css';


//  * Properties:
//  *
//  * - nrows: number of rows of board
//  * - ncols: number of cols of board
//  * - chanceLightStartsOn: float, chance any cell is lit at start of game
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: .25
  }

//  * State:
//  *
//  * - hasWon: boolean, true when board is all off
//  * - board: array-of-arrays of true/false

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = Array.from({length:this.props.nrows});
    // TODO: create array-of-arrays of true/false values
    let newBoard = board.map(() => {
      return Array.from({length:this.props.ncols}).map(() => {
        return Math.random() > this.props.chanceLightStartsOn
      })
    })
    return newBoard
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x)
    flipCell(y + 1, x) //above
    flipCell(y - 1, x) //bellow
    flipCell(y, x + 1) //rigth
    flipCell(y, x - 1) //left
    // TODO: flip this cell and the cells around it
    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell))
    // TODO: determine is the game has been won
    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {
    const Board = this.state.board
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <span className="neon-orange">
            YOU
          </span>
          <span className="neon-blue">
            WIN
          </span>
        </div>
      )
    }
    return (
      <div>
        <div className="Board-title">
          <span className="neon-orange">
            Lights
          </span>
          <span className="neon-blue">
            Out
          </span>
        </div>
        <table className="Board">
          <tbody>
            {Board.map((row,idxRow) => {
              return <tr key={idxRow}>
                {row.map((cell,idxCol) => {
                return <Cell 
                        key={`${idxRow} - ${idxCol}`} 
                        isLit={cell} 
                        flipCellsAroundMe = {() => this.flipCellsAround(`${idxRow} - ${idxCol}`)} 
                        />
              })}
                    </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
