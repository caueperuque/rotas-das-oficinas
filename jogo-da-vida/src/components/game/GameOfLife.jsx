import React, { Component } from "react";
import "./GameOfLife.css";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

class GameOfLife extends Component {
  constructor() {
    super();
    this.rows = GRID_SIZE;
    this.cols = GRID_SIZE;

    this.board = this.createEmptyBoard();
  }

  state = {
    cells: [],
    isRunning: false,
    generation: 0,
  };

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => false)
    );
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: rect.left + window.pageXOffset - doc.clientLeft,
      y: rect.top + window.pageYOffset - doc.clientTop,
    };
  }

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const col = Math.floor(offsetX / CELL_SIZE);
    const row = Math.floor(offsetY / CELL_SIZE);
    if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
      this.board[row][col] = !this.board[row][col];
    }
    this.setState({ cells: this.calculateCells() });
  };

  handleClear = () => {
    this.board = this.createEmptyBoard();
    this.setState({ cells: this.calculateCells(), generation: 0 });
  };

  handleRandom = () => {
    this.board = this.board.map((row) =>
      row.map(() => Math.random() >= 0.5)
    );
    this.setState({ cells: this.calculateCells() });
  };

  handleStart = () => {
    if (this.state.isRunning) {
      return;
    }

    this.setState({ isRunning: true }, () => {
      this.runGame();
    });
  };

  handleStop = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runGame() {
    let newBoard = this.createEmptyBoard();
    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        let neighbors = this.calculateNeighbors(rowIndex, colIndex);
        if (cell) {
          if (neighbors === 2 || neighbors === 3) {
            newBoard[rowIndex][colIndex] = true;
          } else {
            newBoard[rowIndex][colIndex] = false;
          }
        } else {
          if (!cell && neighbors === 3) {
            newBoard[rowIndex][colIndex] = true;
          }
        }
      });
    });
    this.board = newBoard;
    this.setState({
      cells: this.calculateCells(),
      generation: this.state.generation + 1,
    });

    this.timeoutHandler = window.setTimeout(() => {
      this.runGame();
    }, 100); // Atualização a cada 1 segundo (1000 milissegundos)
  }

  calculateNeighbors(row, col) {
    const positions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return positions.reduce((count, [rowOffset, colOffset]) => {
      const newRow = row + rowOffset;
      const newCol = col + colOffset;

      if (
        newRow >= 0 &&
        newRow < this.rows &&
        newCol >= 0 &&
        newCol < this.cols &&
        this.board[newRow][newCol]
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  calculateCells() {
    let cells = [];
    this.board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          cells.push({ row: rowIndex, col: colIndex });
        }
      });
    });
    return cells;
  }

  componentDidMount() {
    this.setState({ cells: this.calculateCells() });
  }

  componentWillUnmount() {
    this.handleStop();
  }

  render() {
    const { cells, isRunning, generation } = this.state;
    return (
      <div className="gol__container">
        <div
          className="board"
          style={{
            width: this.cols * CELL_SIZE,
            height: this.rows * CELL_SIZE,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={(n) => {
            this.boardRef = n;
          }}
        >
          {cells.map((cell) => (
            <div
              key={`${cell.row},${cell.col}`}
              className="cell"
              style={{
                left: cell.col * CELL_SIZE,
                top: cell.row * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))}
        </div>
        <div className="controls">
          <button className="btn btn-success" onClick={this.handleRandom}>
            {isRunning ? "Random" : "Random"}
          </button>
          <button className="btn btn-success" onClick={isRunning ? this.handleStop : this.handleStart}>
            {isRunning ? "Parar" : "Iniciar"}
          </button>
          <button className="btn btn-danger" onClick={this.handleClear}>Limpar</button>
        </div>
        <div className="generation">Geração: {generation}</div>
      </div>
    );
  }
}

export default GameOfLife;
