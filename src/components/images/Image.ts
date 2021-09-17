import { Avatar } from 'react-native-paper';
import styled from 'styled-components';

export const AvatarPrimary = styled(Avatar.Image)`
  background-color: ${props => props.theme.colors.primary};
`;

export const AvatarSecondary = styled(Avatar.Image)`
  background-color: ${props => props.theme.colors.secondary};
`;
