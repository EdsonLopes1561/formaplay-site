export const WHATSAPP_NUMBER = "5514998442917"; 
export const WHATSAPP_MESSAGE = "Olá, tudo bem? Tenho interesse no Desafio Logístico e gostaria de mais informações.";
export const WHATSAPP_MESSAGE_ONLINE = "Olá, tudo bem? Quero ser avisado quando o Desafio Online da FormaPlay estiver disponível.";
export const WHATSAPP_MESSAGE_PERSONALIZADO = "Olá, tudo bem? Tenho interesse em avaliar a criação de um jogo educacional personalizado com a FormaPlay.";

export const getWhatsAppLink = (customMessage?: string) => {
  const message = customMessage || WHATSAPP_MESSAGE;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getWhatsAppOnlineLink = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE_ONLINE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getWhatsAppPersonalizadoLink = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE_PERSONALIZADO);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
