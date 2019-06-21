import styled from 'styled-components';
import img from '../../images/back2.jpg';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('${img}');
  background-size: cover;
  min-height: stretch;
  padding-top: 2em;
  padding-bottom: 2em;
  color: #333333;
`;

export default Wrapper;
