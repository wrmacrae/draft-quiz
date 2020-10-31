import React from 'react';
import '../styles.css';
import { connect } from 'react-redux'


export class Info extends React.PureComponent {
  render() {
    if (this.props.draft && this.props.draft.record) {
      var results = ". Deck went " + this.props.draft.record + " in " + this.props.draft.type + " Draft.";
    }
    return <div className="info">
      {(this.props.draft && this.props.draft.source) ? "Draft from " + this.props.draft.source + results 	: ""}
    </div>;
  }
}

const mapStateToProps = state => ({
  draft: state.draft
});

export default connect(mapStateToProps)(Info);