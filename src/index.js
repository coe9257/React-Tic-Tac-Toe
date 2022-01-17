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
      player: ""
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
    this.setState({squares: newArray})
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
    const horizontalArray  =  this.state.squares.slice()
    let horizontalString = horizontalArray.join("")

    const verticalArray = this.state.squares.slice()
      console.log(verticalArray[0])

    let  verticalString =   verticalArray[0] + 
                            verticalArray[3] +
                            verticalArray[6] +
                            verticalArray[1] +
                            verticalArray[4] +
                            verticalArray[7] +
                            verticalArray[2] +
                            verticalArray[5] +
                            verticalArray[8];
    console.log(verticalString)

    if (horizontalString.includes("XXX")) {
      console.log(true);
    }else if (horizontalString.includes("OOO")) {
      console.log(true)
    }
  }

  render() {
    this.checkGame()
    return(
      <div>
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


ReactDOM.render(
  <GameBoard />,
  document.getElementById("root")
)