import styled from 'styled-components';

const LineText = styled.p`
  position: fixed;
  font-size: small;
  /* bottom: 13rem; */
  margin-top: -0.8rem;
  z-index: 2;
  color: #f6f6f6;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default LineText;
