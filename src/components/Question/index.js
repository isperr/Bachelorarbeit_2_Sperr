import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Content from './Content';
import HeaderImg from './HeaderImg';
import AnswerImg from './AnswerImg';
import AnswerWrapper from '../QuestionComponents/AnswerWrapper';
import AllAnswers from '../QuestionComponents/AllAnswers';
import Button from '../../components/Button';
import DragAndDrop from '../DragAndDrop';
import Evaluation from '../Evaluation';
import Start from './Start'
import HelperSection from '../HelperSection';
import DragFields from '../DragFields';
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
    this.setDropzones = this.setDropzones.bind(this);
    this.checkDragAndDrop = this.checkDragAndDrop.bind(this);
    this.state = {
      selectedRadio: '',
      buttonText: 'Fertig',
      evaluation: 'Wähle eine der Antworten aus!',
      heading: '',
      dropzones: {

      }
    }
    this.cubeCount = 0;
    this.itemsDropped = new Map();
    this.answerList = [];
  }

  getImg(img){
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
        $( ".answer" ).removeClass( "clicked" )
        e.target.classList.add("clicked");
        let inputVal = e.target.childNodes[1].value;
        if(inputVal){
          this.setState({
            selectedRadio: inputVal
          })
        }
      }else{
        console.log('clicked on something else', e.target)
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
      let questionType = this.props.question.type,
          check = new Map();

      if(questionType === 'dragfields'){
        check = this.checkDragFields()
      }else if(questionType === 'draganddrop'){
        check = this.checkDragAndDrop(selectedRadio)
      }else{
        check = this.checkIfOptionsSelected(selectedRadio)
      }

      let optionIsSelected = check.get('optionSelected'),
          toastType = check.get('toastType'),
          toastMsg = check.get('toastMsg');

      if(optionIsSelected){
        firstClick = false;
        this.showEvaluation();
      }else{
        this.setState({
          evaluation: toastMsg,
          heading: 'Achtung!'
        })
        if(toastType === 'error'){
          $('#bubble').addClass('bubble-danger')
        }
        if(toastType === 'warning'){
          $('#bubble').addClass('bubble-warning')
        }
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
        buttonText: 'Fertig',
        evaluation: 'Wähle eine der Antworten aus!',
        heading: ''
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
        selRadio = selectedRadio;

    if(selRadio === ''){
      console.log('DONT GO FURTHER if no option is selected')
      toastType = 'error';
      toastMsg = 'Du musst eine Option auswählen um fortzufahren!';
    }else{
      optionSelected = true;
      this.setState({
        selectedRadio: selRadio
      })
    }

    let resultMap = new Map({
      optionSelected: optionSelected,
      toastType: toastType,
      toastMsg: toastMsg
    })

    return resultMap;
  }

  checkDragAndDrop(selectedRadio){
    let optionSelected = false,
        toastType = '',
        toastMsg = '',
        selRadio = this.getCubeCount();

    if(selRadio === '0'){
      if(!isNoCubeOk){ // make sure user is ok with adding e.g. no sugar cubes
        console.log('COLA question')
        toastType = 'warning';
        toastMsg = 'Du hast keinen Zuckerwürfel in das Feld gezogen! Passt das so? Dann klicke nochmal auf den FERTIG Button.';
        isNoCubeOk = true;
        this.setState({
          selectedRadio: selRadio
        })
      }else{
        optionSelected = true;
      }
    }else{
      optionSelected = true;
      this.setState({
        selectedRadio: selRadio
      })
    }

    let resultMap = new Map({
      optionSelected: optionSelected,
      toastType: toastType,
      toastMsg: toastMsg
    })

    return resultMap;
  }

  checkDragFields(){
    let allDropped = true,
        toastType = '',
        toastMsg = '',
        dropzones = fromJS(this.state.dropzones);

    dropzones.map((v, k) => {
      console.log("o." + k + " = " + v);
      if(v === '' || v === 'start-dropzone'){
        allDropped = false;
      }
      return true; // satisfy arrow-func
    })

    if(!allDropped){
      toastType = 'error';
      toastMsg = 'Bitte ordne alle Lebensmittel den Kategorien zu um fortzufahren!';
    }else{
      let updatedDropzones = new Map();
      dropzones.map((v, k) => {
        let res = v.split("-");
        updatedDropzones = updatedDropzones.set(k, res[1]);
        return true; // satisfy arrow-func
      })
      this.setState({
        selectedRadio: updatedDropzones.toJS()
      })
    }

    let resultMap = new Map({
      optionSelected: allDropped,
      toastType: toastType,
      toastMsg: toastMsg
    })

    return resultMap;
  }

  showEvaluation(){
    console.log('show Evaluation')
    let correctAnswer = this.props.question.antwort;
    let answerisNum = this.checkIsNum(correctAnswer); // check if correct answer is num - and not a, b, c or d
    let givenAnswer = this.state.selectedRadio;

    if(answerisNum){
      givenAnswer = this.getCubeCount();
      let children = $('#answer-wrapper').children();
      children.removeClass('drag-drop')
    }

    let evaluation = '', heading = '';

    if(correctAnswer !== givenAnswer){
      $('.clicked').css('background', 'orangered')
      heading = 'Schade...'
      if(this.props.question.type === 'draganddrop'){
        evaluation = `... deine Anzahl war leider nicht ganz richtig! Richtig wäre die Zahl ${correctAnswer}!`;
      }else if(this.props.question.type === 'dragfields'){
        evaluation = `... du hast leider ein oder mehrere Dinge nicht richtig zugeordnet.`;
      }else{
        evaluation = `... deine Antwort war leider nicht richtig! Richtig wäre Antwort ${correctAnswer} - ${this.props.question[correctAnswer]}!`
      }
    }else{
      $('.clicked').css('background', 'yellowgreen')
      heading = 'Super!'
      if(this.props.question.type === 'dragfields'){
        evaluation = 'Du hast alle Lebensmittel richtig zugeordnet.';
      }else if(this.props.question.type === 'draganddrop'){
        evaluation = 'Du hast die richtige Anzahl an Würfel getippt.'
      }else{
        evaluation = 'Du hast diese Frage richtig beantwortet.'
      }

    }

    $('#bubble').removeClass('bubble-danger')
    $('#bubble').removeClass('bubble-warning')

    this.setState({
      evaluation: evaluation,
      heading: heading,
      buttonText: 'Weiter'
    })
  }

  renderStart(){
    return(
      <Wrapper>
        <Start clickFunc={this.handleNextStartEnd}/>
        <HelperSection heading={'Hallo!'} text={'Willst du das Quiz starten?'}/>
      </Wrapper>
    )
  }

  renderEnd(){
    return(
      <Wrapper>
        <Evaluation correctAnswers={this.props.answerMap} givenAnswers={new Map(this.props.questions)} clickFunc={this.handleNextStartEnd}/>
        <HelperSection heading={'Das wars schon!'} text={'Hier kannst du noch einmal sehen welche Fragen du richtig beantwortet hast und welche du dir noch einmal ansehen könntest.'}/>
      </Wrapper>
    )
  }

  setItemsDropped(itemsDropped){
    this.itemsDropped = itemsDropped;
    console.log(itemsDropped)
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
    let tempList = [],
        imgMap = fromJS(images),
        letters = ['a', 'b', 'c', 'd'];

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

  setDropzones(updatedDropzones){
    this.setState({
      dropzones: updatedDropzones
    })
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
        type = question.type,
        questionNr = question.nr,
        radioName = 'q' + questionNr,
        images = question.images,
        header = images.header ? images.header : '';

    if(!this.props.isStartEnd){
      if(a){
        this.createAnswers(radioName, [a, b, c, d], images);
      }
    }

    let headerImg = header !== '' ? <HeaderImg src={this.getImg(header)} alt='' /> : null;
    let {evaluation, buttonText, heading} = this.state;

    if(type === 'draganddrop'){
      if(evaluation === 'Wähle eine der Antworten aus!'){
        evaluation = 'Ziehe Würfel in das graue Feld um diese Frage zu beantworten!';
      }
      return(
        <Wrapper id={'question'}>
          <Content>
            <h3>Frage {questionNr}:</h3>
            <p>{frage}</p>
            <img style={{height: '7rem'}} src={cola} alt=''/>
            <DragAndDrop dropzoneText={question.dropzoneText} numAnswers={question.numAnswers} setItemsDropped={this.setItemsDropped}/>
            <Button text={buttonText} clickFunc={this.handleNextClick}/>
          </Content>
          <HelperSection heading={heading} text={evaluation} questionNr={questionNr}/>
        </Wrapper>
      );
    }

    if(type === 'dragfields'){
      if(evaluation === 'Wähle eine der Antworten aus!'){
        evaluation = 'Ziehe alle Lebensmittel in die Körbe!';
      }
      return(
        <Wrapper>
          <Content>
            <DragFields question={question} setDropzones={this.setDropzones}/>
            <Button text={buttonText} clickFunc={this.handleNextClick}/>
          </Content>
          <HelperSection heading={heading} text={evaluation} questionNr={questionNr}/>
        </Wrapper>
      )
    }

    return(
      <Wrapper id={'question'}>
        <Content>
          <h3>Frage {questionNr}:</h3>
          <p>{frage}</p>
          {headerImg}
          <AllAnswers onClick={(e) => this.handleClickChange(e)}>
            {this.answerList}
          </AllAnswers>
          <br/>
          <Button text={buttonText} clickFunc={this.handleNextClick}/>
        </Content>
        <HelperSection heading={heading} text={evaluation} questionNr={questionNr}/>
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
