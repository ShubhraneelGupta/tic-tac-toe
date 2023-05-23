import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import "./style.css";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);


let lastSquare = 0;

function Square({value, onSquareClick}){
    return(
        <div className="square grow-rotate-on-hover" onClick={onSquareClick}>
            {value}
        </div>
    );
}

function findWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function Status({ squares, turnOfX }){
    let xOrNot = turnOfX ? 0 : 1;
    let statusContent = findWinner(squares) ? 'The winner is ' + findWinner(squares) : 'Turn of ' + ['X', 'O'][xOrNot];
    if(!squares.includes(null) && !findWinner(squares)){
        statusContent = 'Game OVER --- NO WINNERS'; 
    }
    return(
        <div className="status">
            <h1>{statusContent}</h1>
        </div>

    );
}


function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turnOfX, setTurnOfX] = useState(true);

    function handleClick(i){
        if(squares[i] || findWinner(squares)){
            return;
        }

        const squareValues = squares.slice();
        if(turnOfX){
            squareValues[i] = 'X';
        }else{
            squareValues[i] = 'O';
        }
        setSquares(squareValues);
        setTurnOfX(!turnOfX);

    }
    return (
      <>
        <Status squares={squares} turnOfX={turnOfX}/>
        <div id='board-row'>
            <Square value={squares[0]} onSquareClick={ () => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={ () => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={ () => handleClick(2)}/>
        </div>
        <div id='board-row'>
            <Square value={squares[3]} onSquareClick={ () => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={ () => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={ () => handleClick(5)}/>
        </div>
        <div id='board-row'>
            <Square value={squares[6]} onSquareClick={ () => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={ () => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={ () => handleClick(8)}/>
        </div>
      </>
    );
  }

root.render(<Board />)
