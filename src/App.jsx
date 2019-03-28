import { hot } from 'react-hot-loader/root';
import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { styled } from 'linaria/react';
import Dexie from 'dexie';

import Canvas from './components/Canvas';
import Upload from './components/Upload';
import Config from './Config';
import './assets/tailwind.css';

const Title = styled.h1`
  color: red;
  font-size: 1em;
`;

const App = () => {
  const [name] = useState(0);
  return (
    <Router>
      <div className="App">
        <Title>
          Welcome to {name}
        </Title>

        <Route
          exact
          path="/"
          render={() => (
            <div>
              <li>
                <Link to="/canvas">Canvas</Link>
              </li>
              <li>
                <Link to="/config">Config</Link>
              </li>
              <Upload />
            </div>
          )}
        />
        <Route path="/canvas" render={() => <Canvas db={new Dexie('CanvasDb')} />} />
        <Route path="/config" component={Config} />
      </div>
    </Router>
  );
};

export default hot(App);
