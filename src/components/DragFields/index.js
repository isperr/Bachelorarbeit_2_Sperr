import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import StartZone from './StartZone';
import DropZone from './DropZone';
import DropZoneWrapper from './DropZoneWrapper';
import Food from './Food';
import fruits_veggies from '../../images/fruits_veggies.png';
import chocolate_sweets from '../../images/chocolate_sweets.png';
import burger_fries from '../../images/burger_fries.png';
import pizza from '../../images/pizza.png';

class DragFields extends Component{
  constructor(props){
    super(props);
    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.drag = this.drag.bind(this);
    this.getImg = this.getImg.bind(this);
    this.createImages = this.createImages.bind(this);
    this.state = {
      dropzones: {

      }
    }
    this.imgList = [];
  }

  drop(e) {
    e.preventDefault();
    let itemID = e.dataTransfer.getData("text"),
        dropZone = '',
        dropzones = this.state.dropzones;

    if(e.target.tagName === 'IMG'){
      dropZone = e.target.parentNode.id;
    }else{
      dropZone = e.target.id;
    }

    if(dropZone === dropzones[itemID]){
    }else{
      e.target.appendChild(document.getElementById(itemID));
      this.handleSetDropzones(itemID, dropZone)
    }
  }

  handleSetDropzones(itemID, dropZone){
    let dropzones = this.state.dropzones
    dropzones[itemID] = dropZone;
    this.props.setDropzones(dropzones);
  }

  allowDrop(e){
    if(e.target.tagName !== 'IMG'){
      e.preventDefault();
      e.dataTransfer.dropEffect = "move"
    }
  }

  drag(e) {
    e.dataTransfer.setData("text", e.target.id);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.cursor = "move";
  }

  getImg(img){
    switch (img) {
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

  createImages(){
    let images = this.props.question.images,
        tempList = [],
        dropzones = this.state.dropzones;

    for (let i of images) {
      tempList.push(<Food src={this.getImg(i)} id={i} key={i} draggable={true} onDragStart={(e) => this.drag(e)}/>)
      dropzones[i] = 'start-dropzone';
    }

    this.imgList = tempList;
    this.props.setDropzones(dropzones);
  }

  componentWillMount(){
    this.createImages()
  }

  render(){
    let question = this.props.question;
    let frage = question.frage,
        questionNr = question.nr;

    return(
      <Wrapper>
        <h3>Frage {questionNr}:</h3>
        <p>{frage}</p>
        <StartZone id={"start-dropzone"} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
          {this.imgList}
        </StartZone>
        <DropZoneWrapper>
          <DropZone id={'dropzone-1'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
            Das ist sehr gut und man kann es immer essen:
          </DropZone>
          <DropZone id={'dropzone-2'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
            Das kann man ab und zu essen:
          </DropZone>
          <DropZone id={'dropzone-3'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
            Das sollte man nicht so oft oder gar nicht essen:
          </DropZone>
        </DropZoneWrapper>
      </Wrapper>
    );
  }
}

DragFields.propTypes = {
  question: PropTypes.object,
  setDropzones: PropTypes.func
};

DragFields.defaultProps = {
  question: {},
  setDropzones: null
};

export default DragFields;
