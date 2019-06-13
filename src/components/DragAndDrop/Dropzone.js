import styled from 'styled-components';
import {WHITE} from '../../styles/variables'

const Dropzone = styled.div`
  color: ${WHITE};
  background-color: #6f6f6f;
  border: dashed 4px transparent;
  border-radius: 4px;
  /* margin: 10px auto 30px; */
  padding: 10px;
  width: stretch;
  transition: background-color 0.3s;
`;

export default Dropzone;
