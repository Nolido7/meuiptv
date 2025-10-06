/**
 * CONFIGURAÇÃO CENTRALIZADA DO WHATSAPP
 * 
 * Para alterar o número do WhatsApp, modifique apenas a variável PHONE_NUMBER abaixo.
 * O link será gerado automaticamente com a mensagem padrão.
 */

// CONFIGURAÇÕES - ALTERE APENAS AQUI
const PHONE_NUMBER = '556281215133'; // Número com código do país (sem + no início)
const DEFAULT_MESSAGE = '*Ol%C3%A1%2C+gostaria+de+experimentar+o+Meu+IPTV+Brasil.*'; // Mensagem URL encoded

// LINK GERADO AUTOMATICAMENTE - NÃO ALTERE
const WHATSAPP_LINK = `https://api.whatsapp.com/send/?phone=${PHONE_NUMBER}&text=${DEFAULT_MESSAGE}&type=phone_number&app_absent=0`;

// Para uso em outros arquivos
window.WHATSAPP_CONFIG = {
    PHONE_NUMBER: PHONE_NUMBER,
    DEFAULT_MESSAGE: DEFAULT_MESSAGE,
    WHATSAPP_LINK: WHATSAPP_LINK
};


console.log('WhatsApp configurado:', WHATSAPP_LINK);
