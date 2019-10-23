import React from "react";
import { connect } from "react-redux";
import { move } from "../actions";
import { moveStep } from "../actions";
import { sort } from "../actions";
import Header from '../components/views/Header'
import Board from "./Board";
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux";
import { login } from '../actions/index'
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "../reducers/Game";
import Login from "../components/Login";
const store = createStore(rootReducer, applyMiddleware(thunk));

class Game extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            ...props
        }
    };

    handleClick(i) {
        this.props.move(i);
    }

    jumpTo(step) {
        this.props.moveStep(step);
    }

    sort() {
        this.props.sort();
    }

    render() {
        // const { username } = this.props.state.username
        if (!this.props.game.isAuth) {
            return (
                <Router exact path="/login">
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </Router>
            )
        }
        console.log(this.props.state.username)
        const {
            history,
            stepNumber,
            status,
            squaresWin,
            sortIncrease,
            isActive
        } = this.props.game;
        const current = history[stepNumber];
        let desc;
        let moves;
        moves = history.map((step, move) => {
            desc = move ? `Go to move #${move} Position:#` : "Go to game start";
            return (
                <li key={step.position}>
                    <button
                        type="button"
                        style={{ width: '80%' }}
                        className={isActive === move ? "active mt-3 btn btn-danger" : "mt-3 btn btn-primary"}
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc} {step.position[move - 1]}
                    </button>
                </li>
            );
        });

        if (!sortIncrease) {
            moves = moves.reverse();
        }

        return (
            <div>
                <Header store={this.props.state.username} />
                <div className="game" style={{ marginTop: '10px' }}>
                    <div className="game-info">
                        <div className="status">
                            {status}
                            <div className="step">
                                <button className="btn btn-primary" type="button" onClick={() => this.sort()}>
                                    Sort
                                </button>
                            </div>
                        </div>
                        <ol>{moves}</ol>
                    </div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            squaresWin={squaresWin}
                            onClick={i => this.handleClick(i)}
                        />
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state
    }
}

export default connect(mapStateToProps, { move, moveStep, sort, login })(Game);
