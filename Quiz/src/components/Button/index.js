import React, {Component} from 'react';
import StyledB from './StyledB';

class Button extends Component{
  render(){
    return(
      <StyledB onClick={this.props.clickFunc}>
        {this.props.text}
      </StyledB>
    );
  }
}

export default Button;
