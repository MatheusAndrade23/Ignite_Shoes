import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import OneSignal, { NotificationReceivedEvent, OSNotification } from "react-native-onesignal";

import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

const linking = {
  prefixes: ["com.igniteshoesapp://"," igniteshoesapp://", "exp+igniteshoesapp://" ],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        pase: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((NotificationReceivedEvent: NotificationReceivedEvent) => {
      const resp = NotificationReceivedEvent.getNotification();

      setNotification(resp);
    });

    return () => unsubscribe;
   
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title && (<Notification data={notification} onClose={() => {setNotification(undefined)}}/>)
      }
      
    </NavigationContainer>
  );
}