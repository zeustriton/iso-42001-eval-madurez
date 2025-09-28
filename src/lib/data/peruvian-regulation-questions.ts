// Preguntas de evaluación para el Reglamento Peruano DS 115-2025-PCM
export interface PeruvianRegulationQuestion {
  id: string;
  section: string;
  category: string;
  title: string;
  question: string;
  description: string;
  type: 'single' | 'multiple';
  options: Array<{
    value: number;
    label: string;
    explanation?: string;
  }>;
  legalReference: string;
  mandatory: boolean;
}

export const peruvianRegulationQuestions: PeruvianRegulationQuestion[] = [
  {
    id: "registro_sistemas",
    section: "registro",
    category: "Obligaciones de Registro",
    title: "Registro de Sistemas de IA ante la Autoridad Competente",
    question: "¿Su organización ha registrado sus sistemas de inteligencia artificial actualmente en uso ante la autoridad competente, según lo establecido en el Artículo 15 del DS 115-2025-PCM?",
    description: "El reglamento establece la obligación de registrar todos los sistemas de IA que se encuentren actualmente en operación, especialmente aquellos clasificados como de alto riesgo, en el registro nacional correspondiente. Este requisito aplica para todas las organizaciones que utilizan sistemas de IA en sus operaciones.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No hemos registrado ningún sistema de IA que actualmente utilizamos",
        explanation: "Incumplimiento total del Artículo 15 - DS 115-2025-PCM"
      },
      { 
        value: 2, 
        label: "Hemos identificado los sistemas de IA en uso pero no hemos iniciado el proceso de registro",
        explanation: "Conciencia del requisito pero sin acción concreta - Artículo 15"
      },
      { 
        value: 3, 
        label: "Hemos iniciado el proceso de registro de algunos sistemas de IA que utilizamos",
        explanation: "Proceso en curso pero incompleto - Artículo 15"
      },
      { 
        value: 4, 
        label: "La mayoría de nuestros sistemas de IA en uso están registrados correctamente",
        explanation: "Cumplimiento sustancial con algunas excepciones - Artículo 15"
      },
      { 
        value: 5, 
        label: "Todos los sistemas de IA que actualmente utilizamos están registrados y actualizados",
        explanation: "Cumplimiento completo del Artículo 15 - DS 115-2025-PCM"
      }
    ],
    legalReference: "Artículo 15 - Registro Obligatorio - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "evaluacion_impacto",
    section: "evaluacion",
    category: "Evaluación de Impacto",
    title: "Evaluación de Impacto Previo para Sistemas de IA en Uso",
    question: "¿Su organización realiza evaluaciones de impacto previas y periódicas para los sistemas de inteligencia artificial que actualmente tiene en operación, conforme al Artículo 22 del DS 115-2025-PCM?",
    description: "El reglamento exige realizar evaluaciones de impacto obligatorias para todos los sistemas de IA actualmente en uso, analizando posibles efectos en derechos fundamentales, privacidad, no discriminación y seguridad ciudadana. Estas evaluaciones deben ser actualizadas periódicamente.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No realizamos evaluaciones de impacto para nuestros sistemas de IA en uso",
        explanation: "Incumplimiento total del Artículo 22 - DS 115-2025-PCM"
      },
      { 
        value: 2, 
        label: "Realizamos evaluaciones informales sin metodología establecida para los sistemas actuales",
        explanation: "Esfuerzo insuficiente y no estructurado - Artículo 22"
      },
      { 
        value: 3, 
        label: "Tenemos un proceso básico de evaluación de impacto para algunos sistemas en uso",
        explanation: "Proceso establecido pero con limitaciones - Artículo 22"
      },
      { 
        value: 4, 
        label: "Realizamos evaluaciones completas con metodología formal para la mayoría de sistemas",
        explanation: "Buen nivel de cumplimiento con documentación adecuada - Artículo 22"
      },
      { 
        value: 5, 
        label: "Contamos con un sistema robusto de evaluación de impacto con revisiones periódicas para todos los sistemas",
        explanation: "Excelente práctica con mejoras continuas - Artículo 22"
      }
    ],
    legalReference: "Artículo 22 - Evaluación de Impacto Obligatoria - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "transparencia_explicabilidad",
    section: "transparencia",
    category: "Transparencia y Explicabilidad",
    title: "Transparencia en el Funcionamiento de Sistemas de IA Activos",
    question: "¿Cómo de transparente es su organización sobre el funcionamiento de los sistemas de inteligencia artificial que actualmente tiene en operación, según lo dispuesto en el Artículo 28 del DS 115-2025-PCM?",
    description: "El reglamento establece la obligación de informar claramente a los usuarios sobre la utilización de sistemas de IA actualmente en operación, su capacidad de decisión automática y los criterios utilizados. Esta transparencia debe ser accesible y comprensible.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No informamos a los usuarios sobre el uso actual de sistemas de IA",
        explanation: "Falta total de transparencia - Artículo 28"
      },
      { 
        value: 2, 
        label: "Informamos de manera muy básica y limitada sobre algunos sistemas activos",
        explanation: "Transparencia mínima insuficiente - Artículo 28"
      },
      { 
        value: 3, 
        label: "Informamos sobre el uso de IA actual pero con detalles limitados",
        explanation: "Transparencia parcial con área de mejora - Artículo 28"
      },
      { 
        value: 4, 
        label: "Proporcionamos información clara sobre el funcionamiento y decisiones de los sistemas activos",
        explanation: "Buen nivel de transparencia - Artículo 28"
      },
      { 
        value: 5, 
        label: "Ofrecemos explicaciones detalladas y documentación completa del funcionamiento de todos los sistemas en uso",
        explanation: "Transparencia máxima con explicabilidad completa - Artículo 28"
      }
    ],
    legalReference: "Artículo 28 - Deber de Transparencia - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "derechos_ciudadanos",
    section: "derechos",
    category: "Derechos de los Ciudadanos",
    title: "Mecanismos para Ejercer Derechos sobre IA Activa",
    question: "¿Qué mecanismos ha implementado su organización para que los ciudadanos ejerzan sus derechos respecto a los sistemas de inteligencia artificial actualmente en operación, conforme al Artículo 35 del DS 115-2025-PCM?",
    description: "El reglamento garantiza los derechos de información, explicación, rectificación y oposición a decisiones automatizadas tomadas por sistemas de IA actualmente en uso. Estos mecanismos deben estar operativos y ser accesibles.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No hemos implementado ningún mecanismo para los sistemas de IA en uso",
        explanation: "Incumplimiento total del Artículo 35 - DS 115-2025-PCM"
      },
      { 
        value: 2, 
        label: "Tenemos canales básicos pero no específicos para sistemas de IA activos",
        explanation: "Mecanismos genéricos insuficientes - Artículo 35"
      },
      { 
        value: 3, 
        label: "Hemos implementado algunos mecanismos específicos para sistemas actuales",
        explanation: "Cumplimiento parcial con áreas de mejora - Artículo 35"
      },
      { 
        value: 4, 
        label: "Contamos con mecanismos completos para ejercer derechos sobre sistemas operativos",
        explanation: "Buen nivel de implementación de derechos - Artículo 35"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema integral con múltiples canales y respuesta ágil para todos los sistemas activos",
        explanation: "Excelente sistema de protección de derechos - Artículo 35"
      }
    ],
    legalReference: "Artículo 35 - Derechos de los Ciudadanos - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "seguridad_proteccion_datos",
    section: "seguridad",
    category: "Seguridad y Protección de Datos",
    title: "Medidas de Seguridad para Sistemas de IA en Operación",
    question: "¿Qué nivel de medidas de seguridad y protección de datos personales implementa en los sistemas de inteligencia artificial que actualmente tiene en funcionamiento, según el Artículo 42 del DS 115-2025-PCM?",
    description: "El reglamento exige implementar medidas técnicas y organizativas adecuadas para garantizar la seguridad, integridad y confidencialidad de los datos procesados por sistemas de IA actualmente en operación, considerando su nivel de riesgo.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No tenemos medidas específicas para los sistemas de IA que operamos",
        explanation: "Falta total de medidas de seguridad - Artículo 42"
      },
      { 
        value: 2, 
        label: "Aplicamos medidas básicas de seguridad general para sistemas activos",
        explanation: "Medidas insuficientes y no específicas - Artículo 42"
      },
      { 
        value: 3, 
        label: "Implementamos medidas de seguridad específicas para IA en operación",
        explanation: "Medidas adecuadas pero con limitaciones - Artículo 42"
      },
      { 
        value: 4, 
        label: "Contamos con un sistema robusto de seguridad y protección de datos para sistemas operativos",
        explanation: "Buen nivel de implementación de seguridad - Artículo 42"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema avanzado con monitoreo continuo y actualización para todos los sistemas activos",
        explanation: "Excelente sistema de seguridad y protección - Artículo 42"
      }
    ],
    legalReference: "Artículo 42 - Medidas de Seguridad - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "supervision_fiscalizacion",
    section: "supervision",
    category: "Supervisión y Fiscalización",
    title: "Mecanismos de Supervisión Interna para IA Operativa",
    question: "¿Qué mecanismos de supervisión y fiscalización interna ha implementado para los sistemas de inteligencia artificial que actualmente se encuentran en operación, conforme al Artículo 58 del DS 115-2025-PCM?",
    description: "El reglamento requiere establecer sistemas internos de monitoreo, auditoría y control del cumplimiento normativo para todos los sistemas de IA actualmente en uso, con especial énfasis en aquellos de alto riesgo.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No tenemos mecanismos de supervisión interna para sistemas operativos",
        explanation: "Falta total de supervisión - Artículo 58"
      },
      { 
        value: 2, 
        label: "Realizamos revisiones esporádicas sin formalidad para sistemas activos",
        explanation: "Supervisión informal e insuficiente - Artículo 58"
      },
      { 
        value: 3, 
        label: "Tenemos procesos básicos de supervisión periódica para algunos sistemas",
        explanation: "Supervisión estructurada pero limitada - Artículo 58"
      },
      { 
        value: 4, 
        label: "Contamos con un sistema formal de auditoría y monitoreo para sistemas en operación",
        explanation: "Buen sistema de supervisión interna - Artículo 58"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema integral con auditorías regulares y mejoras continuas para todos los sistemas activos",
        explanation: "Excelente sistema de supervisión - Artículo 58"
      }
    ],
    legalReference: "Artículo 58 - Supervisión Interna - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "documentacion_cumplimiento",
    section: "documentacion",
    category: "Documentación y Evidencias",
    title: "Documentación de Cumplimiento para IA en Uso",
    question: "¿Qué nivel de documentación mantiene su organización sobre el cumplimiento del reglamento de IA para los sistemas que actualmente tiene en operación, según el Artículo 65 del DS 115-2025-PCM?",
    description: "El reglamento exige mantener registros actualizados, políticas, procedimientos y evidencias de cumplimiento para todos los sistemas de IA actualmente en uso, incluyendo evaluaciones de impacto y medidas de seguridad implementadas.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No mantenemos documentación específica para sistemas operativos",
        explanation: "Falta total de documentación - Artículo 65"
      },
      { 
        value: 2, 
        label: "Tenemos documentos dispersos y no organizados para sistemas activos",
        explanation: "Documentación insuficiente y desorganizada - Artículo 65"
      },
      { 
        value: 3, 
        label: "Mantenemos documentación básica organizada para algunos sistemas",
        explanation: "Documentación adecuada pero incompleta - Artículo 65"
      },
      { 
        value: 4, 
        label: "Contamos con documentación completa y actualizada para la mayoría de sistemas",
        explanation: "Buen nivel de documentación - Artículo 65"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema integral de gestión documental con versionamiento para todos los sistemas activos",
        explanation: "Excelente sistema de documentación - Artículo 65"
      }
    ],
    legalReference: "Artículo 65 - Documentación Obligatoria - DS 115-2025-PCM",
    mandatory: true
  },
  {
    id: "capacitacion_personal",
    section: "recursos",
    category: "Recursos Humanos",
    title: "Capacitación del Personal en IA Operativa",
    question: "¿Qué nivel de capacitación sobre el reglamento de IA ha recibido el personal que actualmente trabaja con sistemas de inteligencia artificial en operación, según el Artículo 72 del DS 115-2025-PCM?",
    description: "El reglamento establece la obligación de formar al personal involucrado en el desarrollo, implementación, operación y uso de sistemas de IA actualmente en funcionamiento, sobre sus responsabilidades y los requisitos legales aplicables.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No hemos proporcionado ninguna capacitación específica para personal con sistemas activos",
        explanation: "Falta total de capacitación - Artículo 72"
      },
      { 
        value: 2, 
        label: "Hemos realizado algunas charlas informales para personal con IA operativa",
        explanation: "Capacitación mínima e insuficiente - Artículo 72"
      },
      { 
        value: 3, 
        label: "Hemos implementado un programa básico de capacitación para algunos roles",
        explanation: "Capacitación estructurada pero limitada - Artículo 72"
      },
      { 
        value: 4, 
        label: "Contamos con un programa completo de capacitación para personal con sistemas activos",
        explanation: "Buen nivel de formación del personal - Artículo 72"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema avanzado con capacitación continua y certificación para todo el personal involucrado",
        explanation: "Excelente sistema de capacitación - Artículo 72"
      }
    ],
    legalReference: "Artículo 72 - Capacitación Obligatoria - DS 115-2025-PCM",
    mandatory: false
  },
  {
    id: "gestion_riesgos_especifica",
    section: "riesgos",
    category: "Gestión de Riesgos",
    title: "Gestión de Riesgos Específica para IA en Operación",
    question: "¿Cómo gestiona su organización los riesgos específicos identificados en el reglamento peruano de IA para los sistemas que actualmente tiene en funcionamiento, conforme al Artículo 38 del DS 115-2025-PCM?",
    description: "El reglamento requiere identificar, evaluar y tratar los riesgos específicos asociados a los sistemas de IA actualmente en operación, incluyendo riesgos a derechos fundamentales, discriminación, seguridad y protección de datos.",
    type: "single",
    options: [
      { 
        value: 1, 
        label: "No gestionamos riesgos específicos del reglamento para sistemas operativos",
        explanation: "Falta total de gestión de riesgos - Artículo 38"
      },
      { 
        value: 2, 
        label: "Identificamos riesgos pero sin gestión formal para sistemas activos",
        explanation: "Gestión informal e insuficiente - Artículo 38"
      },
      { 
        value: 3, 
        label: "Tenemos un proceso básico de gestión de riesgos para algunos sistemas",
        explanation: "Gestión estructurada pero limitada - Artículo 38"
      },
      { 
        value: 4, 
        label: "Contamos con un sistema completo de gestión de riesgos para la mayoría de sistemas",
        explanation: "Buen nivel de gestión de riesgos - Artículo 38"
      },
      { 
        value: 5, 
        label: "Tenemos un sistema avanzado con monitoreo continuo para todos los sistemas activos",
        explanation: "Excelente sistema de gestión de riesgos - Artículo 38"
      }
    ],
    legalReference: "Artículo 38 - Gestión de Riesgos Específica - DS 115-2025-PCM",
    mandatory: true
  }
];

