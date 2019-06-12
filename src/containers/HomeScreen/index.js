import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import shuffle from 'shuffle-array';
import Wrapper from './Wrapper';
import LineWrapper from './LineWrapper';
import Logo from './Logo';
import Question from '../../components/Question';
import Questions from '../../utils/questions.json';
import img from '../../images/QuizMate.png';
import CustomToastContainer from '../../components/CustomToastContainer';
import { Line, Circle } from 'rc-progress';
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
    this.getPrevQuestion = this.getPrevQuestion.bind(this);
    this.getQuestionList = this.getQuestionList.bind(this);
    this.getQuestionStart = this.getQuestionStart.bind(this);
  }

  componentWillMount(){
    this.getQuestionList()
  }

  getNextQuestion(){
    console.log('getNextQuestion')
    let questionCount = this.state.questionCount;
    this.setState({
      questionCount: questionCount+1
    })
  }

  getPrevQuestion(){
    console.log('getPrevQuestion')
    let questionCount = this.state.questionCount;
    if(questionCount > 0)
    this.setState({
      questionCount: questionCount-1
    })
  }

  getQuestionStart(){
    this.setState({
      questionCount: 0
    })
  }

  getQuestionList(){
    console.log('getQuestionList')
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
    tempList.push(<Question isStartEnd={'end'} nextFunc={this.getQuestionStart}/>);

    // set questionList
    this.questionList = tempList;
  }

  render(){
    // console.log(this.state.questions)
    let {questionCount} = this.state
    let currQuestion = questionCount - 1;
    console.log(questionCount)
    let percent = questionCount && currQuestion > 0 ? (currQuestion/5)*100 : 0;

    return(
      <Wrapper>
        HomeScreen
        <Logo src={img} alt={'Logo'}/>
        <p>Erledigte Fragen in Prozent: {percent}%</p>
        {questionCount > 0 && questionCount < 6 ? <p>Aktuelle Frage: {questionCount}/5</p> : null}
        <LineWrapper>
          <Line percent={percent} strokeWidth="3.5" strokeColor={APPLE_GREEN} trailWidth="3.5" trailColor={LIGHT_GRAY}/>
        </LineWrapper>
        {this.questionList[questionCount]}
        <CustomToastContainer />
      </Wrapper>
    );
  }
}

export default HomeScreen;
