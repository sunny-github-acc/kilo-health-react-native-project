import DeviceInfo from 'react-native-device-info';

const ENV = process.env.APP_ENV || 'STAGING';

const COMMON_SETTINGS = {
  BUNDLE_VERSION: process.env.BUNDLE_VERSION || DeviceInfo.getBuildNumber(),
  APP_VERSION: DeviceInfo.getVersion(),
  APP_STORE_LINK: 'https://apps.apple.com/us/app/',
  PLAY_STORE_LINK: 'market://details?id=com.',
  TERMS_AND_CONDITION_LINK: '',
  PRIVACY_POLICY_LINK: '',
} as const;

const configs = {
  DEVELOPMENT: {
    ...COMMON_SETTINGS,
    ENV: 'DEVELOPMENT',
    APP_VERSION: DeviceInfo.getVersion(),
    BASE_URL: '',
    GOOGLE_PAY_MERCHANT: '',
    APPLE_PAY_MERCHANT_ID: 'merchant.com.',
    APPLE_PAY_MERCHANT_NAME: '',
    BRAINTREE_TOKEN: 'sandbox_token',
  },
  STAGING: {
    ...COMMON_SETTINGS,
    ENV: 'STAGING',
    APP_VERSION: DeviceInfo.getVersion(),
    BASE_URL: '',
    GOOGLE_PAY_MERCHANT: '',
    APPLE_PAY_MERCHANT_ID: 'merchant.com.',
    APPLE_PAY_MERCHANT_NAME: '',
    BRAINTREE_TOKEN: 'sandbox_token',
  },
  PRODUCTION: {
    ...COMMON_SETTINGS,
    ENV: 'PRODUCTION',
    APP_VERSION: DeviceInfo.getVersion(),
    BASE_URL: '',
    GOOGLE_PAY_MERCHANT: '',
    APPLE_PAY_MERCHANT_ID: 'merchant.com.',
    APPLE_PAY_MERCHANT_NAME: '',
    BRAINTREE_TOKEN: 'production_token',
  },
};

export const modifyApiUrl = (jsonUrls: string) => {
  const urls = JSON.parse(jsonUrls);
  configs.STAGING.BASE_URL = urls.STAGING.BASE_URL;
  configs.PRODUCTION.BASE_URL = urls.PRODUCTION.BASE_URL;
};

export const config = configs[ENV as keyof typeof configs];
