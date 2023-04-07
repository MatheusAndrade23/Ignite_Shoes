import OneSignal from "react-native-onesignal";

// Criar Tag para o usuário
export const tagUserEmailCreate = (email: string) => {
    OneSignal.sendTag("user_email", email)
}

// Excluir Tag para o usuário
export const tagUserEmailDelete = (email: string) => {
    OneSignal.deleteTag("user_email")
}

// Deixar as tags dinâmicas
export const tagUserInfoCreate = () => {
    OneSignal.sendTags({"user_name" : "matheus", "user_email": "matheusandrade.ma2003@gmail.com"})
}

// Tag para carrinho abandonado
export const tagCartUpdate = (itemsCount: string) => {
    OneSignal.sendTag('cart_items_count', itemsCount)
}