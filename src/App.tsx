import { hot } from 'react-hot-loader/root';
import React, {
  useState, createContext, useEffect,
} from 'react';
import {
  BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import { MangaProvider } from '~/providers/manga';
import db from '~/utils/db';

// import Canvas from './components/Canvas';
import Upload from './components/Upload';
import Editor from './components/Editor';
import Config from './Config';
import Layout from './Layout';
import Landing from './Landing';
import Navbar from './components/Navbar';
import './assets/tailwind.css';

const App = () => {
  return (
    <MangaProvider>
      <Router>
        <Route
          exact
          path="/"
          render={props => (
            <Layout>
              <Navbar />
              <Landing routeProps={props} />
            </Layout>
          )}
        />
        <Route
          path="/config"
          render={() => (
            <Layout>
              <Navbar />
              <Config />
            </Layout>
          )}
        />
        <Route
          path="/editor/:id"
          render={props => (
            <Editor {...props}/>
          )}
        />
      </Router>
    </MangaProvider>
  );
};

export default hot(App);
