import OneSignal from "react-native-onesignal";


// Criar Tags para o usuário

export const tagUserEmailCreate = (email: string) => {
    OneSignal.sendTag("user_email", email)
}