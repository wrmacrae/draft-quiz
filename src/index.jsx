import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App'
import reducer from './reducer'
import { setDraft } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import _ from 'lodash';

function getId() {
  const idFromParam = (new URLSearchParams(window.location.search)).get('id');
  if (idFromParam) {
    return idFromParam
  }
  const setFromParam = (new URLSearchParams(window.location.search)).get('set');
  const set = setFromParam || "AKR";
  var logs = require('./logs');
  logs = _.pickBy(logs, log => log.set === set);
  const ids = Object.keys(logs);
  return ids[Math.floor(Math.random() * ids.length)];  
}


const store = createStore(reducer, reducer({}, setDraft(getId())));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);