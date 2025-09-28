"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Info, FileText, Shield, Scale } from "lucide-react";

// Importar datos y funciones necesarias
import { peruvianRegulationQuestions, regulationSections, complianceLevels } from "@/lib/data/peruvian-regulation-questions";
import { complianceDeadlines, calculateTimeRemaining, getDeadlineByOrganizationType } from "@/lib/data/compliance-deadlines";

// Registrar componentes de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement);

// Definición de las secciones de evaluación ISO 42001
const isoEvaluationSections = [
  { id: "contexto", title: "Contexto de la Organización", color: "rgba(54, 162, 235, 0.6)" },
  { id: "liderazgo", title: "Liderazgo", color: "rgba(255, 99, 132, 0.6)" },
  { id: "planificacion", title: "Planificación", color: "rgba(255, 206, 86, 0.6)" },
  { id: "apoyo", title: "Apoyo", color: "rgba(75, 192, 192, 0.6)" },
  { id: "operacion", title: "Operación", color: "rgba(153, 102, 255, 0.6)" },
  { id: "evaluacion", title: "Evaluación del Desempeño", color: "rgba(255, 159, 64, 0.6)" },
  { id: "mejora", title: "Mejora", color: "rgba(199, 199, 199, 0.6)" }
];

// Mapeo de preguntas ISO a secciones
const isoQuestionToSection = {
  contexto_1: "contexto", contexto_2: "contexto",
  liderazgo_1: "liderazgo"
};

// Mapeo de preguntas del reglamento peruano a secciones
const regulationQuestionToSection = peruvianRegulationQuestions.reduce((acc, question) => {
  acc[question.id] = question.section;
  return acc;
}, {} as Record<string, string>);

// Niveles de madurez ISO
const isoMaturityLevels = [
  { min: 0, max: 1.5, level: "Inicial", description: "Requisitos no implementados o muy básicos", color: "text-red-600" },
  { min: 1.6, max: 2.5, level: "Básico", description: "Implementación inicial y no sistemática", color: "text-orange-600" },
  { min: 2.6, max: 3.5, level: "Intermedio", description: "Implementación parcial en algunas áreas", color: "text-yellow-600" },
  { min: 3.6, max: 4.5, level: "Avanzado", description: "Implementación en la mayoría de las áreas", color: "text-blue-600" },
  { min: 4.6, max: 5, level: "Óptimo", description: "Implementación completa y documentada", color: "text-green-600" }
];

