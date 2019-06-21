import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import HeaderImg from './HeaderImg';
import AnswerImg from './AnswerImg';
import AnswerWrapper from '../QuestionComponents/AnswerWrapper';
import AllAnswers from '../QuestionComponents/AllAnswers';
import Button from '../../components/Button';
import CustomToast from '../CustomToast';
import DragAndDrop from '../DragAndDrop';
import Evaluation from '../Evaluation';
import QuestionEvaluation from '../QuestionEvaluation';
import Start from './Start'
import cola from '../../images/cola.png';
import sweet_foods from '../../images/sweet_foods.jpg';
import teeth from '../../images/teeth.jpg';
import vitamins from '../../images/vitamins.jpg';
import burger_fries from '../../images/burger_fries.png';
import chocolate_sweets from '../../images/chocolate_sweets.png';
import fruits_veggies from '../../images/fruits_veggies.png';
import pizza from '../../images/pizza.png';

import $ from 'jquery';

import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux';
import {makeSelectQuestions} from '../../containers/Root/selectors'
import {setQuestions} from '../../containers/Root/actions';

var firstClick = true;
let isNoCubeOk = false;

class Question extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickChange = this.handleClickChange.bind(this);
    this.renderStart = this.renderStart.bind(this);
    this.renderEnd = this.renderEnd.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.checkIfOptionsSelected = this.checkIfOptionsSelected.bind(this);
    this.checkIsNum = this.checkIsNum.bind(this);
    this.showEvaluation = this.showEvaluation.bind(this);
    this.getCubeCount = this.getCubeCount.bind(this);
    this.handleNextStartEnd = this.handleNextStartEnd.bind(this);
    this.setItemsDropped = this.setItemsDropped.bind(this);
    this.createAnswers = this.createAnswers.bind(this);
    this.getImg = this.getImg.bind(this);
    this.state = {
      selectedRadio: '',
      displayEval: 'none',
      buttonText: 'Fertig',
      evaluation: null
    }
    this.cubeCount = 0;
    this.itemsDropped = new Map();
    this.answerList = [];
  }

  getImg(img){
    console.log(img)
    switch (img) {
      case 'sweet_foods':
        return sweet_foods;
      case 'teeth':
        return teeth;
      case 'vitamins':
        return vitamins;
      case 'burger_fries':
        return burger_fries;
      case 'chocolate_sweets':
        return chocolate_sweets;
      case 'fruits_veggies':
        return fruits_veggies;
      case 'pizza':
        return pizza;
      default:
        console.log('no img found');
    }
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
    if(firstClick){
      if(e.target.tagName === 'LABEL'){
        $( ".answer" ).removeClass( "clicked" )
        e.target.parentNode.classList.add("clicked");
        this.setState({
          selectedRadio: e.target.nextSibling.value
        })
      }else if(e.target.tagName === 'IMG'){
        $( ".answer" ).removeClass( "clicked" )
        e.target.parentNode.classList.add("clicked");
        this.setState({
          selectedRadio: e.target.previousSibling.value
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
  }

  handleNextStartEnd(){
    if(this.props.isStartEnd === 'start'){
      this.props.nextFunc()
    }else if(this.props.isStartEnd === 'end'){
      // reset questions map
      let tempQuestions = new Map();
      this.props.setQuestions(tempQuestions.toJS())
      this.props.nextFunc()
    }
  }

  handleNextClick(){
    let selectedRadio = this.state.selectedRadio;

    if(firstClick){
      console.log('This is the firstClick');
      let check = this.checkIfOptionsSelected(selectedRadio),
          optionIsSelected = check.get('optionSelected'),
          toastType = check.get('toastType'),
          toastMsg = check.get('toastMsg');

      if(optionIsSelected){
        firstClick = false;
        console.log('AUSWERTUNG FOLGT!');
        this.showEvaluation();
      }else{
        CustomToast(toastType, toastMsg);
      }
    }else{
      console.log('SECOND CLICK');
      let questions = this.props.questions;
      let tempQuestions = new Map();
      if(questions){
        tempQuestions = fromJS(questions)
      }

      let {question} = this.props;
      let num = question.nr;
      tempQuestions = tempQuestions.set(num, selectedRadio)
      this.props.setQuestions(tempQuestions.toJS())

      // reset firstClick
      firstClick = true;
      isNoCubeOk = false;
      this.setState({
        selectedRadio: '',
        displayEval: 'none',
        buttonText: 'Fertig'
      })
      this.props.nextFunc()
    }
  }

  checkIsNum(answer){
    let res = false;

    if ('0123456789'.indexOf(answer) !== -1) {
      // Is a number
      console.log('is num')
      res = true;
    }

    return res;
  }

  checkIfOptionsSelected(selectedRadio){
    let optionSelected = false,
        toastType = '',
        toastMsg = '',
        selRadio = selectedRadio,
        currAnswer = this.props.question.antwort;

    let answerisNum = this.checkIsNum(currAnswer); // check if correct answer is num - and not a, b, c or d

    if(answerisNum){
      selRadio = this.getCubeCount();
    }

    if(selRadio === ''){
      console.log('DONT GO FURTHER if no option is selected')
      toastType = 'error';
      toastMsg = 'Du musst eine Option auswählen um fortzufahren!';
    }else if(selRadio === '0'){
      if(!isNoCubeOk){ // make sure user is ok with adding e.g. no sugar cubes
        console.log('COLA question')
        toastType = 'warning';
        toastMsg = 'Du hast keinen Zuckerwürfel in das Feld gezogen! Passt das so? Dann klicke erneut den WEITER Button.';
        isNoCubeOk = true;
        this.setState({
          selectedRadio: selRadio
        })
      }else{
        optionSelected = true;
      }
    }else{
      optionSelected = true;
    }

    let resultMap = new Map({
      optionSelected: optionSelected,
      toastType: toastType,
      toastMsg: toastMsg
    })

    return resultMap;
  }

  showEvaluation(){
    console.log('show Evaluation')
    console.log(this.props)
    let correctAnswer = this.props.question.antwort;
    let answerisNum = this.checkIsNum(correctAnswer); // check if correct answer is num - and not a, b, c or d
    let givenAnswer = this.state.selectedRadio;

    if(answerisNum){
      givenAnswer = this.getCubeCount();
      let children = $('#answer-wrapper').children();
      children.removeClass('drag-drop')
    }

    let evaluation = '';
    console.log('corrAnswer: ' + correctAnswer + ' - givenAnswer: ' + givenAnswer)

    if(correctAnswer !== givenAnswer){
      $('.clicked').css('background', 'orangered')
      if(answerisNum){
        evaluation = `Schade, deine Antwort war leider nicht richtig! Richtig wäre die Zahl ${correctAnswer}!`;
      }else{
        evaluation = `Schade, deine Antwort war leider nicht richtig! Richtig wäre Antwort ${correctAnswer} - ${this.props.question[correctAnswer]}!`
      }
    }else{
      $('.clicked').css('background', 'yellowgreen')
      evaluation = 'Super! Du hast diese Frage richtig beantwortet.'
    }

    this.setState({
      evaluation: evaluation,
      displayEval: 'flex',
      buttonText: 'Weiter'
    })
  }

  renderStart(){
    return(
      <Start clickFunc={this.handleNextStartEnd}/>
    )
  }

  renderEnd(){
    return(
      <Evaluation correctAnswers={this.props.answerMap} givenAnswers={new Map(this.props.questions)} clickFunc={this.handleNextStartEnd}/>
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

  createAnswers(radioName, answers, images){
    let tempList = []
    let imgMap = fromJS(images);
    imgMap.map((v, k) => {
      console.log('v: ' + v + ', k: '+ k)
      return true; // satisfy arrow-func
    })
    console.log('createAnswers')

    let letters = ['a', 'b', 'c', 'd']
    for(let i = 0; i < answers.length; i++){
      let currAnswer = answers[i];
      let answerName = letters[i];

      let imgName = imgMap.get(answerName);

      if(currAnswer){// if answer a, b, c, d exists
        let answerImg = imgName ? <AnswerImg src={this.getImg(imgName)} alt='' /> : null;
        tempList.push(
          <AnswerWrapper className={'answer'} key={currAnswer}>
            <label>{currAnswer}</label>
            <input type="radio" name={radioName} value={answerName} checked={this.state.selectedRadio === answerName} onChange={(e) => this.handleChange(e)} />
            {answerImg}
          </AnswerWrapper>);
      }
    }

    this.answerList = tempList;
  }

  render(){
    let {isStartEnd, question} = this.props;
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
    let frage = question.frage,
        a = question.a,
        b = question.b,
        c = question.c,
        d = question.d,
        radioName = 'q' + question.nr,
        images = question.images,
        header = images.header ? images.header : '';

    if(!this.props.isStartEnd){
      if(a){
        this.createAnswers(radioName, [a, b, c, d], images);
      }
    }

    let headerImg = header !== '' ? <HeaderImg src={this.getImg(header)} alt='' /> : null;
    let {displayEval, evaluation, buttonText} = this.state;

    if(!a){
      return(
        <Wrapper id={'question'}>
          <h3>Frage:</h3>
          <p>{frage}</p>
          <img style={{height: '7rem'}} src={cola} alt=''/>
          <DragAndDrop dropzoneText={question.dropzoneText} numAnswers={question.numAnswers} setItemsDropped={this.setItemsDropped}/>
          <Button text={buttonText} clickFunc={this.handleNextClick}/>
          <QuestionEvaluation id={'question-evaluation'} display={displayEval} evaluation={evaluation}/>
        </Wrapper>
      );
    }
    return(
      <Wrapper id={'question'}>
        <h3>Frage:</h3>
        <p>{frage}</p>
        {headerImg}
        <AllAnswers onClick={(e) => this.handleClickChange(e)}>
          {this.answerList}
        </AllAnswers>
        <br/>
        <Button text={buttonText} clickFunc={this.handleNextClick}/>
        <QuestionEvaluation id={'question-evaluation'} display={displayEval} evaluation={evaluation}/>
      </Wrapper>
    );
  }
}

Question.propTypes = {
  nextFunc: PropTypes.func,
  isStartEnd: PropTypes.string,
  question: PropTypes.object,
  answerMap: PropTypes.instanceOf(Map),

};

Question.defaultProps = {
  nextFunc: null,
  isStartEnd: '',
  question: {},
  answerMap: new Map()
};

const mapDispatchToProps = dispatch => ({
  setQuestions: questions => dispatch(setQuestions(questions))
})

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions()
})
export default connect(mapStateToProps, mapDispatchToProps)(Question);
