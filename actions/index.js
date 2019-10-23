
export const move = index => ({
    type: "MOVE",
    payload: index
});

export const moveStep = index => ({
    type: "MOVE_STEP",
    payload: index
});

export const sort = () => ({
    type: "SORT"
});

export const Play = {
    move,
    moveStep,
    sort
};

export const LOGIN = "LOGIN"
export const REGISTER = "REGISTER"
export const ME = "ME"
export const LOGOUT = "LOGOUT"

export const login = async (username, password) => {
    const callLogin = await fetch('https://ptudwnc06.herokuapp.com/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(res => {
        return res.json();
    })
    return {
        type: LOGIN,
        payload: callLogin
    }
}

export const me = async (token) => {
    console.log(token)
    const callMe = await fetch('https://ptudwnc06.herokuapp.com/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => {
        return res.json()
    })
    return {
        type: 'ME',
        payload: callMe
    }
}

export const register = async (user) => {
    const callRegister = await fetch('https://ptudwnc06.herokuapp.com/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return {
        type: 'REGISTER',
        payload: callRegister
    }
}
