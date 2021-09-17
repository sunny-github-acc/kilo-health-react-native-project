import { DualButton } from '@components/buttons/DualButtons';
import {
  Body,
  ViewCentered,
  ViewMargin,
  ViewMargin20,
} from '@components/index';
import { ROUTES } from '@routes/RouteNames';
import { selectIsSyncing } from '@state/auth/AuthReducer';
import { selectEventImage, setEventImage } from '@state/events/EventsReducer';
import { selectImage, setImageTemp } from '@state/user/UserReducer';
import { CONSTANTS } from '@utils/constants';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

interface PropsInterface {
  route?: { params: { route: string } };
}

interface ResponseInterface {
  assets: { uri: string }[];
}

export const UpdateImage = memo((props: PropsInterface) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isSyncingImage } = useSelector(selectIsSyncing);
  const userImage = useSelector(selectImage);
  const eventImage = useSelector(selectEventImage);

  const route = props?.route?.params?.route;

  let image: string;

  if (route === ROUTES.CreateEvent) {
    image = eventImage?.uri;
  } else {
    image = userImage?.temp ? userImage.temp : userImage.uri;
  }

  const handleResponse = ({ assets }: ResponseInterface) => {
    if (assets) {
      if (route === ROUTES.CreateEvent) {
        dispatch(setEventImage({ uri: assets[0].uri, name: null }));
      } else {
        dispatch(setImageTemp(assets[0].uri));
      }
    }
  };

  const handlePress = useCallback((type, options) => {
    if (type === CONSTANTS.Capture) {
      launchCamera(options, handleResponse);
    } else {
      launchImageLibrary(options, handleResponse);
    }
  }, []);

  return (
    <Body>
      <ScrollView>
        <ViewMargin>
          <ViewCentered>
            <ViewMarginStyled>
              <ImageStyled
                resizeMode={CONSTANTS.Cover}
                resizeMethod={CONSTANTS.Scale}
                source={{ uri: image }}
              />
            </ViewMarginStyled>
          </ViewCentered>

          {actions.map(({ title, type, options }) => (
            <DualButton
              onPress={() => handlePress(type, options)}
              title={t('profile:' + title)}
              value={CONSTANTS.CameraPlus}
              icon={true}
              chevron={false}
              key={title}
              disabled={isSyncingImage}
            />
          ))}
        </ViewMargin>
      </ScrollView>
    </Body>
  );
});

UpdateImage.displayName = 'UpdateImage';

interface Action {
  title: string;
  type: CONSTANTS.Capture | CONSTANTS.Library;
  options: CameraOptions | ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: CONSTANTS.TakeImage,
    type: CONSTANTS.Capture,
    options: {
      saveToPhotos: true,
      mediaType: CONSTANTS.Photo,
      includeBase64: false,
    },
  },
  {
    title: CONSTANTS.SelectImage,
    type: CONSTANTS.Library,
    options: {
      maxHeight: 400,
      maxWidth: 400,
      selectionLimit: 0,
      mediaType: CONSTANTS.Photo,
      includeBase64: false,
    },
  },
];

interface ImageLibraryOptions {
  selectionLimit?: number;
  mediaType: MediaType;
  maxWidth?: number;
  maxHeight?: number;
  quality?: PhotoQuality;
  videoQuality?: AndroidVideoOptions | iOSVideoOptions;
  includeBase64?: boolean;
}

interface CameraOptions
  extends Omit<ImageLibraryOptions, CONSTANTS.SelectionLimit> {
  durationLimit?: number;
  saveToPhotos?: boolean;
  cameraType?: CameraType;
}

type PhotoQuality = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

type CameraType = 'back' | 'front';
type MediaType = 'photo' | 'video' | 'mixed';
type AndroidVideoOptions = 'low' | 'high';
type iOSVideoOptions = 'low' | 'medium' | 'high';

const ImageStyled = styled(Image)`
  width: 300px;
  height: 300px;
  border-radius: 200px;
`;

const ViewMarginStyled = styled(ViewMargin20)`
  border: 1.2px solid ${props => props.theme.colors.white20};
  width: 302.4px;
  height: 302.4px;
  border-radius: 200px;
`;
