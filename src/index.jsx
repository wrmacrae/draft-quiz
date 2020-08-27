import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App'
import reducer from './reducer'
import { setDraft } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

function getId() {
  let idFromParam = (new URLSearchParams(window.location.search)).get('id');
  if (idFromParam) {
    return idFromParam
  }
  const ids = [
    "09a510b8e34a49bc962a29c5831f9e43",
    "0acbd9f97d0c44a8bb366e1de4f04e0d", //LoL #165
    "29fa2afbd9c94bee9c550d79360f35d1",
    "2c7465b07b44468684107bc19ea3f81b",
    "3d2a03b48a1a431bacb591b05af66b1f",
    "43cb9b90c3a24858952cc879a45fa0a4",
    "497ad517ae2a402e92c4114b281f60c8",
    "5d51884623264169b194763bd9c6f5b7",
    "a0483a48a14b4142b35cd1f0c4523652",
    "de5fcd6ad83d4444a780db8b4b1fe42d",
    "de68d9cb91894f748e4b29c990a759b9",
    "e7a6567f1a9d42429da6d5ca69a7e2f2",
  ];
  return idFromParam || ids[Math.floor(Math.random() * ids.length)];  
}


const store = createStore(reducer, reducer({}, setDraft(getId())));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);