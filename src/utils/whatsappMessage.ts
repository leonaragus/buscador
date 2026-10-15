/**
 * Plantilla de mensaje de difusión oficial para RAICEP con formato de negritas (*) para WhatsApp.
 */
export const RAICEP_WHATSAPP_MESSAGE = `Hola 👋 *¿Tenés un instituto o dictás cursos?*

Te escribimos desde *RAICEP* (Registro Argentino de Instituciones y Certificación para Escuelas Profesionales), la red de convalidación académica con aval y cobertura en todo el país.

Con la suscripción de *Socio Co-Firmante* le das a tu academia todo resuelto por solo *$18.000 ARS al mes* (¡con los *primeros 30 días bonificados sin costo*!):

🌐 *Tu propia página web + Campus Virtual (tipo Moodle):* listos para usar, sin gastar en programadores ni servidores externos.
🎓 *Certificados con código QR y Aval Internacional ISC:* tus alumnos reciben diploma y credencial plástica tipo DNI, con PIN de seguridad verificable en 1 segundo desde cualquier celular.
💼 *Bolsa de trabajo automática:* cuando emitís el certificado, el perfil de tu egresado se envía directo a empresas de tu rubro y provincia para ayudarlos a conseguir trabajo.

🎁 *¿Querés figurar sin costo?* El alta de tu centro en la Guía Pública Nacional es *100% GRATIS* y para siempre ($0).

👀 *Mirá cómo funciona en 1 minuto* (sin registrarte):
👉 *raicep.org/demo*

📝 *Registrá tu academia en:* raicep.org
*¿Te gustaría que te asesoremos personalmente? Respondé este mensaje.*`;

/**
 * Limpia y normaliza el número de teléfono para enlaces de WhatsApp de Argentina.
 * Remueve caracteres no numéricos y asegura el prefijo internacional.
 */
export function cleanWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  
  // Si comienza con 549, está listo para wa.me
  if (digits.startsWith('549')) {
    return digits;
  }
  // Si comienza con 54 y le falta el 9 para celular
  if (digits.startsWith('54') && !digits.startsWith('549')) {
    return '549' + digits.slice(2);
  }
  // Si comienza con 0 (ej: 011...)
  if (digits.startsWith('0')) {
    return '549' + digits.slice(1);
  }
  // Si comienza con el código de área (ej: 11, 351...)
  if (digits.length >= 8 && digits.length <= 11) {
    return '549' + digits;
  }
  return digits;
}

/**
 * Genera el enlace directo a WhatsApp con el mensaje oficial de RAICEP preconfigurado.
 */
export function buildRaicepWhatsAppUrl(phone: string): string {
  const cleanPhone = cleanWhatsAppNumber(phone);
  const encodedText = encodeURIComponent(RAICEP_WHATSAPP_MESSAGE);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
