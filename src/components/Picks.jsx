import React from 'react';
import { makePick } from '../actions';
import '../styles.css';
import { connect } from 'react-redux'

export class Picks extends React.PureComponent {
  render() {
    if (this.props.cards.length === 0) {
      const randomQuiz = window.location.href.split('?')[0];
      const thisQuiz = randomQuiz + "?id=" + this.props.id;
      const log = "https://www.17lands.com/draft/" + this.props.id;
      return <div>
        <div>Random Quiz: <a href={randomQuiz}>{randomQuiz}</a></div>
        <div>This Quiz: <a href={thisQuiz}>{thisQuiz}</a></div>
        <div>Draft Log: <a href={log}>{log}</a></div>
      </div>;
    }
    return <div>
      Options:
      <div className="pick-options">
      {this.props.cards.map((value, index) => { 
        return <div className="card" key={index}>
          <div className="card-big">
            <img className="card-big" onClick={() => this.props.pick(value)} src={value} />
          </div>
          <img className="card-small" onClick={() => this.props.pick(value)} src={value} />
        </div>;
      })}
      </div>
    </div>;
  } 
}

const mapStateToProps = state => ({
  cards: state.cards,
  id: state.id,
});

const mapDispatchToProps = dispatch => ({
  pick: guess => dispatch(makePick(guess))
});

export default connect(mapStateToProps, mapDispatchToProps)(Picks);