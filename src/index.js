import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'
import './Game.css'
import './index.css'
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import rootReducer from "./reducers/Game";
import Game from "./components/Game";

const store = createStore(rootReducer, applyMiddleware(thunk));
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Router>
        <Switch>
            <Router exact path="/login">
                <Provider store={store}>
                    <Login />
                </Provider>
            </Router>
            <Router exact path="/game">
                <Provider store={store}>
                    <Game />
                </Provider>
            </Router>
            <Router exact path="/register">
                <Register />
            </Router>
            <Router path="/">
                <Home />
            </Router>
        </Switch>
    </Router>
    ,
    rootElement
);
