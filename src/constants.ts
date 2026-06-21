export const WHATSAPP_NUMBER = "5500000000000"; // Placeholder, can be changed later sem .env
export const WHATSAPP_MESSAGE = "Olá, tudo bem? Tenho interesse em saber mais sobre os jogos educacionais da FormaPlay.";
export const WHATSAPP_MESSAGE_ONLINE = "Olá, tudo bem? Quero ser avisado quando o Desafio Online da FormaPlay estiver disponível.";
export const WHATSAPP_MESSAGE_PERSONALIZADO = "Olá, tudo bem? Tenho interesse em avaliar a criação de um jogo educacional personalizado com a FormaPlay.";

export const getWhatsAppLink = () => {
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
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
