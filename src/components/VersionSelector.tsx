import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VersionInfo {
  id: string;
  version: string;
  title: string;
  description: string;
  features: string[];
  status: "stable" | "beta" | "new";
  path: string;
  color: string;
}

const versions: VersionInfo[] = [
  {
    id: "v1.0",
    version: "Versión 1.0",
    title: "Evaluación ISO 42001 Estándar",
    description: "Evaluación completa del nivel de madurez según la norma internacional ISO 42001",
    features: [
      "7 componentes de evaluación",
      "Gráficos interactivos",
      "Reporte PDF",
      "Recomendaciones de mejora"
    ],
    status: "stable",
    path: "/evaluacion",
    color: "border-blue-200 hover:border-blue-500"
  },
  {
    id: "v1.1",
    version: "Versión 1.1",
    title: "ISO 42001 + Marco Legal Peruano",
    description: "Evaluación ampliada que incluye cumplimiento del DS 115-2025-PCM",
    features: [
      "Evaluación ISO 42001 completa",
      "Cumplimiento del reglamento peruano",
      "Análisis comparativo",
      "Reporte de cumplimiento legal",
      "Recomendaciones específicas"
    ],
    status: "new",
    path: "/evaluacion-v1.1",
    color: "border-green-200 hover:border-green-500"
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

export function VersionSelector() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seleccionar Versión de Evaluación</h2>
        <p className="text-gray-600">Elija la versión que mejor se adapte a sus necesidades</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {versions.map((version) => (
          <Card 
            key={version.id} 
            className={`border-2 ${version.color} transition-all duration-200 hover:shadow-lg cursor-pointer group`}
          >
            <Link href={version.path}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {version.version}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      {version.title}
                    </CardDescription>
                  </div>
                  <Badge className={statusColors[version.status]}>
                    {statusLabels[version.status]}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {version.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-medium text-gray-800 text-sm">Características:</h4>
                  <ul className="space-y-1">
                    {version.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg 
                          className="w-4 h-4 text-green-500 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={version.status === "new" ? "default" : "outline"}
                >
                  {version.status === "new" ? "Probar Nueva Versión" : "Comenzar Evaluación"}
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">¿No está seguro de qué versión elegir?</h3>
          <p className="text-blue-700 text-sm mb-3">
            Si su organización opera en Perú o necesita cumplir con el reglamento local, 
            recomendamos la Versión 1.1 que incluye el marco legal peruano.
          </p>
          <Link href="/cumplimiento-legal">
            <Button variant="outline" size="sm">
              Comparar Versiones
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}