import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: space-between;
    justify-content: center;
  }
`;

export default Wrapper;
