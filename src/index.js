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

function RefreshButtonElement(props) {
  return(
    <button
      className="buttonRefresh"
      onClick={props.onClick}
    >
      Start New Game
    </button>
  )
}

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: true,
      winner: "",
      refresh: false,
      history: []
    }
  }

  clickEvent(i) {
    const newArray = this.state.squares.slice()
    const history = this.state.history
          history.push(newArray);
    this.setState({
                  history: history
                  },
                    () => console.log(this.state.history)
                  )

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
    const object = {
                    first:  [stateArray[0], stateArray[1], stateArray[2]],
                    second: [stateArray[3], stateArray[4], stateArray[5]],
                    third:  [stateArray[6], stateArray[7], stateArray[8]]
                   };
    let condition_one =   object.first[0]  + object.first[1]  + object.first[2];
    let condition_two =   object.second[0] + object.second[1] + object.second[2];
    let condition_three = object.third[0]  + object.third[1]  + object.third[2];

    let testArray = [condition_one, condition_two, condition_three]

    for (let i = 0; i < testArray.length; i++) {
      if (testArray[i].length === 3) {
        this.setState({winner: testArray[i][0], turn: "", refresh: true},
          () => {
            // console.log(this.state.winner);
          });
      }
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
      this.setState({winner: "X", turn: "", refresh: true})
    }else if (changedVeriticalArray.includes("OOO")) {
      this.setState({winner: "O", turn: "", refresh: true})    
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
      this.setState({winner: "X", turn: "", refresh: true})
    }else if (diagnolString.includes("OOO")) {
      this.setState({winner: "O", turn: "", refresh: true})
    }
    // console.log("array: ", array);
    // console.log("changed vertical array: ", changedVeriticalArray)
    // console.log("diagnolString ", diagnolString)
  }

  removeButton() {
    this.setState({
      refresh: null, squares: Array(9).fill(null),
      turn: true,
      winner: "",
      history: []
    });

  }

  renderRefreshButton(props) {
      return (
        <RefreshButtonElement 
          onClick={() => this.removeButton()}
        />
      )
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
    let refreshButton
    refreshButton = this.state.refresh ? this.renderRefreshButton() : null
    
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
        <div>{refreshButton}</div>
      </div>
    )
  }
}


ReactDOM.render (
  <GameBoard />,
  document.getElementById("root")
)