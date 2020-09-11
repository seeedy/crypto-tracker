import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';

import Links from '../Links/Links';

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Navbar variant='dark'>
                    <Links />
                </Navbar>
            </Container>
        );
    }
}

export default NavBar;
