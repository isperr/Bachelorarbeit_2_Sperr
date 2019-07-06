import styled from 'styled-components';

const LinkButton = styled.button`
  background: none;
  border: none;
  font-size: large;
  color: #333;
  text-decoration: underline;
  margin-top: 0.25rem;
  outline: none;

  &:hover{
    cursor: pointer;
  }
`;

export default LinkButton;
