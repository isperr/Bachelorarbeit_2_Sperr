import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import Wrapper from './Wrapper';
import AnswerWrapper from '../QuestionComponents/AnswerWrapper';
import AllAnswers from '../QuestionComponents/AllAnswers';
import Button from '../../components/Button';
import CustomToast from '../CustomToast';

import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux';
import {makeSelectQuestions} from '../../containers/Root/selectors'
import {setQuestions} from '../../containers/Root/actions';

class Question extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.renderStart = this.renderStart.bind(this);
    this.renderEnd = this.renderEnd.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      selectedRadio: ''
    }
  }

  handleChange(e){
    // console.log(e.target)
    // console.log(e.target.value);
    this.setState({
      selectedRadio: e.target.value
    })
  }

  handleClickChange(e){
    if(e.target.tagName === 'LABEL'){
      console.log(e.target.nextSibling.value)
      this.setState({
        selectedRadio: e.target.nextSibling.value
      })
    }else if(e.target.tagName === 'DIV'){
      let inputVal = e.target.childNodes[1].value;
      console.log(inputVal)
      if(inputVal){
        this.setState({
          selectedRadio: inputVal
        })
      }

    }else{
      console.log(e.target)
    }
  }

  handleNext(){

    if(this.props.isStartEnd === 'start'){
      this.props.nextFunc()
    }else if(this.props.isStartEnd === 'end'){
      let tempQuestions = new Map();
      this.props.setQuestions(tempQuestions.toJS())
      this.props.nextFunc()
    }else{
      if(this.state.selectedRadio === ''){
        console.log('DONT GO FURTHER if no option is selected')
        CustomToast('error', 'Bitte wähle eine Option aus!')
      }else{
        let questions = this.props.questions;
        let tempQuestions = new Map();
        if(questions){
          tempQuestions = fromJS(questions)
        }

        let {question} = this.props;
        let num = question.nr;
        tempQuestions = tempQuestions.set(num, this.state.selectedRadio)
        this.props.setQuestions(tempQuestions.toJS())

        this.setState({
          selectedRadio: ''
        })

        this.props.nextFunc()
      }
    }
  }

  renderStart(){
    return(
      <Wrapper>
        Das ist der START-screen. <br/>
        Lets start this quiz
        <b>Klicke den Button um das Quiz zu starten:</b>
        <Button text={'Starte das Quiz'} clickFunc={this.handleNext}/>
      </Wrapper>
    )
  }

  renderEnd(){
    return(
      <Wrapper>
        Das ist der finish-screen. <br/>
        Nochmal? dann click den button dens hoffentlich bald gibt
        <Button text={'Nochmal?'} clickFunc={this.handleNext}/>
      </Wrapper>
    )
  }

  render(){
    let {isStartEnd} = this.props;
    if(isStartEnd === 'start'){
      return(
        this.renderStart()
      )
    }
    if(isStartEnd === 'end'){
      return(
        this.renderEnd()
      )
    }
    let question = this.props.question;
    let frage = question.frage,
        a = question.a,
        b = question.b,
        c = question.c,
        d = question.d,
        radioName = 'q' + question.nr;
    return(
      <Wrapper>
      <h3>Frage:</h3>
        <p>{frage}</p>
        <AllAnswers onClick={(e) => this.handleClickChange(e)}>
          <AnswerWrapper>
            <label>{a}</label>
            <input type="radio" name={radioName} value="a" checked={this.state.selectedRadio === 'a'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper>
            <label>{b}</label>
            <input type="radio" name={radioName} value="b" checked={this.state.selectedRadio === 'b'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper>
            <label>{c}</label>
            <input type="radio" name={radioName} value="c" checked={this.state.selectedRadio === 'c'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper>
            <label>{d}</label>
            <input type="radio" name={radioName} value="d" checked={this.state.selectedRadio === 'd'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
        </AllAnswers>
        <br/>
        <Button text={'Weiter'} clickFunc={this.handleNext}/>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setQuestions: questions => dispatch(setQuestions(questions))
})

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions()
})
export default connect(mapStateToProps, mapDispatchToProps)(Question);
