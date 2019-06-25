import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import QuestionWrapper from './QuestionWrapper';
import Text from './Text'
import QuestionText from './QuestionText'
import Content from './Content';
import MiniHeading from './MiniHeading';
import HorizontalLine from './HorizontalLine';
import Button from '../Button';
import Questions from '../../utils/questions.json';

class Evaluation extends Component{
  constructor(props){
    super(props);
    this.state = {
      correctGivenAnswerCount: 0
    }
    this.resultList = [];
    this.getAnswersAndQuestions = this.getAnswersAndQuestions.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentWillMount(){
    this.getResults()
  }

  getResults(){
    let correctGivenAnswerCount = 0,
        givenAnswers = this.props.givenAnswers,
        correctAnswers = this.props.correctAnswers,
        tempList = [];
    let questions = fromJS(Questions);

    givenAnswers.map((v, k) => {
      let corrAnswer = correctAnswers.get(k),
          questionInfo = questions.get(k),
          question = questionInfo.get('frage'),
          correctAnswerVal = questionInfo.get(corrAnswer),
          evalText = [],
          backgroundColor = 'yellowgreen';

      if(!correctAnswerVal || correctAnswerVal === ''){
        correctAnswerVal = questionInfo.get('antwort') + " Würfel";
      }

      if(v === corrAnswer){
        correctGivenAnswerCount = correctGivenAnswerCount + 1;
        evalText.push(<QuestionText key={k}>Korrekt beantwortet! - {correctAnswerVal}</QuestionText>)
      }else{
        evalText.push(<QuestionText key={k}>Leider war deine Antwort falsch! - Richtig wäre: {correctAnswerVal}</QuestionText>)
        backgroundColor = 'orangered';
      }
      tempList.push(
        <QuestionWrapper key={k} background={backgroundColor}>
          <MiniHeading>Frage {k}: {question}</MiniHeading>
          {evalText}
        </QuestionWrapper>)
      return true; // satisfy arrow-map
    })

    this.setState({
      correctGivenAnswerCount,
      resultList: tempList
    })
  }

  getAnswersAndQuestions(){ // get correct answers from json file
    let {questions} = this.state;
    let answerMap = new Map(),
        questionMap = new Map();

    questions.map((v, k) => {
      let answer = v.get('antwort'),
          question = v.get('frage');
      answerMap = answerMap.set(k, answer)
      questionMap = questionMap.set(k, question)
      return true; // satisfy arrow-func
    })

    return [answerMap, questionMap];
  }

  render(){
    return(
      <Wrapper>
        <h2>Dein Ergebnis:</h2>
        <Content>
          <Text>Du hast {this.state.correctGivenAnswerCount} von 5 Fragen richtig beantwortet! </Text>
          {this.state.resultList}
        </Content>
        <HorizontalLine />
        <b style={{marginBottom: '1rem'}}>Willst du das Quiz noch einmal starten?</b>
        <Button text={'Zurück zum Anfang'} clickFunc={this.props.clickFunc}/>
      </Wrapper>
    );
  }
}

Evaluation.propTypes = {
  clickFunc: PropTypes.func
};

Evaluation.defaultProps = {
  clickFunc: null
};


export default Evaluation;
