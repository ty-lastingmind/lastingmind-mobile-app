import { ExpoConfig, IOS } from '@expo/config-types'

import { Environment } from '~/types/env'

import packageJson from './package.json'

declare const process: {
  env: {
    EXPO_PUBLIC_APP_ENV: Environment
    EXPO_PUBLIC_APP_VERSION: string
    EXPO_PUBLIC_BUILD_NUMBER: string
  }
}

// Your project defaults
const config = {
  appIdentifierBase: undefined,
  expoProjectId: undefined,
  expoProjectOwner: undefined,
  appScheme: 'lasting-mind',
}

const environment = process.env.EXPO_PUBLIC_APP_ENV || 'dev'

// your custom fonts
const fonts = ['./assets/fonts/Domine-Bold.ttf']

// prefetched/embedded assets, can be referenced as source='strv_logo' https://docs.expo.dev/versions/latest/sdk/asset/#configurable-properties
const assets = ['./assets/images/strv_logo.png']

const getEnvironmentInfo = (): {
  name: ExpoConfig['name']
  appIdentifier: IOS['bundleIdentifier']
  icon: ExpoConfig['icon']
} => {
  const appIdentifier = 'com.lastingmind.app'
  const appName = 'Lasting Mind'

  return {
    name: appName,
    appIdentifier: `${appIdentifier}.${environment}`,
    icon: `./assets/icon-${environment}.png`,
  }
}

const { name, appIdentifier, icon } = getEnvironmentInfo()

const plugins: ExpoConfig['plugins'] = [
  ['expo-build-properties'],
  ['expo-font', { fonts }],
  ['expo-asset', { assets }],
  ['expo-router'],
]

// UPDATE VERSION
const version = process.env.EXPO_PUBLIC_APP_VERSION || packageJson.version

const fallbackToCacheTimeout = 0

const expoConfig: ExpoConfig = {
  owner: config.expoProjectOwner,
  name,
  newArchEnabled: true,
  slug: config.appScheme,
  version,
  runtimeVersion: {
    policy: 'fingerprint',
  },
  scheme: config.appScheme,
  orientation: 'portrait',
  icon,
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: appIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      LSApplicationQueriesSchemes: ['itms-apps'],
    },
  },
  web: {
    bundler: 'metro',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: appIdentifier,
    // necessary from Android 12
    intentFilters: [
      { action: 'VIEW', data: { scheme: 'mailto' } },
      { action: 'VIEW', data: { scheme: 'sms' } },
      { action: 'VIEW', data: { scheme: 'tel' } },
    ],
  },
  jsEngine: 'hermes',
  plugins,
  extra: {
    fallbackToCacheTimeout,
    eas: {
      projectId: config.expoProjectId,
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
}

export default expoConfig
