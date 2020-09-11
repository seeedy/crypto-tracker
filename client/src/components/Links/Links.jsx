import React from 'react';
import { Nav } from 'react-bootstrap';

const Links = () => {
    return (
        <Nav>
            <Nav.Item>
                <Nav.Link href='/positions/list'>Positions</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/positions/new'>New Position</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Links;
