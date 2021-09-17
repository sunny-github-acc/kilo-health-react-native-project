import { CreateEventHeader } from '@components/headers/CreateEventHeader';
import { EditProfileHeader } from '@components/headers/EditProfileHeader';
import { EventHeader } from '@components/headers/EventHeader';
import { MemberCardHeader } from '@components/headers/MemberCardHeader';
import { UpdateImageHeader } from '@components/headers/UpdateImageHeader';
import {
  AppBarHeader,
  ChangePasswordHeader,
  DeleteAccountHeader,
  GenericHeader,
  UpdateEmailHeader,
} from '@components/index';
import Chat from '@containers/ChatFlow/Chat';
import ChangePassword from '@containers/ProfileFlow/ChangePassword';
import DeleteAccount from '@containers/ProfileFlow/DeleteAccount';
import EditProfile from '@containers/ProfileFlow/EditProfile';
import CreateEvent from '@containers/EventsFlow/CreateEvent';
import Event from '@containers/EventsFlow/Event';
import SearchLocation from '@containers/EventsFlow/SearchLocation';
import MemberProfile from '@containers/MembersFlow/MemberProfile';
import MemberSearch from '@containers/MembersFlow/MemberSearch';
import Settings from '@containers/ProfileFlow/Settings';
import UpdateEmail from '@containers/ProfileFlow/UpdateEmail';
import { UpdateImage } from '@containers/ProfileFlow/UpdateImage';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { selectModal } from '@state/user/UserReducer';
import { MainStackType } from '@typings/navigationTypes';
import { CONSTANTS } from '@utils/constants';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { EventUpdateImageHeader } from '@components/headers/EventUpdateImageHeader';

import BottomTabs from './BottomTabs';
import { ROUTES } from './RouteNames';

const Stack = createStackNavigator<MainStackType>();

const MainStack = memo(() => {
  const modal = useSelector(selectModal);

  return (
    <Stack.Navigator
      headerMode={CONSTANTS.Screen}
      screenOptions={{
        header: function headerFunction({ scene, previous, navigation }) {
          return (
            <AppBarHeader
              descriptor={scene.descriptor}
              previous={previous}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.Events}
        component={BottomTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return { headerTitle: routeName };
        }}
      />

      <Stack.Screen
        name={ROUTES.EditProfile}
        component={EditProfile}
        options={() => ({
          header: function headerFunction() {
            return <EditProfileHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.Settings}
        component={Settings}
        options={() => ({
          header: function headerFunction() {
            return (
              <GenericHeader
                route={ROUTES.Profile}
                title={CONSTANTS.Settings}
              />
            );
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.UpdateEmail}
        component={UpdateEmail}
        options={() => ({
          header: function headerFunction() {
            return <UpdateEmailHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.ChangePassword}
        component={ChangePassword}
        options={() => ({
          header: function headerFunction() {
            return <ChangePasswordHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.DeleteAccount}
        component={DeleteAccount}
        options={() => ({
          header: function headerFunction() {
            return <DeleteAccountHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.UpdateImage}
        component={UpdateImage}
        options={() => ({
          header: function headerFunction() {
            return <UpdateImageHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.EventUpdateImage}
        component={UpdateImage}
        options={() => ({
          header: function headerFunction() {
            return <EventUpdateImageHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.MemberProfile}
        component={MemberProfile}
        options={() => ({
          header: function headerFunction() {
            return <MemberCardHeader path={ROUTES.Members} />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.MemberSearch}
        component={MemberSearch}
        options={() => ({
          header: () => null,
        })}
      />

      <Stack.Screen
        name={ROUTES.CreateEvent}
        component={CreateEvent}
        options={() => ({
          header: function headerFunction() {
            if (modal) return null;
            return <CreateEventHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.SearchLocation}
        component={SearchLocation}
        options={() => ({
          header: function headerFunction() {
            return <GenericHeader title={CONSTANTS.SearchLocation} />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.Event}
        component={Event}
        options={() => ({
          header: function headerFunction() {
            return <EventHeader />;
          },
        })}
      />

      <Stack.Screen
        name={ROUTES.Chat}
        component={Chat}
        options={() => ({
          header: function headerFunction() {
            return <MemberCardHeader path={ROUTES.Chats} />;
          },
        })}
      />
    </Stack.Navigator>
  );
});

MainStack.displayName = 'MainStack';

export default MainStack;
