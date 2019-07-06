import React, {Component} from 'react';
import {Map} from 'immutable';
import Wrapper from './Wrapper';
import DivWrapper from './DivWrapper';
import Answer from './Answer';
import Image from './Image';
import Dropzone from './Dropzone';
import interact from 'interactjs';
import PropTypes from 'prop-types';
import img from '../../images/cube.png';

let itemsDropped = new Map();

class DragAndDrop extends Component{
  constructor(props){
    super(props);
    this.dropzoneFunc = this.dropzoneFunc.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.createAnswerDivs = this.createAnswerDivs.bind(this);
    this.handleSetItemsDropped = this.handleSetItemsDropped.bind(this);
    this.state = {
      itemsDropped: new Map()
    }
    this.answerDivs = [];
  }

  componentWillMount(){
    console.log(this.props.numAnswers)
    for(let i = 1; i <= this.props.numAnswers; i++){
      itemsDropped = itemsDropped.set('item'+i, false);
    }
    this.createAnswerDivs(this.props.numAnswers)
  }

  componentDidMount(){
    this.dropzoneFunc();
    this.dragDrop();
  }

  dropzoneFunc(){
    let state = this;
    // enable draggables to be dropped into this
    interact('.dropzone').dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag-drop',
      // Require a 75% element overlap for a drop to be possible
      overlap: 0.75,

      // listen for drop related events:

      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        state.handleSetItemsDropped(draggableElement.id, true)
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        state.handleSetItemsDropped(event.relatedTarget.id, false)
      },
      ondrop: function (event) {
        console.log('drop: ' + event.relatedTarget.textContent)
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
      }
    });
  }

  handleSetItemsDropped(id, isDropped){
    let state = this;
    itemsDropped = itemsDropped.set(id, isDropped);
    state.setState({itemsDropped: itemsDropped})
    state.props.setItemsDropped(itemsDropped);
  }

  dragDrop(){
    interact('.drag-drop')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrict({
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          })
        ],
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        onmove: dragMoveListener
      });
  }

  createAnswerDivs(answers){
    let tempList = []

    for(let i = 0; i < answers; i++){
      let j = i+1;
      tempList.push(<Answer id={'item'+j} className="drag-drop" key={j}><Image src={img}/></Answer>)
    }

    this.answerDivs = tempList;
  }

  render(){
    return(
      <Wrapper id='container'>
        <DivWrapper id={'answer-wrapper'}>
          {this.answerDivs}
        </DivWrapper>
        <Dropzone id="outer-dropzone" className="dropzone">
          {this.props.dropzoneText}
        </Dropzone>
      </Wrapper>
    );
  }
}

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

DragAndDrop.propTypes = {
  setItemsDropped: PropTypes.func,
  dropzoneText: PropTypes.string,
  numAnswers: PropTypes.number
};

DragAndDrop.defaultProps = {
  setItemsDropped: null,
  dropzoneText: 'Deine Antwort:',
  numAnswers: 3
};

export default DragAndDrop;
