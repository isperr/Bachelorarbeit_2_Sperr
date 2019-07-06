import styled from 'styled-components';
import {YELLOW} from '../../styles/variables';

const AnswerWrapper = styled.div`
  background: ${YELLOW};
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem auto;
  min-height: 5rem;
  border: 1px solid transparent;

  &:hover{
    cursor: pointer;
  }
`;

export default AnswerWrapper;
