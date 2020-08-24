import React from 'react';
import '../styles.css';
import { connect } from 'react-redux'

export class Sideboard extends React.PureComponent {
  render() {
    return <div className="deck">
      {this.props.sideboard.map((column, index) => { 
        return <div className="pile" key={index}>
          {column.map((card,cindex) => {
            let classes = (cindex === column.length - 1) ? "card-small over" : "card-small under";
            return <img className={classes} src={card} />;           
          })}
        </div>;
      })}
    </div>;
  } 
}

const mapStateToProps = state => ({
  sideboard: state.sideboard
});

export default connect(mapStateToProps)(Sideboard);