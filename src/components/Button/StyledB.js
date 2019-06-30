import styled from 'styled-components';
import {APPLE_GREEN} from '../../styles/variables';

const StyledB = styled.button`
  background: ${APPLE_GREEN};
  padding: 0.75em 1em;
  margin-bottom: 2em;
  border: none;
  border-radius: 1.5em;
  box-shadow: 0 9px #999999b5;
  /* box-shadow: 1px 8px 4px #999; */
  outline: none;
  font-size: smaller;
  min-width: 7rem;

  :hover{
    cursor: pointer;
  }

  :active {
    box-shadow: 0 5px #666;
    transform: translateY(3px);
  }
`;

export default StyledB;
