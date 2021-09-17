import { Divider } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.white20};
  padding: 1px;
  width: 100%;
  opacity: 0.7;
`;
