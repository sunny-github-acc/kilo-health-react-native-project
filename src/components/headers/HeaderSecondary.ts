import { Appbar } from 'react-native-paper';
import styled from 'styled-components';

export const HeaderSecondary = styled(Appbar.Header)`
  background: ${props => props.theme.colors.secondary};
`;
