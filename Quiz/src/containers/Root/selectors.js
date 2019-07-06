import {createSelector} from 'reselect'

const selectGlobal = state => state

const makeSelectQuestions = () =>
  createSelector(selectGlobal, globalState => globalState.get('questions'))

export {
  selectGlobal,
  makeSelectQuestions
}
