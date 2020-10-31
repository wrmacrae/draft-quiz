import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App'
import reducer from './reducer'
import { setDraft, setDraftWithData } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import _ from 'lodash';

function getId() {
  const idFromParam = (new URLSearchParams(window.location.search)).get('id');
  if (idFromParam) {
    return idFromParam
  }
  const setFromParam = (new URLSearchParams(window.location.search)).get('set');
  const set = setFromParam || "ZNR";
  var logs = require('./logs');
  logs = _.pickBy(logs, log => log.set === set);
  const ids = Object.keys(logs);
  return ids[Math.floor(Math.random() * ids.length)];  
}

render(<div>Loading</div>, document.getElementById('root'));

const id = getId();
var logs = require('./logs');
if (logs[id] === undefined || logs[id].picks === undefined) {
    const json = fetch("https://www.17lands.com/data/draft/?draft_id=" + id)
	    .then((response) => response.json())
	    .then((json) => {
			const store = createStore(reducer);
			store.dispatch(setDraftWithData(id, json));

			render(
			  <Provider store={store}>
			    <App />
			  </Provider>,
			  document.getElementById('root')
			);
	    })
} else {
	const store = createStore(reducer);
	store.dispatch(setDraft(getId()));

	render(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById('root')
	);
}