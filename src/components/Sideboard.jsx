import React from 'react';
import '../styles.css';
import { connect } from 'react-redux'

export class Sideboard extends React.PureComponent {
  render() {
    if (this.props.sideboard.length == 0) {
      return "";
    }
    return <div>
      Likely Sideboard:
      <div className="deck">
      {this.props.sideboard.map((column, index) => { 
        return <div className="pile" key={index}>
          {column.map((card,cindex) => {
            let classes = (cindex === column.length - 1) ? "card-small over" : "card-small under";
            return <div className="card" key={cindex}>
              <img className={classes} src={card} />
              <div className="card-big preview-above">
                <img className="card-big" src={card} />
              </div>
            </div>
          })}
        </div>
      })}
      </div>
    </div>;
  } 
}

const mapStateToProps = state => ({
  sideboard: state.sideboard
});

export default connect(mapStateToProps)(Sideboard);