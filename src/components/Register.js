import React from 'react';
import Header from '../components/views/Header'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { register } from '../actions/index'
import { Provider } from "react-redux";
import Login from './Login';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "../reducers/Game";

const store = createStore(rootReducer, applyMiddleware(thunk));


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSuccess: false
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        var user = {};
        user.username = e.currentTarget[0].value;
        user.password = e.currentTarget[1].value;
        user.email = e.currentTarget[2].value;
        e.preventDefault();
        let rs = register(user)
        rs.then(value => {
            if (value.payload.status === 200) {
                this.props.history.push('/login')
                this.setState({
                    isSuccess: true
                })
            }
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        if (this.state.isSuccess) {
            return (
                <Router exact path="/login">
                    <Provider store={store}>
                        <Login />
                    </Provider>
                </Router>
            )
        }
        return (
            <div style={{ margin: '0' }}>
                <Header />
                <Container>
                    <Card className="mt-5" style={{ width: '30rem', margin: 'auto' }}>
                        <Card.Header as="h3">
                            Register
                    </Card.Header>
                        <Card.Body>
                            <Form onSubmit={e => this.handleSubmit(e)}>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="*Username" required />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="*Password" required />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="*Email" required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                            </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div >

        )
    }
}

export default withRouter(Register);