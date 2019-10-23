import calculateWinner from "../utils/WinnerUtils";

const initialState = {
    history: [
        {
            squares: Array(400).fill(null),
            position: []
        }
    ],
    isIncrease: true,
    xIsNext: true,
    status: "Next player: X",
    isWin: false,
    stepNumber: 0,
    squaresWin: [],
    isActive: -1,
    sortIncrease: true,
    username: '',
    password: '',
    email: '',
    isAuth: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "LOGIN": {
            var login = action.payload;
            console.log(action)
            login.then(value => {
                console.log(value)
                if (value.status === 200) {
                }
            }).catch(err => {
                console.error(err)
            })
            return action;
        }
        case "MOVE": {
            const i = action.payload;
            const { history, isWin, xIsNext, stepNumber } = state;
            const cloneHistory = history.slice(0, stepNumber + 1);
            const current = cloneHistory[cloneHistory.length - 1];
            const squares = current.squares.slice();
            const positions = current.position.slice();
            if (!squares[i] && !isWin) {
                squares[i] = xIsNext ? "X" : "O";
                const winner = calculateWinner(squares);
                if (winner) {
                    return {
                        ...state,
                        history: cloneHistory.concat([
                            {
                                squares,
                                position: positions.concat(String(i))
                            }
                        ]),
                        status: `Winner: ${squares[winner[0]]}`,
                        isWin: true,
                        squaresWin: winner
                    };
                }

                return {
                    ...state,
                    history: cloneHistory.concat([
                        {
                            squares,
                            position: positions.concat(String(i))
                        }
                    ]),
                    xIsNext: !xIsNext,
                    stepNumber: cloneHistory.length
                };
            }
            else {
                return state;
            }
        }
        case "MOVE_STEP": {
            const step = action.payload;
            const { history, xIsNext } = state;
            const cloneHistory = history.slice(0, history.length);
            const current = cloneHistory[step];
            const squares = current.squares.slice();
            const winner = calculateWinner(squares);
            if (winner) {
                return {
                    ...state,
                    stepNumber: step,
                    xIsNext: step % 2 === 0,
                    status: `Winner: ${squares[winner[0]]}`,
                    isWin: true,
                    squaresWin: winner,
                    isActive: step
                };
            }
            // active: step
            return {
                ...state,
                stepNumber: step,
                xIsNext: step % 2 === 0,
                status: `Next player: ${xIsNext ? "X" : "O"}`,
                isWin: false,
                squaresWin: [],
                isActive: step
            };
        }
        case "SORT": {
            return {
                ...state,
                xIsNext: state.step % 2 === 0,
                history: state.history,
                isWin: false,
                squaresWin: [],
                isActive: state.isActive,
                sortIncrease: !state.sortIncrease
            };
        }
        default:
            return state;
    }
}
