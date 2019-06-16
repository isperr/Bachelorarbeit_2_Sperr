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

let headerImg = '';

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
    this.createAnswers = this.createAnswers.bind(this);
    this.getImg = this.getImg.bind(this);
    this.state = {
      selectedRadio: '',
      isOneCubeOk: false
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

  createAnswers(radioName, answers, images){
    let tempList = []
    let imgMap = fromJS(images);
    imgMap.map((v, k) => {
      console.log('v: ' + v + ', k: '+ k)
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
        radioName = 'q' + question.nr,
        images = question.images,
        header = images.header ? images.header : '';
        console.log('header', header)

        if(!this.props.isStartEnd){
          console.log('uisadh')
          if(a){
            this.createAnswers(radioName, [a, b, c, d], images);
          }
        }

        let headerImg = header !== '' ? <HeaderImg src={this.getImg(header)} alt='' /> : null;

    if(!a){
      return(
        <Wrapper>
          <h3>Frage:</h3>
          <p>{frage}</p>
          <img style={{height: '7rem'}} src={cola} alt=''/>
          <DragAndDrop dropzoneText={question.dropzoneText} numAnswers={question.numAnswers} setItemsDropped={this.setItemsDropped}/>
          <Button text={'Weiter'} clickFunc={this.handleNext}/>
        </Wrapper>
      );
    }
    return(
      <Wrapper>
        <h3>Frage:</h3>
        <p>{frage}</p>
        {headerImg}
        <AllAnswers onClick={(e) => this.handleClickChange(e)}>
          {this.answerList}
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