// Secciones del reglamento para organización
export const regulationSections = [
  { 
    id: "registro", 
    title: "Registro de Sistemas", 
    description: "Obligaciones de registro ante la autoridad competente",
    color: "rgba(255, 99, 132, 0.6)"
  },
  { 
    id: "evaluacion", 
    title: "Evaluación de Impacto", 
    description: "Evaluaciones previas de impacto en derechos fundamentales",
    color: "rgba(54, 162, 235, 0.6)"
  },
  { 
    id: "transparencia", 
    title: "Transparencia", 
    description: "Información clara sobre el uso y funcionamiento de la IA",
    color: "rgba(255, 206, 86, 0.6)"
  },
  { 
    id: "derechos", 
    title: "Derechos Ciudadanos", 
    description: "Mecanismos para ejercer derechos de los ciudadanos",
    color: "rgba(75, 192, 192, 0.6)"
  },
  { 
    id: "seguridad", 
    title: "Seguridad y Datos", 
    description: "Medidas de seguridad y protección de datos personales",
    color: "rgba(153, 102, 255, 0.6)"
  },
  { 
    id: "supervision", 
    title: "Supervisión", 
    description: "Mecanismos internos de supervisión y fiscalización",
    color: "rgba(255, 159, 64, 0.6)"
  },
  { 
    id: "documentacion", 
    title: "Documentación", 
    description: "Mantenimiento de registros y evidencias de cumplimiento",
    color: "rgba(199, 199, 199, 0.6)"
  },
  { 
    id: "recursos", 
    title: "Recursos Humanos", 
    description: "Capacitación y competencias del personal",
    color: "rgba(83, 102, 255, 0.6)"
  },
  { 
    id: "riesgos", 
    title: "Gestión de Riesgos", 
    description: "Identificación y tratamiento de riesgos específicos",
    color: "rgba(255, 99, 255, 0.6)"
  }
];

// Niveles de cumplimiento legal
export const complianceLevels = [
  { min: 0, max: 1.5, level: "No Conforme", description: "Incumplimiento significativo de requisitos legales", color: "text-red-600", action: "Acción inmediata requerida" },
  { min: 1.6, max: 2.5, level: "Bajo Cumplimiento", description: "Cumplimiento mínimo con muchas deficiencias", color: "text-orange-600", action: "Mejoras urgentes necesarias" },
  { min: 2.6, max: 3.5, level: "Cumplimiento Parcial", description: "Cumplimiento moderado con áreas críticas", color: "text-yellow-600", action: "Plan de mejora requerido" },
  { min: 3.6, max: 4.5, level: "Buen Cumplimiento", description: "Cumplimiento sustancial con menores ajustes", color: "text-blue-600", action: "Mejoras continuas" },
  { min: 4.6, max: 5, level: "Cumplimiento Pleno", description: "Cumplimiento completo de todos los requisitos", color: "text-green-600", action: "Mantener y mejorar" }
];