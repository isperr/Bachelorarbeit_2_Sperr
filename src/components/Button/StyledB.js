import styled from 'styled-components';
import {YELLOW} from '../../styles/variables';

const StyledB = styled.button`
  background: ${YELLOW};
  padding: 1em;
  border: none;
  border-radius: 1.5em;
  box-shadow: 0 9px #999;
  /* box-shadow: 1px 8px 4px #999; */
  outline: none;

  :hover{
  }

  :active {
    box-shadow: 0 5px #666;
    transform: translateY(3px);
  }
`;

export default StyledB;
