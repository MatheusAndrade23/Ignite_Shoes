import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import OneSignal, { NotificationReceivedEvent, OSNotification } from "react-native-onesignal";

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Notification } from './src/components/Notification';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

// Setup Inicial
OneSignal.setAppId("deab7f33-7872-406c-8f8d-9668d0c4b8c7");
OneSignal.setEmail("matheusandrade.ma2003@gmail.com");
OneSignal.promptForPushNotificationsWithUserResponse();

// Criar Tags para o usuário
import { tagUserInfoCreate } from './src/notifications/notificationTags';


export default function App() {
  const [notification, setNotification] = useState<OSNotification>();
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((NotificationReceivedEvent: NotificationReceivedEvent) => {
      const resp = NotificationReceivedEvent.getNotification();

      setNotification(resp);
    });

    return () => unsubscribe;
   
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {
        notification?.title && (<Notification title={notification.title} onClose={() => {setNotification(undefined)}}/>)
      }
      
    </NativeBaseProvider>
  );
}

