import styled from 'styled-components';
import {YELLOW} from '../../styles/variables';

const QuestionWrapper = styled.div`
  background: ${YELLOW};
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 1rem;
  background: ${props => props.background}
`;

export default QuestionWrapper;
