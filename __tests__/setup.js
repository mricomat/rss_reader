/* eslint-disable react/display-name */
import 'react-native-gesture-handler/jestSetup';
import * as ReactNative from 'react-native';

jest.doMock('react-native', () =>
  Object.setPrototypeOf(
    {
      Platform: ReactNative.Platform,
      // Platform: ReactNative.,
      NativeModules: {
        ...ReactNative.NativeModules,
        RNFBAdMobModule: {},
        RNFBAdMobInterstitialModule: {},
        RNFBAdMobRewardedModule: {},
        RNFBAdsConsentModule: {},
        RNFBAppModule: {
          NATIVE_FIREBASE_APPS: [
            {
              appConfig: {
                name: '[DEFAULT]',
              },
              options: {},
            },

            {
              appConfig: {
                name: 'secondaryFromNative',
              },
              options: {},
            },
          ],
          addListener: jest.fn(),
          eventsAddListener: jest.fn(),
          eventsNotifyReady: jest.fn(),
        },
        RNFBAuthModule: {
          APP_LANGUAGE: {
            '[DEFAULT]': 'en-US',
          },
          APP_USER: {
            '[DEFAULT]': 'jestUser',
          },
          addAuthStateListener: jest.fn(),
          addIdTokenListener: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBCrashlyticsModule: {},
        RNFBPerfModule: {},
      },
    },
    ReactNative
  )
);
