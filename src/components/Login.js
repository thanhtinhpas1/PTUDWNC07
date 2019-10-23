import React from 'react';
import { connect } from 'react-redux'
import Header from '../components/views/Header'
import { Card, Container, Form, Button, FormText } from 'react-bootstrap'
import { login, me } from '../actions/index'
import { createStore } from "redux";
import Game from "../components/Game";
import { Provider } from "react-redux";
import rootReducer from "../reducers/Game";
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
const store = createStore(rootReducer);

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthen: false,
            error: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let username = e.currentTarget[0].value;
        let password = e.currentTarget[1].value;
        var res = login(username, password)
        res.then(value => {
            console.log(value)
            if (value.payload.code === 200) {
                this.props.history.push('/game')
                // console.log(value.payload.token)
                me(value.payload.token).then(value => {
                    // console.log(value)
                    if (value) {
                        this.setState({
                            ...value.payload.message
                        })
                    }
                })
                this.setState({
                    isAuthen: true,
                    token: value.payload.token
                })
                this.props.game.isAuth = true
            }
            else {
                this.setState({
                    error: 'Username or password is invalid'
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        const { isAuthen } = this.state;
        // console.log(isAuthen)
        if (isAuthen) {
            return <Router exact path="/game">
                <Provider store={store}>
                    <Game state={this.state} />
                </Provider>
            </Router>
        }
        return (
            <Router>
                <Header />
                <Container>
                    <Card className="mt-5" style={{ width: '30rem', margin: 'auto' }}>
                        <Card.Header as="h3">
                            Sign in
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Enter your username" required />
                                    <Form.Text className="text-muted">
                                        We'll never share your information with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Password" required />
                                </Form.Group>
                                <FormText style={{ fontSize: '18px', color: 'red', marginBottom: '5px' }}>{this.state.error}</FormText>
                                <Button variant="primary" type="submit">
                                    Submit
                            </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                Do you have any account? Please
                            <a href="/register"> register.</a>
                            </Card.Text>
                        </Card.Footer>
                    </Card>
                </Container >
            </Router >
        )
    }
}

const mapStateToProps = state => {
    return {
        game: state
    };
}

export default withRouter(connect(mapStateToProps, { login })(Login))