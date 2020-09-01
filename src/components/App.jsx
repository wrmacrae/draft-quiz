import React from 'react';
import './App.css';
import Nav from './Nav';
import Score from './Score';
import Picks from './Picks';
import Deck from './Deck';
import Sideboard from './Sideboard';
import Info from './Info';

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
        <Info />
      </header>
    </div>
  );
}

export default App;
