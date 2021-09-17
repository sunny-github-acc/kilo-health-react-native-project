import { KeyboardAvoidingView, View } from 'react-native';
import styled from 'styled-components/native';

export const ViewWidth = styled.View`
  width: 100%;
`;

export const ViewMargin = styled.View`
  margin: 10px;
`;

export const ViewMargin05 = styled.View`
  margin: 5px;
`;

export const ViewMargin20 = styled.View`
  margin: 20px;
`;

export const ViewMarginVertical = styled.View`
  margin-vertical: 10px;
`;

export const ViewMarginVertical05 = styled.View`
  margin-vertical: 5px;
`;

export const ViewMarginVertical20 = styled.View`
  margin-vertical: 20px;
`;

export const ViewMarginHorizontal = styled.View`
  margin-horizontal: 10px;
`;

export const ViewMarginHorizontal05 = styled.View`
  margin-horizontal: 5px;
`;

export const ViewMarginHorizontal20 = styled.View`
  margin-horizontal: 20px;
`;

export const ViewPadding = styled.View`
  padding: 10px;
`;

export const ViewPaddingVertical = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ViewPaddingHorizontal = styled.View`
  padding-right: 10px;
  padding-left: 10px;
`;

export const ViewPaddingLeft = styled.View`
  padding-left: 10px;
`;

export const ViewPaddingRight = styled.View`
  padding-right: 10px;
`;

export const ViewCentered = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ViewSpaceBetween = styled(View)`
  justify-content: space-between;
`;

export const ViewRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ViewRowNoWrap = styled(ViewRow)`
  flex-wrap: nowrap;
`;

export const ViewRowCenteredHorizontal = styled(ViewRow)`
  justify-content: center;
`;

export const ViewRowCenteredVertical = styled(ViewRow)`
  align-items: center;
`;

export const ViewRowCentered = styled(ViewRowCenteredVertical)`
  justify-content: center;
`;

export const ViewRowCenteredNoWrap = styled(ViewRowCentered)`
  flex-wrap: nowrap;
`;

export const ViewRowSpaceAround = styled(ViewRow)`
  justify-content: space-around;
`;

export const ViewRowSpaceBetween = styled(ViewRow)`
  justify-content: space-between;
  align-items: center;
`;

export const ViewHeader = styled(ViewRowSpaceBetween)`
  flex: 1;
  margin-right: 20px;
`;

export const ViewRowSpaceBetweenVertical = styled(ViewRowSpaceBetween)`
  align-items: center;
`;

export const ViewRowRight = styled(ViewRow)`
  justify-content: flex-end;
`;

export const ViewLeft = styled.View`
  align-items: flex-start;
`;

export const ViewMarginLeft = styled(ViewMargin)`
  align-items: flex-start;
`;

export const ViewRight = styled.View`
  align-items: flex-end;
`;

export const ViewSecondary = styled(View)`
  background: ${props => props.theme.colors.secondary};
`;

export const KeyboardAvoidingViewComponent = styled(KeyboardAvoidingView)`
  flex: 1;
`;

export const ViewFlex1 = styled.View`
  flex: 1;
`;

export const ViewAlignSelfCentered = styled.View`
  align-self: center;
`;
