import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar, Wrapper } from '../components';
import { PositionsList, PositionInsert } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    return (
        <Router>
            <Wrapper>
                <NavBar />
                <Switch>
                    <Route path='/positions/list' component={PositionsList} />
                    <Route path='/positions/new' component={PositionInsert} />
                </Switch>
            </Wrapper>
        </Router>
    );
}

export default App;
