// Configuración de plazos según el DS 115-2025-PCM
export interface ComplianceDeadline {
  id: string;
  organizationType: string;
  description: string;
  deadline: Date; // Fecha límite de cumplimiento
  priority: 'alta' | 'media' | 'baja';
  requirements: string[];
}

export const complianceDeadlines: ComplianceDeadline[] = [
  {
    id: "sector_publico_central",
    organizationType: "Sector Público - Gobierno Central",
    description: "Organismos públicos del gobierno central y ministerios",
    deadline: new Date('2026-06-30'), // 1 año desde la publicación (asumiendo publicación en junio 2025)
    priority: 'alta',
    requirements: [
      "Registro obligatorio de todos los sistemas de IA",
      "Evaluaciones de impacto previas a la implementación",
      "Implementación de mecanismos de transparencia",
      "Establecimiento de canales para derechos ciudadanos",
      "Medidas de seguridad y protección de datos",
      "Sistemas de supervisión interna",
      "Documentación completa de cumplimiento",
      "Capacitación obligatoria del personal",
      "Gestión de riesgos específica"
    ]
  },
  {
    id: "sector_publico_regional_local",
    organizationType: "Sector Público - Gobiernos Regionales y Locales",
    description: "Gobiernos regionales, municipales y entidades descentralizadas",
    deadline: new Date('2026-12-31'), // 1.5 años desde la publicación
    priority: 'alta',
    requirements: [
      "Registro de sistemas de IA de alto riesgo",
      "Evaluaciones de impacto para sistemas críticos",
      "Transparencia en sistemas de decisión automatizada",
      "Mecanismos básicos para derechos ciudadanos",
      "Medidas de seguridad adecuadas",
      "Supervisión periódica de sistemas",
      "Documentación de cumplimiento esencial",
      "Capacitación del personal involucrado",
      "Gestión básica de riesgos"
    ]
  },
  {
    id: "sector_privado_grandes",
    organizationType: "Sector Privado - Grandes Empresas",
    description: "Empresas privadas con más de 500 trabajadores o facturación anual superior a 1500 UIT",
    deadline: new Date('2027-06-30'), // 2 años desde la publicación
    priority: 'media',
    requirements: [
      "Registro de sistemas de IA de alto riesgo",
      "Evaluaciones de impacto para sistemas relevantes",
      "Transparencia en interfaces de usuario",
      "Canales para atención de derechos ciudadanos",
      "Medidas de seguridad según riesgo",
      "Mecanismos de supervisión interna",
      "Documentación de procesos críticos",
      "Capacitación específica por roles",
      "Gestión de riesgos aplicada"
    ]
  },
  {
    id: "sector_privado_medianas",
    organizationType: "Sector Privado - Medianas Empresas",
    description: "Empresas privadas entre 50 y 500 trabajadores",
    deadline: new Date('2028-06-30'), // 3 años desde la publicación
    priority: 'media',
    requirements: [
      "Registro de sistemas de IA críticos",
      "Evaluaciones de impacto básicas",
      "Información básica sobre uso de IA",
      "Procedimientos para solicitudes ciudadanas",
      "Medidas de seguridad fundamentales",
      "Revisiones periódicas internas",
      "Documentación esencial",
      "Capacitación básica del personal",
      "Identificación de riesgos principales"
    ]
  },
  {
    id: "sector_privado_pequenas",
    organizationType: "Sector Privado - Pequeñas Empresas",
    description: "Empresas privadas con menos de 50 trabajadores",
    deadline: new Date('2029-06-30'), // 4 años desde la publicación
    priority: 'baja',
    requirements: [
      "Registro voluntario de sistemas de IA",
      "Evaluación simplificada de impacto",
      "Información sobre uso de IA cuando sea requerido",
      "Canales básicos de comunicación",
      "Medidas básicas de seguridad",
      "Autoevaluaciones periódicas",
      "Documentación mínima",
      "Sensibilización del personal",
      "Identificación básica de riesgos"
    ]
  }
];

// Función para calcular el tiempo restante hasta una fecha límite
export function calculateTimeRemaining(deadline: Date): {
  days: number;
  months: number;
  years: number;
  totalDays: number;
  isOverdue: boolean;
  formattedText: string;
} {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const isOverdue = diffDays < 0;
  const absoluteDays = Math.abs(diffDays);
  
  const years = Math.floor(absoluteDays / 365);
  const remainingDays = absoluteDays % 365;
  const months = Math.floor(remainingDays / 30);
  const days = remainingDays % 30;
  
  let formattedText = '';
  if (isOverdue) {
    formattedText = `Vencido hace ${years > 0 ? `${years} año${years > 1 ? 's' : ''}, ` : ''}${months > 0 ? `${months} mes${months > 1 ? 'es' : ''}, ` : ''}${days} día${days !== 1 ? 's' : ''}`;
  } else {
    formattedText = `${years > 0 ? `${years} año${years > 1 ? 's' : ''}, ` : ''}${months > 0 ? `${months} mes${months > 1 ? 'es' : ''}, ` : ''}${days} día${days !== 1 ? 's' : ''} restantes`;
  }
  
  return {
    days: isOverdue ? -days : days,
    months: isOverdue ? -months : months,
    years: isOverdue ? -years : years,
    totalDays: diffDays,
    isOverdue,
    formattedText
  };
}

// Función para determinar el tipo de organización basado en respuestas simples
export function determineOrganizationType(responses: Record<string, number>): string {
  // Esta función podría ser expandida basada en preguntas específicas del formulario
  // Por ahora, retornaremos un valor por defecto
  return "sector_privado_medianas"; // Valor por defecto
}

// Función para obtener los requisitos específicos según el tipo de organización
export function getSpecificRequirements(organizationType: string): string[] {
  const deadline = complianceDeadlines.find(d => d.id === organizationType);
  return deadline ? deadline.requirements : [];
}

// Función para obtener la fecha límite según el tipo de organización
export function getDeadlineByOrganizationType(organizationType: string): Date | null {
  const deadline = complianceDeadlines.find(d => d.id === organizationType);
  return deadline ? deadline.deadline : null;
}