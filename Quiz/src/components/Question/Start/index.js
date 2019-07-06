import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import Heading from './Heading';
import Content from '../Content';
import Logo from '../../../containers/HomeScreen/Logo';
import Button from '../../Button';
import logo from '../../../images/QuizMate.png';


class Start extends Component{
  render(){
    return(
      <Content>
        <Logo src={logo} alt={'Logo'}/>
        <Heading> Willkommen zu QuizMate!</Heading>
        <Text>
          QuizMate hilft dir dein Wissen über Gesundheit und Ernährung zu überprüfen und verbesern!
        </Text>
        <Text>
          Klicke den "Start"-Button um das Quiz gleich zu beginnen:
        </Text>
        <Button text={'Start'} clickFunc={this.props.clickFunc}/>
      </Content>
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
