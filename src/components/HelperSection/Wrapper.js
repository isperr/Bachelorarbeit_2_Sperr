import styled from 'styled-components';

const Wrapper = styled.div`
  width: 30%;
  /* background: #f0808099; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 2rem;
  margin-right: -3rem;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-right: 0;
  }
`;

export default Wrapper;
