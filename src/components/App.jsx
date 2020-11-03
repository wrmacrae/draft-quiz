import React from 'react';
import Nav from './Nav';
import Score from './Score';
import Picks from './Picks';
import Deck from './Deck';
import Sideboard from './Sideboard';
import Info from './Info';

function App() {
  return (
    <div className="App">
      <Nav />
      <Score />
      <Picks />
      <Deck />
      <Sideboard />
      <Info />
    </div>
  );
}

export default App;
