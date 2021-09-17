import { SnackbarError, SnackbarSuccess } from '@components/index';
import Login from '@containers/AuthFlow/Login';
import Signup from '@containers/AuthFlow/SignUp';
import Welcome from '@containers/AuthFlow/Welcome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { checkAuth, selectIsSyncing } from '@state/auth/AuthReducer';
import { selectUID } from '@state/user/UserReducer';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../components/loaders/Loader';
import { DrawerContent } from './DrawerContent';
import MainStack from './MainStack';
import { ROUTES } from './RouteNames';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const Navigator = memo(() => {
  const dispatch = useDispatch();

  const { isSyncingMain } = useSelector(selectIsSyncing);
  const uid = useSelector(selectUID);

  const mainNavigator = () => (
    <Drawer.Navigator drawerContent={props => <DrawerContent props={props} />}>
      <Drawer.Screen name={ROUTES.Events} component={MainStack} />
    </Drawer.Navigator>
  );

  const authNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES.Welcome} component={Welcome} />
      <Stack.Screen name={ROUTES.Signup} component={Signup} />
      <Stack.Screen name={ROUTES.Login} component={Login} />
    </Stack.Navigator>
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  if (isSyncingMain) return <Loader />;

  return (
    <NavigationContainer>
      {uid ? mainNavigator() : authNavigator()}

      <SnackbarSuccess />
      <SnackbarError />
    </NavigationContainer>
  );
});

Navigator.displayName = 'Navigator';

export default Navigator;
