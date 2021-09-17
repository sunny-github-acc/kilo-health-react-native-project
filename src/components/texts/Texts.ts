import { Text } from 'react-native';
import styled from 'styled-components/native';

export const TextPrimary = styled(Text)`
  font-weight: ${props => props.theme.fonts.weight.bold};
  font-size: ${props => props.theme.fonts.size.m};
  color: ${props => props.theme.colors.white20};
  text-align: center;
`;

export const TextPrimaryRegular = styled(TextPrimary)`
  font-weight: ${props => props.theme.fonts.weight.regular};
`;

export const TextSecondary = styled(TextPrimary)`
  color: ${props => props.theme.colors.secondary};
`;

export const TextTertiary = styled(TextPrimary)`
  color: ${props => props.theme.colors.tertiary};
`;

export const TextBig = styled(TextPrimary)`
  font-size: ${props => props.theme.fonts.size.l};
`;

export const TextSmall = styled(TextPrimary)`
  font-size: ${props => props.theme.fonts.size.s};
  color: ${props => props.theme.colors.white20};
  font-weight: ${props => props.theme.fonts.weight.regular};
`;

export const TextSmallMargin = styled(TextSmall)`
  margin: 10px;
`;

export const TextSmallBold = styled(TextSmall)`
  font-weight: ${props => props.theme.fonts.weight.bold};
`;

export const TextSmallTertiary = styled(TextTertiary)`
  font-size: ${props => props.theme.fonts.size.s};
  font-weight: ${props => props.theme.fonts.weight.regular};
`;

export const TextLeft = styled.Text`
  text-align: left;
`;
