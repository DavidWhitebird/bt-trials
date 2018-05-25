import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
;debugger


/**
* There are 3 components: Square, Board, Game
**/





// Using "Functional Components"
//  'for component types like Square that only consist of a render()'
//  this.props changed to props
function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// =======================
// following is code before functional component change
//
// class Square extends React.Component {
//
//
//   // constructor added in order to initialize state
//   // * deleted after refactoring state to board
//
//   // constructor(props){
//     // super must be explicitly called when defining
//     //  the constructor of a subclass.
//     //    super(props);
//     // this.state = {
//     //   value: null,
//     // };
//   // }
//
//   render() {
//     return (
//       <button className="square"
//         // this passes a function as the onClick prop
//          onClick={() =>
//         //  this.setState({value: 'X'})}
//
//         this.props.onClick()}
//         >
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  //comment test1
  renderSquare(i) {
    //comment test2

    return (
    //comment test3
      <Square
        value={this.props.squares[i]}
      // replaced to track history
        // {this.state.squares[i]}


      onClick={() => this.props.onClick(i)}
      />
    );
        //replaced to track history
          // this.handleClick(i)}

    }
  // some extra square renders in here to observe behavior
  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="happy-board">
          {this.renderSquare(9)}
        </div>
        <div className="happy-board">
          {this.renderSquare(10)}
        </div>
        <div className="sad-board">
          {this.renderSquare(10)}
          {this.renderSquare(10)}
          {this.renderSquare(10)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // constructor added for history of moves
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        square: Array(20).fill(null),
      }],
      xIsNext: true,
    };
  }
  handleClick(i) {

    // var is function scoped & hoists
    // let is block-scoped & errors for reference before declaration
    // const cannot have a value reassigned, but attributes of value can be.
    // slice makes a copy,
    //  using copy instead of change to have all previous states available
    // React apparantly is designed to benefit this style significantly.
    //    e.g. check if need to re-render shouldComponentUpdate()
    //    "pure components" & optimizing performance
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }


  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      // for each step in history, create list item <li>
      //  with a button.
      return (

        <li>
          <button onClick={() => this.jumpTo(move)}>{desc})}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Next player: ' +
        (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) {
          return squares[a];
    }
  }
  return null;
}