// Componente que usa useSearchParams
function ResultadosV11Content() {
  const searchParams = useSearchParams();
  const [isoScores, setIsoScores] = useState<Record<string, number>>({});
  const [legalScores, setLegalScores] = useState<Record<string, number>>({});
  const [overallIsoScore, setOverallIsoScore] = useState(0);
  const [overallLegalScore, setOverallLegalScore] = useState(0);
  const [isoMaturityLevel, setIsoMaturityLevel] = useState(isoMaturityLevels[0]);
  const [legalComplianceLevel, setLegalComplianceLevel] = useState(complianceLevels[0]);
  const [organizationType, setOrganizationType] = useState<string>("sector_privado_medianas");
  const [timeRemaining, setTimeRemaining] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parsear los parámetros de búsqueda para obtener las respuestas
    const responses: Record<string, number> = {};
    let orgType = "sector_privado_medianas"; // valor por defecto
    
    searchParams.forEach((value, key) => {
      if (key === 'organizationType') {
        orgType = value;
      } else {
        responses[key] = parseInt(value);
      }
    });
    
    setOrganizationType(orgType);
    
    // Calcular tiempo restante
    const deadline = getDeadlineByOrganizationType(orgType);
    if (deadline) {
      setTimeRemaining(calculateTimeRemaining(deadline));
    }

    // Separar respuestas ISO y legales
    const isoResponses: Record<string, number> = {};
    const legalResponses: Record<string, number> = {};

    Object.entries(responses).forEach(([questionId, score]) => {
      if (isoQuestionToSection[questionId as keyof typeof isoQuestionToSection]) {
        isoResponses[questionId] = score;
      } else if (regulationQuestionToSection[questionId]) {
        legalResponses[questionId] = score;
      }
    });

    // Calcular puntuaciones ISO
    const isoSectionScores: Record<string, { total: number; count: number }> = {};
    Object.entries(isoResponses).forEach(([questionId, score]) => {
      const sectionId = isoQuestionToSection[questionId as keyof typeof isoQuestionToSection];
      if (sectionId) {
        if (!isoSectionScores[sectionId]) {
          isoSectionScores[sectionId] = { total: 0, count: 0 };
        }
        isoSectionScores[sectionId].total += score;
        isoSectionScores[sectionId].count += 1;
      }
    });

    const calculatedIsoScores: Record<string, number> = {};
    Object.entries(isoSectionScores).forEach(([sectionId, data]) => {
      calculatedIsoScores[sectionId] = data.total / data.count;
    });
    setIsoScores(calculatedIsoScores);

    // Calcular puntuación general ISO
    const isoTotalScore = Object.values(calculatedIsoScores).reduce((sum, score) => sum + score, 0);
    const isoAverageScore = isoTotalScore / Object.keys(calculatedIsoScores).length || 0;
    setOverallIsoScore(isoAverageScore);

    // Determinar nivel de madurez ISO
    const isoLevel = isoMaturityLevels.find(level => isoAverageScore >= level.min && isoAverageScore <= level.max) || isoMaturityLevels[0];
    setIsoMaturityLevel(isoLevel);

    // Calcular puntuaciones legales
    const legalSectionScores: Record<string, { total: number; count: number }> = {};
    Object.entries(legalResponses).forEach(([questionId, score]) => {
      const sectionId = regulationQuestionToSection[questionId];
      if (sectionId) {
        if (!legalSectionScores[sectionId]) {
          legalSectionScores[sectionId] = { total: 0, count: 0 };
        }
        legalSectionScores[sectionId].total += score;
        legalSectionScores[sectionId].count += 1;
      }
    });

    const calculatedLegalScores: Record<string, number> = {};
    Object.entries(legalSectionScores).forEach(([sectionId, data]) => {
      calculatedLegalScores[sectionId] = data.total / data.count;
    });
    setLegalScores(calculatedLegalScores);

    // Calcular puntuación general legal
    const legalTotalScore = Object.values(calculatedLegalScores).reduce((sum, score) => sum + score, 0);
    const legalAverageScore = legalTotalScore / Object.keys(calculatedLegalScores).length || 0;
    setOverallLegalScore(legalAverageScore);

    // Determinar nivel de cumplimiento legal
    const legalLevel = complianceLevels.find(level => legalAverageScore >= level.min && legalAverageScore <= level.max) || complianceLevels[0];
    setLegalComplianceLevel(legalLevel);
  }, [searchParams]);

  const generatePDF = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (reportRef.current) {
      // Declarar variables fuera del try para que estén disponibles en el catch
      const button = event?.currentTarget;
      const originalText = button?.textContent || "Generar PDF";
      
      try {
        // Mostrar indicador de carga
        if (button) {
          button.textContent = "Generando PDF...";
          button.disabled = true;
        }

        // Configurar opciones para html2canvas
        const canvas = await html2canvas(reportRef.current, {
          scale: 1.2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#ffffff',
          logging: false,
          width: reportRef.current.scrollWidth,
          height: reportRef.current.scrollHeight,
          scrollX: 0,
          scrollY: -window.scrollY,
          removeContainer: true,
          foreignObjectRendering: true
        });
        
        const imgData = canvas.toDataURL('image/png', 0.8);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth - 20; // 10mm margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 15; // Top margin

        // Add first page with title
        pdf.setFontSize(18);
        pdf.text('Evaluación del Nivel de Madurez v1.1', pdfWidth / 2, 15, { align: 'center' });
        pdf.setFontSize(14);
        pdf.text('ISO 42001 + Reglamento Peruano DS 115-2025-PCM', pdfWidth / 2, 25, { align: 'center' });
        position = 35;
        
        // Add image
        if (imgHeight <= pdfHeight - 40) {
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        } else {
          // Add first part of image
          const firstPageHeight = pdfHeight - 40;
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, firstPageHeight);
          heightLeft -= firstPageHeight;
          
          // Add remaining pages
          while (heightLeft > 0) {
            pdf.addPage();
            position = 15;
            const nextPageHeight = Math.min(heightLeft, pdfHeight - 30);
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, nextPageHeight, undefined, 'FAST');
            heightLeft -= nextPageHeight;
          }
        }

        // Save the PDF
        pdf.save('evaluacion_iso_42001_v1.1.pdf');
        
        // Restaurar el botón
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('No se pudo generar el PDF. Por favor, intente nuevamente.');
        
        // Restaurar el botón en caso de error
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      }
    }
  };

  const getIsoRecommendations = () => {
    const recommendations: string[] = [];
    
    Object.entries(isoScores).forEach(([sectionId, score]) => {
      const section = isoEvaluationSections.find(s => s.id === sectionId);
      if (section && score < 3) {
        switch (sectionId) {
          case "contexto":
            recommendations.push("Desarrollar un análisis más profundo del contexto organizacional y las partes interesadas");
            break;
          case "liderazgo":
            recommendations.push("Fortalecer el compromiso de la alta dirección y establecer políticas claras de IA");
            break;
          case "planificacion":
            recommendations.push("Implementar un sistema formal de gestión de riesgos de IA y objetivos claros");
            break;
          case "apoyo":
            recommendations.push("Asegurar recursos adecuados, competencias del personal y procesos de comunicación");
            break;
          case "operacion":
            recommendations.push("Estandarizar los procesos operativos y controles para sistemas de IA");
            break;
          case "evaluacion":
            recommendations.push("Establecer sistemas de monitoreo, auditoría interna y revisión por dirección");
            break;
          case "mejora":
            recommendations.push("Implementar procesos sistemáticos de mejora continua y acciones correctivas");
            break;
        }
      }
    });

    return recommendations;
  };

  const getLegalRecommendations = () => {
    const recommendations: string[] = [];
    
    Object.entries(legalScores).forEach(([sectionId, score]) => {
      const section = regulationSections.find(s => s.id === sectionId);
      if (section && score < 3) {
        switch (sectionId) {
          case "registro":
            recommendations.push("Iniciar el proceso de registro de sistemas de IA ante la autoridad competente");
            break;
          case "evaluacion":
            recommendations.push("Implementar un sistema formal de evaluación de impacto previa para sistemas de IA");
            break;
          case "transparencia":
            recommendations.push("Mejorar los mecanismos de transparencia y explicabilidad de los sistemas de IA");
            break;
          case "derechos":
            recommendations.push("Establecer canales efectivos para que los ciudadanos ejerzan sus derechos");
            break;
          case "seguridad":
            recommendations.push("Fortalecer las medidas de seguridad y protección de datos personales");
            break;
          case "supervision":
            recommendations.push("Implementar sistemas internos de supervisión y fiscalización");
            break;
          case "documentacion":
            recommendations.push("Mejorar la documentación de cumplimiento y evidencias");
            break;
          case "recursos":
            recommendations.push("Capacitar al personal sobre el reglamento de IA y sus requisitos");
            break;
          case "riesgos":
            recommendations.push("Implementar un sistema específico de gestión de riesgos según el reglamento");
            break;
        }
      }
    });

    return recommendations;
  };

  // Datos para gráficos ISO
  const isoChartData = {
    labels: isoEvaluationSections.map(section => section.title),
    datasets: [
      {
        label: 'Nivel de Madurez ISO',
        data: isoEvaluationSections.map(section => isoScores[section.id] || 0),
        backgroundColor: isoEvaluationSections.map(section => section.color),
        borderColor: isoEvaluationSections.map(section => section.color.replace('0.6', '1')),
        borderWidth: 2,
      },
    ],
  };

  // Datos para gráficos legales
  const legalChartData = {
    labels: regulationSections.map(section => section.title),
    datasets: [
      {
        label: 'Nivel de Cumplimiento Legal',
        data: regulationSections.map(section => legalScores[section.id] || 0),
        backgroundColor: regulationSections.map(section => section.color),
        borderColor: regulationSections.map(section => section.color.replace('0.6', '1')),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Nivel: ${context.parsed.r.toFixed(1)}/5`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="py-6 mb-6">
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
                <h1 className="text-3xl font-bold text-gray-900">Resultados de la Evaluación v1.1</h1>
                <h2 className="text-xl font-semibold text-gray-700">ISO 42001 + Reglamento Peruano DS 115-2025-PCM</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/evaluacion-v1.1">Volver a Evaluación</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Inicio</Link>
              </Button>
            </div>
          </div>
          <p className="text-gray-700">
            Análisis completo del nivel de madurez y cumplimiento legal de su organización
          </p>
        </header>

        {/* Plazos de Cumplimiento */}
        {timeRemaining && (
          <Card className={`shadow-lg ${timeRemaining.isOverdue ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                Plazo de Cumplimiento para su Organización
              </CardTitle>
              <CardDescription>
                Según el DS 115-2025-PCM, su organización tiene el siguiente plazo para implementar los requisitos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Información de la organización */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Tipo de Organización</h3>
                  <div className="bg-white rounded-lg p-4">
                    {complianceDeadlines.find(d => d.id === organizationType) && (
                      <>
                        <p className="font-medium text-gray-800">
                          {complianceDeadlines.find(d => d.id === organizationType)?.organizationType}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {complianceDeadlines.find(d => d.id === organizationType)?.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Contador dinámico */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Tiempo Restante</h3>
                  <div className={`text-center p-6 rounded-lg ${
                    timeRemaining.isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    <div className="text-3xl font-bold mb-2">
                      {timeRemaining.formattedText}
                    </div>
                    <div className="text-sm opacity-75">
                      Fecha límite: {getDeadlineByOrganizationType(organizationType)?.toLocaleDateString('es-PE')}
                    </div>
                  </div>
                </div>

                {/* Nivel de prioridad */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Prioridad de Cumplimiento</h3>
                  <div className="bg-white rounded-lg p-4">
                    {complianceDeadlines.find(d => d.id === organizationType) && (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${
                            complianceDeadlines.find(d => d.id === organizationType)?.priority === 'alta' ? 'bg-red-500' :
                            complianceDeadlines.find(d => d.id === organizationType)?.priority === 'media' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className="font-medium text-gray-800">
                            Prioridad {complianceDeadlines.find(d => d.id === organizationType)?.priority}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {complianceDeadlines.find(d => d.id === organizationType)?.priority === 'alta' && 'Requiere acción inmediata'}
                          {complianceDeadlines.find(d => d.id === organizationType)?.priority === 'media' && 'Planificación requerida'}
                          {complianceDeadlines.find(d => d.id === organizationType)?.priority === 'baja' && 'Preparación gradual'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report Content */}
        <div ref={reportRef} className="space-y-6">
          {/* Dual Compliance Dashboard */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Resumen General de Cumplimiento</CardTitle>
              <CardDescription>
                Evaluación dual de madurez ISO 42001 y cumplimiento legal peruano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* ISO 42001 Score */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="text-blue-600" size={24} />
                    <h3 className="text-xl font-semibold text-blue-800">ISO 42001</h3>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {overallIsoScore.toFixed(1)}/5
                    </div>
                    <div className={`text-lg font-semibold mb-2 ${isoMaturityLevel.color}`}>
                      {isoMaturityLevel.level}
                    </div>
                    <div className="text-sm text-gray-600">Nivel de Madurez</div>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="text-sm text-gray-700">{isoMaturityLevel.description}</p>
                  </div>
                </div>

                {/* Legal Compliance Score */}
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-red-600" size={24} />
                    <h3 className="text-xl font-semibold text-red-800">DS 115-2025-PCM</h3>
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-red-600 mb-2">
                      {overallLegalScore.toFixed(1)}/5
                    </div>
                    <div className={`text-lg font-semibold mb-2 ${legalComplianceLevel.color}`}>
                      {legalComplianceLevel.level}
                    </div>
                    <div className="text-sm text-gray-600">Nivel de Cumplimiento</div>
                  </div>
                  <div className="p-3 bg-white rounded">
                    <p className="text-sm text-gray-700">{legalComplianceLevel.description}</p>
                  </div>
                </div>
              </div>

              {/* Overall Status */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Estado General de Cumplimiento</h4>
                    <div className="flex items-center gap-2">
                      {overallIsoScore >= 3.5 && overallLegalScore >= 3.5 ? (
                        <>
                          <CheckCircle className="text-green-500" size={20} />
                          <span className="text-green-700 font-medium">Buen nivel de cumplimiento en ambos marcos</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="text-yellow-500" size={20} />
                          <span className="text-yellow-700 font-medium">Se requieren mejoras en uno o ambos marcos</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      {((overallIsoScore + overallLegalScore) / 2).toFixed(1)}/5
                    </div>
                    <div className="text-sm text-gray-600">Puntuación Combinada</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISO 42001 Radar Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Análisis ISO 42001</CardTitle>
                <CardDescription>
                  Nivel de madurez en cada componente de la norma ISO 42001
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Radar data={isoChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>

            {/* Legal Compliance Radar Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">Análisis Legal</CardTitle>
                <CardDescription>
                  Nivel de cumplimiento en cada área del reglamento peruano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Radar data={legalChartData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISO Detailed Scores */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Puntuaciones ISO 42001</CardTitle>
                <CardDescription>
                  Desglose detallado por componente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {isoEvaluationSections.map(section => {
                    const score = isoScores[section.id] || 0;
                    const level = isoMaturityLevels.find(level => score >= level.min && score <= level.max);
                    return (
                      <div key={section.id} className="border-l-4 pl-4" style={{ borderLeftColor: section.color.replace('0.6', '1') }}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{section.title}</h4>
                          <span className="text-sm font-bold">{score.toFixed(1)}/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(score / 5) * 100}%`,
                              backgroundColor: section.color.replace('0.6', '1')
                            }}
                          ></div>
                        </div>
                        {level && (
                          <span className={`text-xs ${level.color}`}>
                            {level.level}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legal Detailed Scores */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">Puntuaciones Legales</CardTitle>
                <CardDescription>
                  Desglose detallado por área del reglamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regulationSections.map(section => {
                    const score = legalScores[section.id] || 0;
                    const level = complianceLevels.find(level => score >= level.min && score <= level.max);
                    return (
                      <div key={section.id} className="border-l-4 pl-4" style={{ borderLeftColor: section.color.replace('0.6', '1') }}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{section.title}</h4>
                          <span className="text-sm font-bold">{score.toFixed(1)}/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(score / 5) * 100}%`,
                              backgroundColor: section.color.replace('0.6', '1')
                            }}
                          ></div>
                        </div>
                        {level && (
                          <span className={`text-xs ${level.color}`}>
                            {level.level}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* ISO Recommendations */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800">Recomendaciones ISO 42001</CardTitle>
                <CardDescription>
                  Sugerencias para mejorar el nivel de madurez
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getIsoRecommendations().length > 0 ? (
                  <ul className="space-y-3">
                    {getIsoRecommendations().map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{recommendation}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-2" />
                    <p className="text-gray-700 text-sm">¡Buen nivel de madurez ISO 42001!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Legal Recommendations */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">Recomendaciones Legales</CardTitle>
                <CardDescription>
                  Acciones requeridas para cumplimiento del reglamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getLegalRecommendations().length > 0 ? (
                  <ul className="space-y-3">
                    {getLegalRecommendations().map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-red-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{recommendation}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-2" />
                    <p className="text-gray-700 text-sm">¡Buen nivel de cumplimiento legal!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800 flex items-center gap-2">
                <Scale className="w-6 h-6" />
                Estado de Cumplimiento Integral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${overallIsoScore >= 3.5 ? 'text-green-600' : overallIsoScore >= 2.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {overallIsoScore >= 3.5 ? '✓' : overallIsoScore >= 2.5 ? '⚠' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">ISO 42001</div>
                  <div className="text-xs text-gray-500">{overallIsoScore.toFixed(1)}/5</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${overallLegalScore >= 3.5 ? 'text-green-600' : overallLegalScore >= 2.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {overallLegalScore >= 3.5 ? '✓' : overallLegalScore >= 2.5 ? '⚠' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">Legal Peruano</div>
                  <div className="text-xs text-gray-500">{overallLegalScore.toFixed(1)}/5</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${((overallIsoScore + overallLegalScore) / 2) >= 3.5 ? 'text-green-600' : ((overallIsoScore + overallLegalScore) / 2) >= 2.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {((overallIsoScore + overallLegalScore) / 2) >= 3.5 ? '✓' : ((overallIsoScore + overallLegalScore) / 2) >= 2.5 ? '⚠' : '✗'}
                  </div>
                  <div className="text-sm text-gray-600">Integral</div>
                  <div className="text-xs text-gray-500">{((overallIsoScore + overallLegalScore) / 2).toFixed(1)}/5</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">Interpretación de Resultados</h4>
                    <p className="text-sm text-purple-700">
                      {overallIsoScore >= 3.5 && overallLegalScore >= 3.5 
                        ? "Su organización demuestra un buen nivel de cumplimiento en ambos marcos normativos. Mantenga y mejore sus prácticas actuales."
                        : overallIsoScore >= 2.5 && overallLegalScore >= 2.5
                        ? "Su organización muestra un nivel moderado de cumplimiento. Se recomienda implementar las mejoras sugeridas."
                        : "Su organización requiere mejoras significativas en uno o ambos marcos normativos. Priorice las acciones recomendadas."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800">Exportar Resultados</CardTitle>
              <CardDescription>
                Descargue sus resultados en diferentes formatos para compartir con su equipo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={(e) => generatePDF(e)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Descargar PDF Completo
                </Button>
                <Button variant="outline">
                  Compartir por Email
                </Button>
                <Button variant="outline">
                  Imprimir Resultados
                </Button>
                <Link href="/cumplimiento-legal">
                  <Button variant="outline">
                    Ver Análisis Comparativo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Componente principal con Suspense
export default function ResultadosV11Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Cargando resultados...</p>
        </div>
      </div>
    }>
      <ResultadosV11Content />
    </Suspense>
  );
}