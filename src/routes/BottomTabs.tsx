import Chats from '@containers/ChatFlow/Chats';
import Events from '@containers/EventsFlow/Events';
import Members from '@containers/MembersFlow/Members';
import Profile from '@containers/ProfileFlow/Profile';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  selectFab,
  setEvent,
  setEventImage,
  setFab,
} from '@state/events/EventsReducer';
import { selectTheme } from '@state/theme/ThemeReducer';
import { CONSTANTS } from '@utils/constants';
import { pascalCase } from '@utils/functions/eventsFunctions';
import React, { memo, useCallback, useEffect } from 'react';
import { FAB as Fab, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { ROUTES } from './RouteNames';

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = memo(() => {
  const routeName = getFocusedRouteNameFromRoute(useRoute()) || ROUTES.Events;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isOpen = useIsDrawerOpen();

  const theme = useSelector(selectTheme);
  const isFab = useSelector(selectFab);

  const isMain = routeName === ROUTES.Events;
  const icon = isMain ? CONSTANTS.Plus : CONSTANTS.Message;

  const goToCreateEvent = useCallback(() => {
    navigation.navigate(ROUTES.CreateEvent);

    dispatch(setEventImage(null));
    dispatch(setEvent(null));
    dispatch(setFab(false));
  }, []);

  const goToChat = useCallback(() => {
    navigation.navigate(ROUTES.Chat);

    dispatch(setFab(false));
  }, []);

  useEffect(() => {
    if (isOpen) dispatch(setFab(false));
  }, [isOpen]);

  useEffect(() => {
    isMain && !isOpen ? dispatch(setFab(true)) : dispatch(setFab(false));
  }, [routeName]);

  return (
    <>
      <Tab.Navigator shifting={true}>
        <Tab.Screen
          name={ROUTES.Events}
          component={Events}
          options={{
            tabBarIcon: CONSTANTS.Campfire,
            tabBarColor: theme.colors.secondary,
            title: pascalCase(ROUTES.Gatherings),
          }}
        />

        <Tab.Screen
          name={ROUTES.Members}
          component={Members}
          options={{
            tabBarIcon: CONSTANTS.AccountMultiple,
            tabBarColor: theme.colors.secondary10,
            title: pascalCase(ROUTES.Members),
          }}
        />

        <Tab.Screen
          name={ROUTES.Chats}
          component={Chats}
          options={{
            tabBarIcon: CONSTANTS.Chat,
            tabBarColor: theme.colors.secondary20,
            title: pascalCase(ROUTES.Chats),
          }}
        />

        <Tab.Screen
          name={ROUTES.Profile}
          component={Profile}
          options={{
            tabBarIcon: CONSTANTS.Account,
            tabBarColor: theme.colors.secondary30,
            title: pascalCase(ROUTES.Profile),
          }}
        />
      </Tab.Navigator>

      <Portal>
        <FabStyled
          onPress={isMain ? goToCreateEvent : goToChat}
          visible={isFab}
          icon={icon}
          color={theme.colors.grey40}
        />
      </Portal>
    </>
  );
});

BottomTabs.displayName = 'BottomTabs';

export default BottomTabs;

const FabStyled = styled(Fab)`
  background-color: ${props => props.theme.colors.secondary};
  position: absolute;
  bottom: 100px;
  right: 16px;
`;
