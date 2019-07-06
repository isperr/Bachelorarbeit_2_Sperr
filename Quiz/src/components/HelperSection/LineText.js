import styled from 'styled-components';

const LineText = styled.p`
  font-size: small;
  margin-top: .7rem;
  z-index: 2;
  color: #f6f6f6;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export default LineText;
