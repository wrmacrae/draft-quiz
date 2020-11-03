import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './styles.css';
import App from './components/App'
import Nav from './components/Nav'
import reducer from './reducer'
import { setDraft, setDraftWithData } from './actions'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import _ from 'lodash';

function getOrSetId() {
  const idFromParam = (new URLSearchParams(window.location.search)).get('id');
  if (idFromParam) {
    return idFromParam
  } else {
	  const setFromParam = (new URLSearchParams(window.location.search)).get('set');
	  const set = setFromParam || "ZNR";
	  var logs = require('./logs');
	  logs = _.pickBy(logs, log => log.set === set);
	  const ids = Object.keys(logs);
	  window.location.replace(window.location.href.split('?')[0] + "?id=" + (ids[Math.floor(Math.random() * ids.length)]));
}
}

render(<div className="App"><Nav /><div className="Score">Loading...</div></div>, document.getElementById('root'));

const id = getOrSetId();
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
	store.dispatch(setDraft(getOrSetId()));

	render(
	  <Provider store={store}>
	    <App />
	  </Provider>,
	  document.getElementById('root')
	);
}