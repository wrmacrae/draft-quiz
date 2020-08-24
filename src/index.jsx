import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App'
import reducer from './reducer'
import { setDraft } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const ids = [
  "3d2a03b48a1a431bacb591b05af66b1f",
  "2c7465b07b44468684107bc19ea3f81b",
  "de68d9cb91894f748e4b29c990a759b9",
  "a0483a48a14b4142b35cd1f0c4523652",
  "29fa2afbd9c94bee9c550d79360f35d1",
  "43cb9b90c3a24858952cc879a45fa0a4",
  "497ad517ae2a402e92c4114b281f60c8",
  "5d51884623264169b194763bd9c6f5b7",
  "de5fcd6ad83d4444a780db8b4b1fe42d",
];
const id = ids[Math.floor(Math.random() * ids.length)];

const store = createStore(reducer, reducer({}, setDraft(id)));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);