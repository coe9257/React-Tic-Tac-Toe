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
    if (array.includes("XXX")){
      this.setState({winner: "X", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return
    }else if (array.includes("OOO")) {
      this.setState({winner: "O", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return
    }

    let veriticalArray = this.state.squares.slice();
    for (let i = 0; i < veriticalArray.length; i++) {
      if (veriticalArray[i] === null) {
        veriticalArray[i] = "."
      }
    }
    let changedVeriticalArray
        changedVeriticalArray = veriticalArray[0] +
                                veriticalArray[3] +
                                veriticalArray[6] +
                                veriticalArray[1] +
                                veriticalArray[4] +
                                veriticalArray[7] +
                                veriticalArray[2] +
                                veriticalArray[5] +
                                veriticalArray[8]
    if (changedVeriticalArray.includes("XXX")) {
      this.setState({winner: "X", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return
    }else if (changedVeriticalArray.includes("OOO")) {
      this.setState({winner: "O", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return      
    }

    let diagnolArray = this.state.squares.slice();
    for (let i = 0; i < diagnolArray.length; i++) {
      if (diagnolArray[i] === null) {
        diagnolArray[i] = "."
      }
    }
    let diagnolString;
        diagnolString = diagnolArray[0] +
                        diagnolArray[4] +
                        diagnolArray[8] +
                        diagnolArray[2] +
                        diagnolArray[4] +
                        diagnolArray[6]
    if (diagnolString.includes("XXX")) {
      this.setState({winner: "X", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return 
    }else if (diagnolString.includes("OOO")) {
      this.setState({winner: "O", turn: ""}, () => {
        console.log(this.state.winner)
      })
      return
    }

    if (this.state.winner !== "") {this.setState({turn: ""})}

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