"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, AlertTriangle, Info } from "lucide-react";

// Datos de comparación entre ISO 42001 y el reglamento peruano
const comparisonData = [
  {
    requirement: "Gestión de Riesgos",
    iso42001: {
      present: true,
      description: "Evaluación y tratamiento de riesgos de IA",
      reference: "Cláusula 6.1, 8.2-8.3"
    },
    peruvianRegulation: {
      present: true,
      description: "Gestión específica de riesgos según marco legal peruano",
      reference: "Artículo 38 DS 115-2025-PCM"
    },
    alignment: "Alta",
    notes: "Ambos marcos enfatizan la gestión de riesgos, con enfoques complementarios"
  },
  {
    requirement: "Transparencia",
    iso42001: {
      present: true,
      description: "Transparencia en el uso y funcionamiento de sistemas de IA",
      reference: "Cláusula 7.4, 8.1"
    },
    peruvianRegulation: {
      present: true,
      description: "Obligación de informar sobre uso de IA a los ciudadanos",
      reference: "Artículo 28 DS 115-2025-PCM"
    },
    alignment: "Alta",
    notes: "Ambos requieren transparencia, el reglamento peruano es más específico en derechos ciudadanos"
  },
  {
    requirement: "Registro de Sistemas",
    iso42001: {
      present: false,
      description: "No requiere registro obligatorio",
      reference: "No aplica"
    },
    peruvianRegulation: {
      present: true,
      description: "Registro obligatorio de sistemas de IA ante autoridad competente",
      reference: "Artículo 15 DS 115-2025-PCM"
    },
    alignment: "Requiere adaptación",
    notes: "El reglamento peruano añade un requisito adicional no presente en ISO 42001"
  },
  {
    requirement: "Evaluación de Impacto",
    iso42001: {
      present: true,
      description: "Evaluación del impacto del sistema de IA",
      reference: "Cláusula 6.1.4"
    },
    peruvianRegulation: {
      present: true,
      description: "Evaluación de impacto previa obligatoria",
      reference: "Artículo 22 DS 115-2025-PCM"
    },
    alignment: "Media",
    notes: "Ambos requieren evaluación, el reglamento peruano la hace obligatoria y previa"
  },
  {
    requirement: "Derechos de Ciudadanos",
    iso42001: {
      present: false,
      description: "No aborda específicamente derechos ciudadanos",
      reference: "No aplica"
    },
    peruvianRegulation: {
      present: true,
      description: "Mecanismos específicos para derechos de información, explicación, rectificación",
      reference: "Artículo 35 DS 115-2025-PCM"
    },
    alignment: "Requiere adaptación",
    notes: "El reglamento peruano establece derechos específicos no cubiertos por ISO 42001"
  },
  {
    requirement: "Seguridad y Protección de Datos",
    iso42001: {
      present: true,
      description: "Seguridad de la información y protección de datos",
      reference: "Cláusula 7.1, 8.1"
    },
    peruvianRegulation: {
      present: true,
      description: "Medidas específicas de seguridad y protección de datos personales",
      reference: "Artículo 42 DS 115-2025-PCM"
    },
    alignment: "Alta",
    notes: "Ambos marcos enfatizan la seguridad, con enfoques complementarios"
  },
  {
    requirement: "Documentación",
    iso42001: {
      present: true,
      description: "Mantenimiento de información documentada",
      reference: "Cláusula 7.5"
    },
    peruvianRegulation: {
      present: true,
      description: "Documentación específica de cumplimiento legal",
      reference: "Artículo 65 DS 115-2025-PCM"
    },
    alignment: "Alta",
    notes: "Ambos requieren documentación, con diferentes enfoques y requisitos"
  },
  {
    requirement: "Supervisión y Auditoría",
    iso42001: {
      present: true,
      description: "Auditoría interna y revisión por la dirección",
      reference: "Cláusula 9.2, 9.3"
    },
    peruvianRegulation: {
      present: true,
      description: "Mecanismos de supervisión y fiscalización",
      reference: "Artículo 58 DS 115-2025-PCM"
    },
    alignment: "Media",
    notes: "Ambos requieren supervisión, con diferentes enfoques y autoridades"
  }
];

const alignmentColors = {
  "Alta": "bg-green-100 text-green-800",
  "Media": "bg-yellow-100 text-yellow-800",
  "Requiere adaptación": "bg-red-100 text-red-800"
};

