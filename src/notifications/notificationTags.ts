import OneSignal from "react-native-onesignal";


// Criar Tag para o usuário

export const tagUserEmailCreate = (email: string) => {
    OneSignal.sendTag("user_email", email)
}

// Excluir Tag para o usuário

export const tagUserEmailDelete = (email: string) => {
    OneSignal.deleteTag("user_email")
}