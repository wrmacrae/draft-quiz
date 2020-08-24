import React from 'react';
import { connect } from 'react-redux'

export class Score extends React.PureComponent {
  render() {
    return <div>
      {this.props.score.right} / {this.props.score.total} {this.props.score.total > 0 ? "(" + Math.round(this.props.score.right/this.props.score.total*100) + "%)" : ""}
    </div>;
  }
}

const mapStateToProps = state => ({
  score: state.score
});

export default connect(mapStateToProps)(Score);