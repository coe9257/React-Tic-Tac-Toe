import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css'

function Square(props) {
  return (
      <button
        className='square'
        value={props.value}
        onClick={props.onClick}
      >
      {props.value}
  </button>
  )
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: true,
      winner: ""
    }
  }

  clickEvent(i) {
    const newArray = this.state.squares.slice()
    let turn = this.state.turn ? "X" : "O"
    if (this.state.turn === true && this.state.squares[i] === null) {
      newArray[i] = turn
      this.setState({turn: false})
    }else if (this.state.turn === false && this.state.squares[i] === null) {
      this.setState({turn: true})
      newArray[i] = turn
    }
    this.setState({squares: newArray}, () => {
      this.checkGame()
    })
    
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.clickEvent(i)}
      />
    )
  }

  checkGame() {
    const stateArray = this.state.squares.slice();
    let array = stateArray.join("");
    let player = this.state.turn ? "X" : "O";
    console.log(array)
    if (array.includes("XXX")){
      this.setState({winner: "X", turn: ""}, () => {
        console.log(this.state.winner)
      })
    }else if (array.includes("OOO")) {
      this.setState({winner: "O", turn: ""}, () => {
        console.log(this.state.winner)
      })
    }
  }

  render() {

    const winner = this.state.winner !== "" ? true : false
    let status;
    if (winner){
      status = "The winner is....." + this.state.winner + "!";
    } else {
      let player = this.state.turn ? "X" : "O";
      status = "It is" + " " + player + "'s turn!";
    }

    return(
      <div>
        <div className='turn_notification'>{status}</div>
        <div className='row_1'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
          <div className='row_2'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='row_3'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}


ReactDOM.render (
  <GameBoard />,
  document.getElementById("root")
)