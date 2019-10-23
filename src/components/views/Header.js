import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap'

function Header(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ display: 'block' }}>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="./favicon.ico"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    &nbsp;Tic Tac Toe
                </Navbar.Brand>
                <NavDropdown title={props.store} className="float-right mr-5">
                    <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                </NavDropdown>

            </Navbar>

        </>
    );
}


export default Header;