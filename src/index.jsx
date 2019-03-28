import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import loadFa from './scripts/fontawesome';

const appElement = document.createElement('div');
appElement.id = 'root';
document.body.appendChild(appElement);
loadFa();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  appElement
);
