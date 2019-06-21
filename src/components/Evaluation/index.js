import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Content from './Content';
import Button from '../Button';

class Evaluation extends Component{
  constructor(props){
    super(props);
    this.state = {
      correctGivenAnswerCount: 0
    }
    this.resultList = [];
  }

  componentWillMount(){
    let correctGivenAnswerCount = 0,
        givenAnswers = this.props.givenAnswers,
        correctAnswers = this.props.correctAnswers,
        tempList = [];

    givenAnswers.map((v, k) => {
      let corrAnswer = correctAnswers.get(k);
      console.log('v', v)
      console.log('corrAnswer', corrAnswer)
      if(v === corrAnswer){
        correctGivenAnswerCount = correctGivenAnswerCount + 1;
      }
      tempList.push(
        <div key={k}>
          <h3>Frage: {k} </h3>
          <p>Given: {v}</p>
          <p>Correct: {corrAnswer}</p>
        </div>)
      return true; // satisfy arrow-map
    })

    this.setState({
      correctGivenAnswerCount,
      resultList: tempList
    })
  }

  render(){
    console.log(this.props)
    return(
      <Wrapper>
        <Content>
          Richtige Antworten:
          {this.state.correctGivenAnswerCount}
          {this.state.resultList}
        </Content>
        <b>Willst du das Quiz noch einmal starten?</b>
        <Button text={'Zurück zum Anfang'} clickFunc={this.clickFunc}/>
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