export default function LegalCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="py-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <img
                  src="/logo.png"
                  alt="ISO 42001 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Análisis de Cumplimiento Legal</h1>
                <h2 className="text-xl font-semibold text-gray-700">
                  ISO 42001 vs. Reglamento Peruano de IA (DS 115-2025-PCM)
                </h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/evaluacion-v1.1">Evaluación v1.1</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Inicio</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
              <Info className="w-6 h-6" />
              Entendiendo el Marco Legal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">¿Por qué es importante este análisis?</h3>
                <p className="text-gray-700 mb-4">
                  El Decreto Supremo 115-2025-PCM establece el marco legal para el uso de inteligencia artificial en Perú, 
                  complementando y en algunos casos ampliando los requisitos de la norma internacional ISO 42001.
                </p>
                <p className="text-gray-700">
                  Para las organizaciones que operan en Perú, es crucial entender ambos marcos normativos para 
                  garantizar un cumplimiento integral y evitar riesgos legales.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Alcance del Análisis</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Comparación detallada de requisitos entre ambos marcos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Identificación de áreas de alineación y divergencia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Recomendaciones para implementación conjunta</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">Guía para cumplimiento legal efectivo</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Framework Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* ISO 42001 */}
          <Card className="shadow-lg border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl text-blue-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                ISO 42001:2023
              </CardTitle>
              <CardDescription className="text-blue-700">
                Sistema de Gestión de Inteligencia Artificial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Naturaleza:</h4>
                  <p className="text-gray-700 text-sm">
                    Norma internacional voluntaria que proporciona un marco para establecer, implementar, 
                    mantener y mejorar sistemas de gestión de IA.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Enfoque:</h4>
                  <p className="text-gray-700 text-sm">
                    Basado en el ciclo PDCA (Plan-Do-Check-Act), enfocado en la mejora continua 
                    y la gestión responsable de sistemas de IA.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Componentes clave:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Contexto de la organización</li>
                    <li>• Liderazgo</li>
                    <li>• Planificación</li>
                    <li>• Apoyo</li>
                    <li>• Operación</li>
                    <li>• Evaluación del desempeño</li>
                    <li>• Mejora</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peruvian Regulation */}
          <Card className="shadow-lg border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-xl text-red-800 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                DS 115-2025-PCM
              </CardTitle>
              <CardDescription className="text-red-700">
                Reglamento que promueve el uso de IA para el desarrollo económico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Naturaleza:</h4>
                  <p className="text-gray-700 text-sm">
                    Norma legal de cumplimiento obligatorio que establece requisitos específicos 
                    para el desarrollo e implementación de IA en Perú.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Enfoque:</h4>
                  <p className="text-gray-700 text-sm">
                    Protección de derechos ciudadanos, promoción de la innovación responsable, 
                    y establecimiento de un marco legal claro para la IA.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Componentes clave:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Registro de sistemas de IA</li>
                    <li>• Evaluación de impacto previa</li>
                    <li>• Transparencia y explicabilidad</li>
                    <li>• Derechos de los ciudadanos</li>
                    <li>• Seguridad y protección de datos</li>
                    <li>• Supervisión y fiscalización</li>
                    <li>• Sanciones por incumplimiento</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Matrix */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800">Matriz de Cumplimiento Comparativo</CardTitle>
            <CardDescription>
              Análisis detallado de requisitos y alineación entre ambos marcos normativos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                      Requisito
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-800">
                      ISO 42001
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-800">
                      DS 115-2025-PCM
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                      Alineación
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                      Observaciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                        {item.requirement}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="flex flex-col items-center gap-1">
                          {item.iso42001.present ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : (
                            <AlertTriangle className="text-red-500" size={20} />
                          )}
                          <span className="text-xs text-gray-600 text-center">
                            {item.iso42001.description}
                          </span>
                          <span className="text-xs text-blue-600">
                            {item.iso42001.reference}
                          </span>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="flex flex-col items-center gap-1">
                          {item.peruvianRegulation.present ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : (
                            <AlertTriangle className="text-red-500" size={20} />
                          )}
                          <span className="text-xs text-gray-600 text-center">
                            {item.peruvianRegulation.description}
                          </span>
                          <span className="text-xs text-red-600">
                            {item.peruvianRegulation.reference}
                          </span>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        <Badge className={alignmentColors[item.alignment as keyof typeof alignmentColors]}>
                          {item.alignment}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="text-sm text-gray-700">
                          {item.notes}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Recomendaciones de Implementación</CardTitle>
            <CardDescription>
              Estrategias para cumplir con ambos marcos normativos de manera eficiente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Enfoque Integrado</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Implemente un sistema de gestión que combine los requisitos de ambos marcos, 
                  evitando duplicidades y maximizando sinergias.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Utilice ISO 42001 como base estructural</li>
                  <li>• Añada requisitos específicos del DS 115-2025-PCM</li>
                  <li>• Documente las relaciones entre requisitos</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-3">Priorización de Acciones</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Enfóquese primero en los requisitos obligatorios del reglamento peruano, 
                  luego integre los elementos de mejora continua de ISO 42001.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Registro de sistemas de IA (prioridad alta)</li>
                  <li>• Evaluación de impacto previa</li>
                  <li>• Mecanismos de derechos ciudadanos</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Mantenimiento y Mejora</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Establezca procesos para mantener actualizado el sistema ante cambios 
                  en ambos marcos normativos.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Monitoreo de cambios normativos</li>
                  <li>• Auditorías integradas</li>
                  <li>• Capacitación continua del personal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">¿Listo para evaluar su cumplimiento?</CardTitle>
            <CardDescription className="text-blue-100">
              Utilice nuestra herramienta de evaluación v1.1 para medir su nivel de cumplimiento 
              con ambos marcos normativos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/evaluacion-v1.1">
                  Comenzar Evaluación v1.1
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/versiones">
                  Ver Todas las Versiones
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}