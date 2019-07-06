/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {Map} from 'immutable';

// The initial state of the App
const initialState = new Map({
  questions: null
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      console.log(action.questions)
      return state
        .set('questions', action.questions)
    // case LOAD_PRODUCTS_ERROR:
    //   return state
    //     .set('error', action.error)
    //     .set('loading', false)
    default:
      return state
  }
}

export default globalReducer
