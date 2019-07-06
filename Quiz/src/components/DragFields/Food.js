import styled from 'styled-components';

const Food = styled.img`
  margin: 0.5rem;
  height: 5.5rem;
  border-radius: 1rem;
  filter: drop-shadow(0px 3px 9px #6f6f6f);
  &:hover{
    cursor: move;
  }
`;

export default Food;
