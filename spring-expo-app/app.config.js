module.exports = {
  name: "Spring",
  slug: "spring-expo-app",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  splash: {
    resizeMode: "contain",
    backgroundColor: "#4f46e5"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#4f46e5"
    }
  },
  plugins: [
    "expo-router"
  ],
  scheme: "spring-app",
  newArchEnabled: true,
  extra: {
    // Disable the Expo Router if needed
    router: {
      origin: false
    }
  }
}; 