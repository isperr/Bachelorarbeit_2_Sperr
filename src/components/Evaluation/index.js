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
import LinkButton from './LinkButton';
import $ from 'jquery'

class Evaluation extends Component{
  constructor(props){
    super(props);
    this.state = {
      correctGivenAnswerCount: 0,
      showResults: 'none',
      resultList: []
    }
    this.getAnswersAndQuestions = this.getAnswersAndQuestions.bind(this);
    this.getResults = this.getResults.bind(this);
    this.showHideEvaluation = this.showHideEvaluation.bind(this);
    this.getEvalDragFields = this.getEvalDragFields.bind(this);
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
    let dragfieldsImages = new Map({
      'burger_fries': 'Burger und Pommes',
      'chocolate_sweets': 'Schokolade und kleine Süßigkeiten',
      'fruits_veggies': 'Obst und Gemüse',
      'pizza': 'Pizza'
    });
    let dragfieldsZones = new Map({
      '1': 'Gut',
      '2': 'Mittel',
      '3': 'Schlecht'
    });


    givenAnswers.map((v, k) => {
      let corrAnswer = correctAnswers.get(k),
          questionInfo = questions.get(k),
          question = questionInfo.get('frage'),
          correctAnswerVal = questionInfo.get(corrAnswer),
          evalText = [],
          backgroundColor = 'yellowgreen',
          questionType = questionInfo.get('type');

      if(!correctAnswerVal || correctAnswerVal === ''){
        correctAnswerVal = questionInfo.get('antwort') + " Würfel";
      }

      if(v === corrAnswer){
        correctGivenAnswerCount = correctGivenAnswerCount + 1;
        evalText.push(<QuestionText key={k}>Korrekt beantwortet! - {correctAnswerVal}</QuestionText>)
      }else{
        if(questionType === 'dragfields'){
          let answers = questionInfo.get('antwort');
          let currAnswers = fromJS(v);
          let evalRight = [];
          let evalWrong = [];
          currAnswers.map((val, key) => {
            let a = answers.get(key);
            if(val === a){
              evalRight.push(dragfieldsImages.get(key) + ' - ' + dragfieldsZones.get(a))
            }else{
              evalWrong.push(dragfieldsImages.get(key) + ' - ' + dragfieldsZones.get(a))
            }
            return true; // satisfy arrow-map
          })
          let corrAnswerVal = '';
          if(evalRight.length > 0 && evalWrong.length > 0){
            corrAnswerVal = 'Richtig: ' + evalRight.join(', ') + ', Falsch: ' + evalWrong.join(', ');
          }else if(evalRight.length === 0 && evalWrong.length > 0){
            corrAnswerVal = 'Falsch: ' + evalWrong.join(', ');
          }else{
            corrAnswerVal = evalRight.join(', ');
          }

          if(evalWrong.length === 0){// no mistakes were made
            evalText.push(<QuestionText key={k}>Super, du hast alle Lebensmittel richtig zugeordnet! {corrAnswerVal}</QuestionText>)
          }else{ // some mistakes were made
            evalText.push(<QuestionText key={k}>Leider war deine Antwort nicht ganz richtig! {corrAnswerVal}</QuestionText>)
          }
        }else{
          evalText.push(<QuestionText key={k}>Leider war deine Antwort falsch! - Richtig wäre: {correctAnswerVal}</QuestionText>)
          backgroundColor = 'orangered';
        }
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

  getEvalDragFields(){

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

  showHideEvaluation(e){
    e.preventDefault();
    let showResults = this.state.showResults;
    if(showResults === 'none'){
      this.setState({
        showResults: 'flex'
      })
      $('#showResults').text('Meine Ergebnisse wieder verbergen')
    }else{
      this.setState({
        showResults: 'none'
      })
      $('#showResults').text('Zeig meine Ergebnisse wieder an')
    }
  }

  render(){
    let showResults = this.state.showResults;
    return(
      <Wrapper>
        <h2>Dein Ergebnis:</h2>
        <Content>
          <Text>Du hast {this.state.correctGivenAnswerCount} von 5 Fragen richtig beantwortet! </Text>
          <LinkButton onClick={(e) => this.showHideEvaluation(e)} id={'showResults'}>Zeig meine Ergebnisse an</LinkButton>
          <div style={{display: showResults, flexDirection: 'column'}}>
            {this.state.resultList}
          </div>
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
