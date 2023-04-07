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

OneSignal.setEmail("matheusandrade.ma2003@gmail.com")

OneSignal.promptForPushNotificationsWithUserResponse((response) => {console.log(response)})

// Criar Tags para o usuário

import { tagUserEmailCreate } from './src/notifications/notificationTags';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate("matheusandrade.ma2003@gmail.com")

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

