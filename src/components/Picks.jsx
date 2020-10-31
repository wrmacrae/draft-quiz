import React from 'react';
import { makeGuess, makePick } from '../reducer';
import '../styles.css';
import { connect } from 'react-redux'


export class Picks extends React.PureComponent {

  handleClick(value) {
    if(this.props.guess !== "") {
      return
    }
    this.props.makeGuess(value);
    setTimeout(() => {
      this.props.makePick();
    }, 2000)  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else if (this.props.cards.length === 0) {
      const randomQuiz = window.location.href.split('?')[0];
      const thisQuiz = randomQuiz + "?id=" + this.props.id;
      const log = "https://www.17lands.com/draft/" + this.props.id;
      const deck = "https://www.17lands.com/deck/" + this.props.id;
      return <div>
        <div>New Quiz: <a href={randomQuiz}>{randomQuiz}</a></div>
        <div>This Quiz: <a href={thisQuiz}>{thisQuiz}</a></div>
        <div>Draft Log: <a href={log}>{log}</a></div>
        <div>Final Deck: <a href={deck}>{deck}</a></div>
      </div>;
    }
    return <div>
      Options:
      <div className="pick-options">
      {this.props.cards.map((value, index) => { 
        return <div className="card" key={index}>
          <div className="card-big preview-below clickable" onClick={() => this.handleClick(value)}>
            <img className="card-big"  src={value} />
          </div>
          <img className="card-small clickable" onClick={() => this.handleClick(value)} src={value} />
          {this.props.guess && this.props.answer === value ?
          <span className="correct-overlay">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </span> : ""}
          {this.props.guess === value && this.props.answer !== value ?
          <span className="wrong-overlay">
            <svg className="xmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="xmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="xmark__one" fill="none" d="M18 18l16 16"/>
              <path className="xmark__two" fill="none" d="M34 18l-16 16"/>
            </svg>            
          </span> : ""}
        </div>;
      })}
      </div>
    </div>;
  } 
}

const mapStateToProps = state => ({
  loading: state.loading,
  cards: state.cards,
  id: state.id,
  guess: state.guess,
  answer: state.answer,
});

const mapDispatchToProps = dispatch => ({
  makeGuess: guess => dispatch(makeGuess(guess)),
  makePick: () => dispatch(makePick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Picks);