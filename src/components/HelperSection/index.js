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
    let {text, heading, questionNr, questionCount} = this.props;
    questionNr = Number(questionNr);

    let currQuestion = questionNr - 1;
    let percent = questionNr && currQuestion > 0 ? (currQuestion/questionCount)*100 : 0;
    if(questionNr === questionCount){
      percent = 85;
    }


    let lineText, line;
    if(questionNr > 0 && questionNr < questionCount+1){
      lineText = <LineText>Aktuelle Frage: {questionNr} von {questionCount}</LineText>;
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
  questionNr: PropTypes.string,
  questionCount: PropTypes.number
};

HelperSection.defaultProps = {
  heading: '',
  text: '',
  questionNr: '0',
  questionCount: 6
};

export default HelperSection;
