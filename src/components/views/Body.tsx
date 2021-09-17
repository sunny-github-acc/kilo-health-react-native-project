import { selectTheme } from '@state/theme/ThemeReducer';
import React, { memo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

export const Body = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyView
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyView>
  );
});

export const BodyCentered = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyViewCentered
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyViewCentered>
  );
});

export const BodySpaceAround = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyViewSpaceAround
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyViewSpaceAround>
  );
});

export const BodySpaceBetween = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyViewSpaceBetween
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyViewSpaceBetween>
  );
});

export const BodyOpacity = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyViewOpacity
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyViewOpacity>
  );
});

export const BodyOpacitySmall = memo(({ children }) => {
  const theme = useSelector(selectTheme);

  return (
    <BodyViewOpacitySmall
      colors={[
        theme.colors.primary,
        theme.colors.primary10,
        theme.colors.primary20,
      ]}
    >
      {children}
    </BodyViewOpacitySmall>
  );
});

export const BodyLoader = memo(() => {
  const theme = useSelector(selectTheme);

  return (
    <>
      <BodyViewOpacitySmall
        colors={[
          theme.colors.primary,
          theme.colors.primary10,
          theme.colors.primary20,
        ]}
      >
        <ActivityIndicatorVisible
          animating={true}
          color={theme.colors.white20}
        />
      </BodyViewOpacitySmall>

      {/* <ViewAbsolute>
        <ActivityIndicator animating={true} color={theme.colors.white20} />
      </ViewAbsolute> */}
    </>
  );
});

Body.displayName = 'Body';
BodyCentered.displayName = 'BodyCentered';
BodySpaceAround.displayName = 'BodySpaceAround';
BodySpaceBetween.displayName = 'BodySpaceBetween';
BodyOpacity.displayName = 'BodyOpacity';
BodyOpacitySmall.displayName = 'BodyOpacitySmall';
BodyLoader.displayName = 'BodyLoader';

const BodyView = styled(LinearGradient)`
  background: ${props => props.theme.colors.primary};
  width: 100%;
  height: 100%;
`;

const BodyViewCentered = styled(BodyView)`
  justify-content: center;
`;

const BodyViewSpaceAround = styled(BodyView)`
  justify-content: space-around;
`;

const BodyViewSpaceBetween = styled(BodyView)`
  justify-content: space-between;
`;

const BodyViewOpacity = styled(BodyView)`
  background: ${props => props.theme.colors.primary};
  position: absolute;
  opacity: 0.2;
  z-index: 111;
`;

const BodyViewOpacitySmall = styled(LinearGradient)`
  background: ${props => props.theme.colors.primary};
  position: relative;
  justify-content: center;
  z-index: 111;
  flex: 1;
`;

const ActivityIndicatorVisible = styled(ActivityIndicator)`
  opacity: 1;
`;
