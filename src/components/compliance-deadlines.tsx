"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  complianceDeadlines, 
  calculateTimeRemaining, 
  getSpecificRequirements,
  getDeadlineByOrganizationType 
} from "@/lib/data/compliance-deadlines";

interface ComplianceDeadlinesProps {
  onOrganizationTypeSelect?: (type: string) => void;
  selectedType?: string;
  compact?: boolean; // Nueva prop para modo compacto
}

export default function ComplianceDeadlines({ 
  onOrganizationTypeSelect, 
  selectedType: propSelectedType,
  compact = false
}: ComplianceDeadlinesProps) {
  const [selectedType, setSelectedType] = useState<string>(propSelectedType || "sector_privado_medianas");
  const [timeRemaining, setTimeRemaining] = useState<any>(null);

  useEffect(() => {
    const deadline = getDeadlineByOrganizationType(selectedType);
    if (deadline) {
      setTimeRemaining(calculateTimeRemaining(deadline));
      
      // Actualizar cada hora
      const interval = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(deadline));
      }, 3600000);
      
      return () => clearInterval(interval);
    }
  }, [selectedType]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (onOrganizationTypeSelect) {
      onOrganizationTypeSelect(type);
    }
  };

  const selectedDeadline = complianceDeadlines.find(d => d.id === selectedType);
  const requirements = getSpecificRequirements(selectedType);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baja': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive' as const;
      case 'media': return 'default' as const;
      case 'baja': return 'secondary' as const;
      default: return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de tipo de organización - Solo mostrar en modo completo */}
      {!compact && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Seleccione su tipo de organización
            </CardTitle>
            <CardDescription>
              Los plazos de cumplimiento varían según el tipo de organización y su tamaño
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione el tipo de organización" />
              </SelectTrigger>
              <SelectContent>
                {complianceDeadlines.map((deadline) => (
                  <SelectItem key={deadline.id} value={deadline.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(deadline.priority)}`} />
                      {deadline.organizationType}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Información de plazos */}
      {selectedDeadline && timeRemaining && (
        <Card className={`${timeRemaining.isOverdue ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'}`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className={`text-xl text-gray-800 ${compact ? 'text-lg' : ''}`}>
                  {compact ? 'Plazo de Cumplimiento' : 'Plazo de Cumplimiento'}
                </CardTitle>
                {!compact && (
                  <CardDescription className="text-base">
                    {selectedDeadline.description}
                  </CardDescription>
                )}
              </div>
              <Badge variant={getPriorityVariant(selectedDeadline.priority)}>
                Prioridad {selectedDeadline.priority}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`grid ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-6`}>
              {/* Contador dinámico */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Tiempo Restante
                </h3>
                <div className={`text-center p-4 ${compact ? 'p-3' : 'p-6'} rounded-lg ${
                  timeRemaining.isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  <div className={`text-2xl ${compact ? 'text-xl' : 'text-3xl'} font-bold mb-2`}>
                    {timeRemaining.formattedText}
                  </div>
                  <div className="text-xs opacity-75">
                    Fecha límite: {selectedDeadline.deadline.toLocaleDateString('es-PE')}
                  </div>
                </div>
                
                {/* Barra de progreso de tiempo - Solo en modo completo */}
                {!compact && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso de tiempo</span>
                      <span>{Math.max(0, Math.min(100, 100 - (timeRemaining.totalDays / 1460) * 100)).toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={Math.max(0, Math.min(100, 100 - (timeRemaining.totalDays / 1460) * 100))} 
                      className="h-2"
                    />
                    <div className="text-xs text-gray-600 text-center">
                      Tiempo total para cumplimiento: 4 años
                    </div>
                  </div>
                )}
              </div>

              {/* Requisitos específicos - Versión compacta */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {compact ? 'Requisitos Clave' : 'Requisitos Aplicables'}
                </h3>
                <div className={`space-y-2 ${compact ? 'max-h-32' : 'max-h-64'} overflow-y-auto`}>
                  {(compact ? requirements.slice(0, 5) : requirements).map((req, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </div>
                  ))}
                  {compact && requirements.length > 5 && (
                    <div className="text-xs text-gray-500 italic">
                      + {requirements.length - 5} requisitos más...
                    </div>
                  )}
                </div>
                
                <div className="pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      const element = document.getElementById('evaluacion-form');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Ver Preguntas Relacionadas
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabla comparativa de plazos - Solo en modo completo */}
      {!compact && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              Tabla Comparativa de Plazos
            </CardTitle>
            <CardDescription>
              Resumen de los plazos de implementación según el DS 115-2025-PCM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Tipo de Organización</th>
                    <th className="text-left p-2">Prioridad</th>
                    <th className="text-left p-2">Fecha Límite</th>
                    <th className="text-left p-2">Requisitos Clave</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceDeadlines.map((deadline) => {
                    const time = calculateTimeRemaining(deadline.deadline);
                    return (
                      <tr key={deadline.id} className={`border-b hover:bg-gray-50 ${
                        deadline.id === selectedType ? 'bg-blue-50' : ''
                      }`}>
                        <td className="p-2 font-medium">{deadline.organizationType}</td>
                        <td className="p-2">
                          <Badge variant={getPriorityVariant(deadline.priority)} className="text-xs">
                            {deadline.priority}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-col">
                            <span>{deadline.deadline.toLocaleDateString('es-PE')}</span>
                            <span className={`text-xs ${time.isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                              {time.formattedText}
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-xs text-gray-600">
                            {deadline.requirements.slice(0, 3).join(', ')}
                            {deadline.requirements.length > 3 && '...'}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}