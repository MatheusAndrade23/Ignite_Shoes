import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import OneSignal from "react-native-onesignal";

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';

// Setup Inicial
OneSignal.setAppId("deab7f33-7872-406c-8f8d-9668d0c4b8c7");
OneSignal.setEmail("matheusandrade.ma2003@gmail.com");
OneSignal.promptForPushNotificationsWithUserResponse();

// Criar Tags para o usuário
import { tagUserInfoCreate } from './src/notifications/notificationTags';
import { useEffect } from 'react';


export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  // Monitora o clique na notificação quando o app está em segundo plano
  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {

     // Se houve o clique em um dos botões da notificação, faz uma ação específica 
      const { actionId } = response.action as any;

      switch (actionId) {
        case '1':
          return console.log('Ver todas!');
        case '2':
          return console.log('Ver pedido!');
        default:
          return console.log('Não houve nenhuma ação!');
      }
    })

    return () => unsubscribe
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

      
    </NativeBaseProvider>
  );
}

