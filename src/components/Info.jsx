import React from 'react';
import { makeGuess, makePick } from '../actions';
import '../styles.css';
import { connect } from 'react-redux'


export class Info extends React.PureComponent {
  render() {
    return <div className="info">
      Draft from <a href="http://www.17lands.com/trophies">www.17lands.com/trophies</a>, eventual deck went 7-0.
    </div>;
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);