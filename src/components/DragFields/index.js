import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import StartZone from './StartZone';
import DropZone from './DropZone';
import DropZoneWrapper from './DropZoneWrapper';
import Food from './Food';
import CategoryWrapper from './CategoryWrapper';
import Category from './Category';
import apple from '../../images/apple.png';
import sweets from '../../images/sweets.png';
import carrot from '../../images/carrot.png';
import donuts from '../../images/donuts.png';
import hotdog from '../../images/hotdog.png';

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
      case 'apple':
        return apple;
      case 'carrot':
        return carrot;
      case 'sweets':
        return sweets;
      case 'donuts':
        return donuts;
      case 'hotdog':
        return hotdog;
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
        <CategoryWrapper>
          <Category>Das ist sehr gut und man kann es jeden Tag essen:</Category>
          <Category>Das kann man problemlos ab und zu essen:</Category>
          <Category>Das sollte man nicht so oft oder gar nicht essen:</Category>
        </CategoryWrapper>
        <DropZoneWrapper>
          <DropZone id={'dropzone-1'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
          </DropZone>
          <DropZone id={'dropzone-2'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
          </DropZone>
          <DropZone id={'dropzone-3'} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
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
