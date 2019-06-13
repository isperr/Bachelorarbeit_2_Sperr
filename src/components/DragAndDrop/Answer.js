import styled from 'styled-components';
import {WHITE} from '../../styles/variables'

const Answer = styled.div`
  transform: translate(0px,0px);
  transition: background-color 0.3s;
  padding: 0.5rem;
  border-radius: 0.75rem;
  color: ${WHITE};
  filter: drop-shadow(-2px 3px 5px #6f6f6f);
`;

export default Answer;
