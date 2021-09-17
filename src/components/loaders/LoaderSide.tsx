import { ViewRowCentered } from '@components/index';
import { selectTheme } from '@state/theme/ThemeReducer';
import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const LoaderSide = memo(({ color = null }: { color?: string }) => {
  const theme = useSelector(selectTheme);

  return (
    <ViewCentered>
      <ActivityIndicator
        animating={true}
        color={color || theme.colors.tertiary}
      />
    </ViewCentered>
  );
});

LoaderSide.displayName = 'LoaderSide';

export default LoaderSide;

const ViewCentered = styled(ViewRowCentered)`
  width: 100%;
  height: 100%;
  margin: auto;
  top: 50%;
  position: absolute;
  background: transparent;
  z-index: 999;
`;
