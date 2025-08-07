import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ec1604f0f3d74138bd534203f4746763',
  appName: 'STT Voice Recorder',
  webDir: 'dist',
  server: {
    url: 'https://ec1604f0-f3d7-4138-bd53-4203f4746763.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#1a1a1a',
      showSpinner: true,
      spinnerColor: '#3b82f6'
    }
  }
};

export default config;