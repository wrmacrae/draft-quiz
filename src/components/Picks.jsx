import React from 'react';
import { makePick } from '../actions';
import '../styles.css';
import { connect } from 'react-redux'

export class Picks extends React.PureComponent {
  render() {
    if (this.props.cards.length === 0) {
      return <a href={this.props.logUrl}>{this.props.logUrl}</a>
    }
    return <div className="pick-options">
      {this.props.cards.map((value, index) => { 
        return <div className="card" key={index}>
          <div className="card-big">
            <img className="card-big" onClick={() => this.props.pick(value)} src={value} />
          </div>
          <img className="card-small" onClick={() => this.props.pick(value)} src={value} />
        </div>;
      })}
    </div>;
  } 
}

const mapStateToProps = state => ({
  cards: state.cards,
  logUrl: state.logUrl,
});

const mapDispatchToProps = dispatch => ({
  pick: guess => dispatch(makePick(guess))
});

export default connect(mapStateToProps, mapDispatchToProps)(Picks);