"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VersionSelector } from "@/components/VersionSelector";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Calendar, 
  Users, 
  TrendingUp,
  Shield,
  Zap,
  Star
} from "lucide-react";

interface VersionDetail {
  id: string;
  version: string;
  title: string;
  status: "stable" | "beta" | "new";
  releaseDate: string;
  description: string;
  features: string[];
  targetUsers: string[];
  frameworks: string[];
  pros: string[];
  cons: string[];
  useCase: string;
  path: string;
  color: string;
}

const versions: VersionDetail[] = [
  {
    id: "v1.0",
    version: "Versión 1.0",
    title: "Evaluación ISO 42001 Estándar",
    status: "stable",
    releaseDate: "Enero 2025",
    description: "Evaluación completa del nivel de madurez según la norma internacional ISO 42001:2023 para sistemas de gestión de inteligencia artificial.",
    features: [
      "Evaluación de 7 componentes clave",
      "Cuestionario detallado con 25+ preguntas",
      "Visualización con gráficos interactivos",
      "Generación de reporte PDF profesional",
      "Recomendaciones personalizadas",
      "Interfaz responsive y amigable"
    ],
    targetUsers: [
      "Organizaciones internacionales",
      "Empresas con operaciones globales",
      "Consultores de gestión de IA",
      "Profesionales de calidad y estándares",
      "Organizaciones sin requisitos legales específicos"
    ],
    frameworks: ["ISO 42001:2023"],
    pros: [
      "Basado en estándar internacional reconocido",
      "Enfoque integral de gestión de IA",
      "Ideal para certificación",
      "Aplicable a cualquier industria",
      "Proceso de evaluación estructurado"
    ],
    cons: [
      "No incluye requisitos legales específicos",
      "No aborda regulaciones locales",
      "Limitado a marco de gestión"
    ],
    useCase: "Ideal para organizaciones que buscan implementar o mejorar su sistema de gestión de IA según estándares internacionales, sin requerimientos legales específicos de Perú.",
    path: "/evaluacion",
    color: "border-blue-200"
  },
  {
    id: "v1.1",
    version: "Versión 1.1",
    title: "ISO 42001 + Marco Legal Peruano",
    status: "new",
    releaseDate: "Septiembre 2025",
    description: "Evaluación ampliada que combina la norma ISO 42001 con los requisitos específicos del Decreto Supremo 115-2025-PCM del Perú.",
    features: [
      "Evaluación ISO 42001 completa",
      "Cumplimiento del reglamento peruano",
      "Análisis comparativo de marcos",
      "Evaluación de 9 áreas legales",
      "Reporte de cumplimiento dual",
      "Recomendaciones legales específicas",
      "Matriz de alineación normativas"
    ],
    targetUsers: [
      "Organizaciones que operan en Perú",
      "Empresas peruanas con sistemas de IA",
      "Proveedores de IA en mercado peruano",
      "Consultores legales en tecnología",
      "Organizaciones con sede en Perú"
    ],
    frameworks: ["ISO 42001:2023", "DS 115-2025-PCM"],
    pros: [
      "Cumplimiento legal integral",
      "Evaluación dual (ISO + Legal)",
      "Específico para contexto peruano",
      "Incluye registro obligatorio",
      "Derechos ciudadanos",
      "Requisitos de transparencia"
    ],
    cons: [
      "Más extenso (40+ preguntas)",
      "Específico para regulación peruana",
      "Puede ser complejo para organizaciones pequeñas"
    ],
    useCase: "Esencial para organizaciones que operan en Perú y necesitan cumplir con el reglamento local de IA además de los estándares internacionales.",
    path: "/evaluacion-v1.1",
    color: "border-green-200"
  }
];

const statusColors = {
  stable: "bg-blue-100 text-blue-800",
  beta: "bg-yellow-100 text-yellow-800",
  new: "bg-green-100 text-green-800"
};

const statusLabels = {
  stable: "Estable",
  beta: "Beta",
  new: "Nuevo"
};

export default function VersionesPage() {
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
                <h1 className="text-3xl font-bold text-gray-900">Versiones de la Herramienta</h1>
                <h2 className="text-xl font-semibold text-gray-700">
                  Seleccione la versión que mejor se adapte a sus necesidades
                </h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/">Inicio</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cumplimiento-legal">Análisis Legal</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Quick Version Selector */}
        <VersionSelector />

        {/* Detailed Version Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {versions.map((version) => (
            <Card key={version.id} className={`shadow-lg border-2 ${version.color} hover:shadow-xl transition-shadow`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {version.version}
                      </CardTitle>
                      <Badge className={statusColors[version.status]}>
                        {statusLabels[version.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-lg text-gray-700">
                      {version.title}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Lanzamiento: {version.releaseDate}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Descripción</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {version.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Características Principales
                  </h3>
                  <ul className="space-y-2">
                    {version.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Users */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Usuarios Objetivo
                  </h3>
                  <div className="space-y-1">
                    {version.targetUsers.map((user, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{user}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    Marcos Normativos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {version.frameworks.map((framework, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Ventajas
                    </h4>
                    <ul className="space-y-1">
                      {version.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <Star className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                          <span className="text-xs text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Limitaciones
                    </h4>
                    <ul className="space-y-1">
                      {version.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <AlertTriangle className="text-orange-500 mt-0.5 flex-shrink-0" size={12} />
                          <span className="text-xs text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Use Case */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Caso de Uso Recomendado
                  </h4>
                  <p className="text-sm text-gray-700">
                    {version.useCase}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button asChild className="flex-1">
                    <Link href={version.path}>
                      {version.status === "new" ? "Probar Nueva Versión" : "Comenzar Evaluación"}
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={version.path === "/evaluacion" ? "/resultados" : "/resultados-v1.1"}>
                      Ver Ejemplo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-800">Comparación Detallada</CardTitle>
            <CardDescription>
              Tabla comparativa de características entre versiones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                      Característica
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-800">
                      Versión 1.0
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-800">
                      Versión 1.1
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Marco Normativo
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ISO 42001:2023
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      ISO 42001:2023 + DS 115-2025-PCM
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Número de Preguntas
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      25+
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      40+
                    </td>
                  </tr>
                    <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Enfoque Geográfico
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      Internacional
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      Perú + Internacional
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Requisitos Legales
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      No incluidos
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      Incluidos y detallados
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Registro de Sistemas
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      No aplicable
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      Evaluado
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Derechos Ciudadanos
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      No abordados
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      Evaluados específicamente
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Tiempo Estimado
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      10-15 minutos
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      15-20 minutos
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                      Reporte de Resultados
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      PDF estándar
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      PDF con análisis dual
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Guide */}
        <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6" />
              ¿Qué Versión Elegir?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Elija Versión 1.0 si:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Su organización opera principalmente fuera de Perú</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Busca certificación ISO 42001 internacional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">No tiene requisitos legales específicos de Perú</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Prefiere una evaluación más rápida y enfocada</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Elija Versión 1.1 si:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Su organización opera en Perú</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Necesita cumplir con el DS 115-2025-PCM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Implementa sistemas de IA de alto riesgo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-300 mt-1 flex-shrink-0" size={20} />
                    <span className="text-blue-100">Busca cumplimiento legal integral</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-blue-100 mb-4">
                ¿Aún tiene dudas? Consulte nuestro análisis comparativo detallado
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/cumplimiento-legal">
                    Ver Análisis Legal
                  </Link>
                </Button>
                <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/">
                    Volver al Inicio
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}