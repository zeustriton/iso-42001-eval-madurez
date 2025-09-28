"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Link from "next/link";

// Importar datos de preguntas
interface Question {
  id: string;
  section: string;
  question: string;
  description: string;
  type: string;
  options: Array<{
    value: number;
    label: string;
    explanation?: string;
  }>;
  framework: string;
  legalReference?: string;
}

const isoQuestions: Question[] = [
  {
    id: "contexto_1",
    section: "Contexto de la Organización",
    question: "¿Su organización ha analizado el contexto externo e interno relacionado con sus sistemas de IA?",
    description: "Incluyendo requisitos legales, políticas, cultura organizacional y objetivos estratégicos.",
    type: "single",
    framework: "ISO 42001",
    options: [
      { value: 1, label: "No hemos realizado ningún análisis" },
      { value: 2, label: "Hemos realizado un análisis muy básico" },
      { value: 3, label: "Tenemos un análisis parcial de algunos aspectos" },
      { value: 4, label: "Hemos analizado la mayoría de los aspectos relevantes" },
      { value: 5, label: "Contamos con un análisis completo y actualizado regularmente" }
    ]
  },
  {
    id: "contexto_2",
    section: "Contexto de la Organización",
    question: "¿Ha identificado a todas las partes interesadas relevantes para sus sistemas de IA?",
    description: "Incluyendo usuarios, reguladores, sociedad civil, personal, etc.",
    type: "single",
    framework: "ISO 42001",
    options: [
      { value: 1, label: "No hemos identificado partes interesadas" },
      { value: 2, label: "Hemos identificado algunas partes interesadas básicas" },
      { value: 3, label: "Hemos identificado la mayoría de las partes interesadas" },
      { value: 4, label: "Hemos identificado todas las partes interesadas relevantes" },
      { value: 5, label: "Mantenemos un registro actualizado y gestionamos activamente las relaciones" }
    ]
  },
  {
    id: "liderazgo_1",
    section: "Liderazgo",
    question: "¿La alta dirección demuestra compromiso con el sistema de gestión de IA?",
    description: "Incluyendo asignación de recursos, participación en revisiones y comunicación de la importancia.",
    type: "single",
    framework: "ISO 42001",
    options: [
      { value: 1, label: "No hay compromiso visible de la alta dirección" },
      { value: 2, label: "El compromiso es limitado o informal" },
      { value: 3, label: "Existe compromiso pero necesita fortalecerse" },
      { value: 4, label: "La alta dirección muestra un buen nivel de compromiso" },
      { value: 5, label: "La alta dirección está totalmente comprometida y participa activamente" }
    ]
  }
];

// Importar preguntas del reglamento peruano
import { peruvianRegulationQuestions, regulationSections } from "@/lib/data/peruvian-regulation-questions";

// Combinar todas las preguntas para la evaluación v1.1
const allQuestions: Question[] = [
  ...isoQuestions,
  ...peruvianRegulationQuestions.map(q => ({ 
    ...q, 
    framework: "DS 115-2025-PCM",
    legalReference: q.legalReference 
  }))
];

// Agrupar preguntas por sección
const questionsBySection: Record<string, Question[]> = allQuestions.reduce((acc, question) => {
  if (!acc[question.section]) {
    acc[question.section] = [];
  }
  acc[question.section].push(question);
  return acc;
}, {} as Record<string, Question[]>);

// Importar el componente de plazos
import ComplianceDeadlines from "@/components/compliance-deadlines";

