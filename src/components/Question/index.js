import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import AnswerWrapper from '../QuestionComponents/AnswerWrapper';
import AllAnswers from '../QuestionComponents/AllAnswers';
import Button from '../../components/Button';
import CustomToast from '../CustomToast';
import DragAndDrop from '../DragAndDrop';

import $ from 'jquery';

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
    this.getCubeCount = this.getCubeCount.bind(this);
    this.handleNextStartEnd = this.handleNextStartEnd.bind(this);
    this.setItemsDropped = this.setItemsDropped.bind(this);
    this.state = {
      selectedRadio: '',
      isOneCubeOk: false
    }
    this.cubeCount = 0;
    this.itemsDropped = new Map();
  }

  handleChange(e){
    // console.log(e.target)
    // console.log(e.target.value);
    $( ".answer" ).removeClass( "clicked" )
    e.target.parentNode.classList.add("clicked");
    this.setState({
      selectedRadio: e.target.value
    })
  }

  handleClickChange(e){
    if(e.target.tagName === 'LABEL'){
      $( ".answer" ).removeClass( "clicked" )
      e.target.parentNode.classList.add("clicked");
      this.setState({
        selectedRadio: e.target.nextSibling.value
      })
    }else if(e.target.tagName === 'DIV' && $(e.target).hasClass( "answer" )){
      console.log(e.target.className)
      $( ".answer" ).removeClass( "clicked" )
      e.target.classList.add("clicked");
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

  handleNextStartEnd(){
    if(this.props.isStartEnd === 'start'){
      this.props.nextFunc()
    }else if(this.props.isStartEnd === 'end'){
      let tempQuestions = new Map();
      this.props.setQuestions(tempQuestions.toJS())
      this.props.nextFunc()
    }
  }

  handleNext(){
    let selectedRadio = this.state.selectedRadio;
    if(!this.props.question.a){
      console.log(this.itemsDropped)
      console.log()
      selectedRadio = this.getCubeCount();
    }else{
      this.setState({
        isOneCubeOk: true
      })
    }
    console.log(selectedRadio)

    if(selectedRadio === ''){
      console.log('DONT GO FURTHER if no option is selected')
      CustomToast('error', 'Bitte wähle eine Option aus!')
    }else if(selectedRadio === '0' && !this.state.isOneCubeOk){
      CustomToast('warning', 'Du hast keinen Zuckerwürfel in das Feld gezogen! Passt das so? Dann klicke erneut den WEITER Button.')
      this.setState({
        isOneCubeOk: true
      })
    }else{
      let questions = this.props.questions;
      let tempQuestions = new Map();
      if(questions){
        tempQuestions = fromJS(questions)
      }

      let {question} = this.props;
      let num = question.nr;
      tempQuestions = tempQuestions.set(num, selectedRadio)
      this.props.setQuestions(tempQuestions.toJS())

      this.setState({
        selectedRadio: '',
        isOneCubeOk: false
      })
      $( ".answer" ).removeClass( "clicked" )

      this.props.nextFunc()
    }

  }

  renderStart(){
    return(
      <Wrapper>
        Das ist der START-screen. <br/>
        Lets start this quiz
        <b>Klicke den Button um das Quiz zu starten:</b>
        <Button text={'Starte das Quiz'} clickFunc={this.handleNextStartEnd}/>
      </Wrapper>
    )
  }

  renderEnd(){
    return(
      <Wrapper>
        Das ist der finish-screen. <br/>
        Nochmal? dann click den button dens hoffentlich bald gibt
        <Button text={'Nochmal?'} clickFunc={this.handleNextStartEnd}/>
      </Wrapper>
    )
  }

  setItemsDropped(itemsDropped){
    this.itemsDropped = itemsDropped;
  }

  getCubeCount(){
    let cubeCount = 0;
    this.itemsDropped.map((v, k) => {
      if(v){
        cubeCount = cubeCount + 1;
      }
      return true; // satisfy arrow func
    })
    console.log('cubeCount', cubeCount);
    return cubeCount.toString();
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

    if(!a){
      return(
        <Wrapper>
          <h3>Frage:</h3>
          <p>{frage}</p>
          <DragAndDrop dropzoneText={question.dropzoneText} numAnswers={question.numAnswers} setItemsDropped={this.setItemsDropped}/>
          <Button text={'Weiter'} clickFunc={this.handleNext}/>
        </Wrapper>
      );
    }
    return(
      <Wrapper>
        <h3>Frage:</h3>
        <p>{frage}</p>
        <AllAnswers onClick={(e) => this.handleClickChange(e)}>
          <AnswerWrapper className={'answer'}>
            <label>{a}</label>
            <input type="radio" name={radioName} value="a" checked={this.state.selectedRadio === 'a'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper className={'answer'}>
            <label>{b}</label>
            <input type="radio" name={radioName} value="b" checked={this.state.selectedRadio === 'b'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper className={'answer'}>
            <label>{c}</label>
            <input type="radio" name={radioName} value="c" checked={this.state.selectedRadio === 'c'} onChange={(e) => this.handleChange(e)} />
          </AnswerWrapper>
          <AnswerWrapper className={'answer'}>
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

Question.propTypes = {
  nextFunc: PropTypes.func
};

Question.defaultProps = {
  nextFunc: null
};

const mapDispatchToProps = dispatch => ({
  setQuestions: questions => dispatch(setQuestions(questions))
})

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions()
})
export default connect(mapStateToProps, mapDispatchToProps)(Question);
