import React from 'react';
import './App.css';
import Nav from './Nav';
import Score from './Score';
import Picks from './Picks';
import Deck from './Deck';
import Sideboard from './Sideboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <Score />
        <Picks />
        Possible Maindeck:
        <Deck />
        Likely Sideboard:
        <Sideboard />
      </header>
    </div>
  );
}

export default App;
