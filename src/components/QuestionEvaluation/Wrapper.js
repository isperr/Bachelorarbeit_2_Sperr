import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: ${props => props.display}
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

export default Wrapper;
