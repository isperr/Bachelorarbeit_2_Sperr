import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import './Root.css';
import HomeScreen from '../HomeScreen';

 class Root extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
   }

   render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <HomeScreen />
        </div>
      </Provider>
    );
  }
}

 Root.propTypes = {
  store: PropTypes.object.isRequired
}

 export default Root