// Componente principal con Suspense
function EvaluacionV11Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [organizationType, setOrganizationType] = useState<string>("sector_privado_medianas");
  
  // Obtener secciones únicas en orden
  const sections = Object.keys(questionsBySection);
  
  // Obtener preguntas de la sección actual
  const currentQuestions = questionsBySection[sections[currentSection]] || [];
  
  // Calcular progreso
  const totalQuestions = allQuestions.length;
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleOrganizationTypeChange = (type: string) => {
    setOrganizationType(type);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const submitEvaluation = () => {
    // Construir URL con parámetros
    const params = new URLSearchParams();
    Object.entries(responses).forEach(([key, value]) => {
      params.append(key, value.toString());
    });
    params.append('organizationType', organizationType);
    
    router.push(`/resultados-v1.1?${params.toString()}`);
  };

  const isCurrentSectionComplete = currentQuestions.every(q => responses[q.id] !== undefined);
  const canProceed = currentSection < sections.length - 1 || isCurrentSectionComplete;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
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
                <h1 className="text-3xl font-bold text-gray-900">Evaluación v1.1</h1>
                <h2 className="text-xl font-semibold text-gray-700">ISO 42001 + Marco Legal Peruano</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/">Inicio</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/versiones">Versiones</Link>
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progreso General
              </span>
              <span className="text-sm text-gray-600">
                {answeredQuestions} / {totalQuestions} preguntas
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2">
              <span className="text-sm text-gray-600">
                Sección {currentSection + 1} de {sections.length}: {sections[currentSection]}
              </span>
            </div>
          </div>
        </header>

        {/* Plazos de Cumplimiento */}
        <div id="plazos-cumplimiento" className="mb-8">
          <ComplianceDeadlines 
            onOrganizationTypeSelect={handleOrganizationTypeChange}
            selectedType={organizationType}
            compact={true}
          />
        </div>

        {/* Current Section */}
        <Card className="shadow-lg mb-6" id="evaluacion-form">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-blue-800 mb-2">
                  {sections[currentSection]}
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Evalúe su organización en los siguientes aspectos. Sea honesto en sus respuestas para obtener un diagnóstico preciso.
                </CardDescription>
              </div>
              <Badge variant="outline" className="ml-4">
                {currentQuestions.length} preguntas
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {currentQuestions.map((question, index) => (
                <div key={question.id} className="border-l-4 border-blue-200 pl-6 py-2">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {question.question}
                        </h3>
                        <Badge 
                          variant={question.framework === "ISO 42001" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {question.framework}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {question.description}
                      </p>
                      
                      {/* Referencia legal para preguntas del reglamento peruano */}
                      {question.framework === "DS 115-2025-PCM" && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-red-800">
                                Referencia Legal
                              </p>
                              <p className="text-xs text-red-700">
                                {question.legalReference}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                              responses[question.id] === option.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={responses[question.id] === option.value}
                              onChange={() => handleResponse(question.id, option.value)}
                              className="mr-3"
                            />
                            <div>
                              <span className="font-medium text-gray-800">
                                {option.label}
                              </span>
                              {option.explanation && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {option.explanation}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection === 0}
          >
            Anterior
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Sección {currentSection + 1} de {sections.length}
            </p>
          </div>
          
          {currentSection < sections.length - 1 ? (
            <Button
              onClick={nextSection}
              disabled={!isCurrentSectionComplete}
            >
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={submitEvaluation}
              disabled={!isCurrentSectionComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Ver Resultados
            </Button>
          )}
        </div>

        {/* Section Overview */}
        <Card className="mt-6 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Resumen de la Evaluación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Secciones Evaluadas:</h4>
                <div className="space-y-1">
                  {sections.map((section, index) => (
                    <div key={section} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        index < currentSection ? "bg-green-500" : 
                        index === currentSection ? "bg-blue-500" : "bg-gray-300"
                      }`} />
                      <span className={index <= currentSection ? "text-gray-800" : "text-gray-500"}>
                        {section}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Marcos Evaluados:</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-800">ISO 42001 - Sistema de Gestión de IA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-gray-800">DS 115-2025-PCM - Reglamento Peruano</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Componente de página principal con Suspense
export default function EvaluacionV11Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando evaluación...</p>
          </div>
        </div>
      </div>
    }>
      <EvaluacionV11Content />
    </Suspense>
  );
}