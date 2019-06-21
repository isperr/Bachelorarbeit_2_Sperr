import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import Heading from './Heading';
import Wrapper from '../Wrapper';
import Logo from '../../../containers/HomeScreen/Logo';
import Button from '../../Button';
import logo from '../../../images/QuizMate.png';


class Start extends Component{
  render(){
    return(
      <Wrapper>
        <Logo src={logo} alt={'Logo'}/>
        <Heading> Willkommen zu QuizMate!</Heading>
        <Text>
          QuizMate hilft dir dein Wissen über Gesundheit und Ernährung zu überprüfen und verbesern!
        </Text>
        <Text>
          Klicke den "Start"-Button um das Quiz gleich zu beginnen:
        </Text>
        <Button text={'Start'} clickFunc={this.props.clickFunc}/>
      </Wrapper>
    );
  }
}

Start.propTypes = {
  clickFunc: PropTypes.func
};

Start.defaultProps = {
  clickFunc: null
};


export default Start;
