import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

class Evaluation extends Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }

  render(){
    let {display, evaluation} = this.props;
    return(
      <Wrapper display={display}>
        <b>Auflösung:</b>
        {evaluation}
      </Wrapper>
    );
  }
}

Evaluation.propTypes = {
  display: PropTypes.string,
  evaluation: PropTypes.string
};

Evaluation.defaultProps = {
  display: 'none',
  evaluation: ''
};

export default Evaluation;
