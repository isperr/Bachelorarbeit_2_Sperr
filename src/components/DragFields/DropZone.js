import styled from 'styled-components';
import img from '../../images/basket.png';

const DropZone = styled.div`
  border: 1px solid #333;
  min-height: 15rem;
  height: fit-content
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-style: italic;
  background: url('${img}');
  background-size: cover;
  border-bottom-left-radius: calc(45px * 2);
  border-bottom-right-radius: calc(45px * 2);
`;

export default DropZone;
