import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css'

function Square(props) {
  return (
    <button
    value={props.value}
    onClick={props.onClick}
    className='square'
  >
    {props.value}
  </button>
  )
}

class GameBoard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: true,
      win: false,
      champion: "",
      refresh: false
    }
  }

  clickEvent(i) {
    let copyOfArray = this.state.squares.slice()
    let player = this.state.turn === true ? "X" : "O"
    copyOfArray[i] = player;
    let arrayString = ""
    this.setState({
      squares: copyOfArray,
      turn: !this.state.turn
    }, () => {
      const horizontal = this.state.squares.slice()
      let vertical = this.state.squares.slice()

      function horizontalCheck() {
        for (i = 0; i < horizontal.length; i++){
          arrayString += horizontal[i]
        }
        if (arrayString.includes("XXX") || arrayString.includes("OOO")) {
          // console.log(arrayString.indexOf("XXX"))
          let symbol_X = arrayString.indexOf("XXX")
          let symbol_O = arrayString.indexOf("OOO")
          let x = symbol_X != -1 ? true : false
          let o = symbol_O != -1 ? true : false
          
          let winner = ""

          if (x == true || o == true) {
            winner = x ? "X" : "O"
          }
          return winner
        } 
      }
      let a = horizontalCheck()
      
      function verticalCheck() {
        arrayString = ""
        arrayString += vertical[0]
        arrayString += vertical[3]
        arrayString += vertical[6]
        
        arrayString += vertical[1]
        arrayString += vertical[4]
        arrayString += vertical[7]

        arrayString += vertical[2]
        arrayString += vertical[5]
        arrayString += vertical[8]

        if (arrayString.includes("XXX") || arrayString.includes("OOO")) {
          // console.log(arrayString.indexOf("XXX"))
          let symbol_X = arrayString.indexOf("XXX")
          let symbol_O = arrayString.indexOf("OOO")
          let x = symbol_X != -1 ? true : false
          let o = symbol_O != -1 ? true : false
          
          let winner = ""

          if (x == true || o == true) {
            winner = x ? "X" : "O"
          }
          return winner
        }
      }
      verticalCheck();
      let b = verticalCheck()

      function diagnolCheck() {
        arrayString = ""
        arrayString += vertical[0]
        arrayString += vertical[4]
        arrayString += vertical[8]

        arrayString += vertical[2]
        arrayString += vertical[4]
        arrayString += vertical[6]

        if (arrayString.includes("XXX") || arrayString.includes("OOO")) {
          // console.log(arrayString.indexOf("XXX"))
          let symbol_X = arrayString.indexOf("XXX")
          let symbol_O = arrayString.indexOf("OOO")
          let x = symbol_X != -1 ? true : false
          let o = symbol_O != -1 ? true : false
          
          let winner = ""

          if (x == true || o == true) {
            winner = x ? "X" : "O"
          }
          return winner
        }
      }
      diagnolCheck()
      let c = diagnolCheck()

      let checkArray = [a, b, c]
      let arrayWinner = ""

      for (i = 0; i < checkArray.length; i++) {
        if (checkArray[i] != undefined) {
          arrayWinner = checkArray[i]
          this.setState({
            champion: arrayWinner,
            win: true,
            refresh: true
          })
        }
      }

      console.log(arrayWinner);

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

  refresh(value) {
    if (value == true) {
      const newArray = Array(9).fill(null)
      this.setState({
        squares: newArray,
        turn: true,
        win: false,
        champion: "",
        refresh: false
      })
    }
  }

  render() {
    let outcome = ""
    let player = ""
    let championText = `The Winner is...... ${this.state.champion}`
    this.state.turn ? player = "X" : player = "O"
    let nextTurn = `it is ${player}'s turn`
    this.state.win ? outcome = outcome = championText : outcome = nextTurn
    return(
      <div>
        <div className="turn_notification">{outcome}</div>
        <div className="row_1">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row_2">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row_3">
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