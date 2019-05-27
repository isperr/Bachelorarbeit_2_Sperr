import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import Wrapper from './Wrapper';
import Button from '../../components/Button';

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
    }else{
      console.log(e.target)
    }
  }

  handleNext(){
    if(this.props.isStartEnd !== 'start'){
      if(this.state.selectedRadio === ''){
        console.log('DONT GO FURTHER if no option is selected')
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

    if(this.props.isStartEnd === 'start'){
      this.props.nextFunc()
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
        <div onClick={(e) => this.handleClickChange(e)}>
          <div>
            <label>{a}</label>
            <input type="radio" name={radioName} value="a" checked={this.state.selectedRadio === 'a'} onChange={(e) => this.handleChange(e)} />
          </div>
          <div>
            <label>{b}</label>
            <input type="radio" name={radioName} value="b" checked={this.state.selectedRadio === 'b'} onChange={(e) => this.handleChange(e)} />
          </div>
          <div>
            <label>{c}</label>
            <input type="radio" name={radioName} value="c" checked={this.state.selectedRadio === 'c'} onChange={(e) => this.handleChange(e)} />
          </div>
          <div>
            <label>{d}</label>
            <input type="radio" name={radioName} value="d" checked={this.state.selectedRadio === 'd'} onChange={(e) => this.handleChange(e)} />
          </div>
        </div>
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
