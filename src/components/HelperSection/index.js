import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import LineText from './LineText';
import HelperAvatar from './HelperAvatar';
import BubbleHeading from './BubbleHeading';
import BubbleText from './BubbleText';
import Bubble from './Bubble';
import LineWrapper from './LineWrapper';
import { Line } from 'rc-progress';
import {OLIVE, LIGHT_GRAY} from '../../styles/variables';
import watermelon from '../../images/watermelon.png';

class HelperSection extends Component{
  render(){
    let {text, heading, questionNr} = this.props;
    questionNr = Number(questionNr);

    let currQuestion = questionNr - 1;
    let percent = questionNr && currQuestion > 0 ? (currQuestion/5)*100 : 0;
    if(questionNr === 5){
      percent = 85;
    }


    let lineText, line;
    if(questionNr > 0 && questionNr < 6){
      lineText = <LineText>Aktuelle Frage: {questionNr} von 5</LineText>;
      line =
        <LineWrapper>
          <Line percent={percent} strokeWidth="12.5" strokeColor={OLIVE} trailWidth="12.5" trailColor={LIGHT_GRAY}/>
        </LineWrapper>;
    }

    return(
      <Wrapper>
        <Bubble id={'bubble'}>
          <BubbleHeading>{heading}</BubbleHeading>
          <BubbleText>{text}</BubbleText>
        </Bubble>
        <HelperAvatar src={watermelon}/>
        {lineText}
        {line}
      </Wrapper>
    );
  }
}

HelperSection.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  questionNr: PropTypes.string
};

HelperSection.defaultProps = {
  heading: '',
  text: '',
  questionNr: '0'
};

export default HelperSection;
