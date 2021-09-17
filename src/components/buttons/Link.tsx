import { TextLeft, TextSmall } from '@components/texts/Texts';
import { ViewLeft, ViewMargin } from '@components/views/Views';
import React, { useCallback } from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import i18n from 'i18next';

interface LinkInterface {
  url: string;
  text: string;
}

interface ButtonInterface {
  handlePress: () => void;
  text: string;
}

export const Link = ({ url, text }: LinkInterface) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(i18n.t(`errorMessages:link`) + url);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <ViewLeft>
        <ViewMargin>
          <TextSmall>{text}</TextSmall>
        </ViewMargin>
      </ViewLeft>
    </TouchableOpacity>
  );
};

export const LinkButton = ({ handlePress, text }: ButtonInterface) => (
  <TouchableOpacity onPress={handlePress}>
    <ViewLeft>
      <ViewMargin>
        <TextLeft>
          <TextSmall>{text}</TextSmall>
        </TextLeft>
      </ViewMargin>
    </ViewLeft>
  </TouchableOpacity>
);
