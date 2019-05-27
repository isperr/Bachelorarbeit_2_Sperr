import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import shuffle from 'shuffle-array';
import Wrapper from './Wrapper';
import Question from '../../components/Question';
import Questions from '../../utils/questions.json';

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
    tempList.push(<Question isStartEnd={'end'}/>);

    // set questionList
    this.questionList = tempList;
  }

  render(){
    // console.log(this.state.questions)
    let {questionCount} = this.state

    return(
      <Wrapper>
        HomeScreen
        {this.questionList[questionCount]}
      </Wrapper>
    );
  }
}

export default HomeScreen;
