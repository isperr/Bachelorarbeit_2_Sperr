import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import Wrapper from './Wrapper';
import LineWrapper from './LineWrapper';
import Question from '../../components/Question';
import Questions from '../../utils/questions.json';
import CustomToastContainer from '../../components/CustomToastContainer';
import { Line } from 'rc-progress';
import {APPLE_GREEN, LIGHT_GRAY} from '../../styles/variables';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      questions: fromJS(Questions),
      questionCount: 0
    }
    this.questionList = [];
    this.getNextQuestion = this.getNextQuestion.bind(this);
    this.getQuestionList = this.getQuestionList.bind(this);
    this.getQuestionStart = this.getQuestionStart.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentWillMount(){
    this.getQuestionList()
  }

  getNextQuestion(){
    let questionCount = this.state.questionCount;
    this.setState({
      questionCount: questionCount+1
    })
  }

  getQuestionStart(){
    this.setState({
      questionCount: 0
    })
  }

  getQuestionList(){
    let {questions} = this.state;
    let qTemp = questions.valueSeq(),
        // shuffeldQuestions = shuffle(qTemp.toJS()),
        shuffeldQuestions = qTemp.toJS(),
        tempList = [];
    // push start screen to tempList
    tempList.push(<Question isStartEnd={'start'} nextFunc={this.getNextQuestion}/>);
    // iterate through questions-map & push questions to tempList
    shuffeldQuestions.map(item => {
      tempList.push(<Question question={item} nextFunc={this.getNextQuestion}/>);
      // satisfy arrow func
      return true;
    });
    //push finish screen to tempList
    tempList.push(<Question isStartEnd={'end'} nextFunc={this.getQuestionStart} answerMap={this.getAnswers()}/>);

    // set questionList
    this.questionList = tempList;
  }

  getAnswers(){ // get correct answers from json file
    let {questions} = this.state;
    let answerMap = new Map()

    questions.map((v, k) => {
      let answer = v.get('antwort')
      answerMap = answerMap.set(k, answer)
      return true; // satisfy arrow-func
    })

    return answerMap;
  }


  render(){
    let {questionCount} = this.state
    let currQuestion = questionCount - 1;
    let percent = questionCount && currQuestion > 0 ? (currQuestion/5)*100 : 0;

    return(
      <Wrapper>
        {this.questionList[questionCount]}
        {questionCount > 0 && questionCount < 6 ? <p style={{zIndex: '2'}}>Aktuelle Frage: {questionCount} von 5</p> : null}
        {questionCount > 0 && questionCount < 6 ?
          <LineWrapper>
            <Line percent={percent} strokeWidth="4.5" strokeColor={APPLE_GREEN} trailWidth="4.5" trailColor={LIGHT_GRAY}/>
          </LineWrapper> : null}
        <CustomToastContainer />
      </Wrapper>
    );
  }
}

export default HomeScreen;
