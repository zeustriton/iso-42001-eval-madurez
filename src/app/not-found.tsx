import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
          <p className="text-gray-600 mb-6">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Volver al Inicio</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/versiones">Ver Versiones</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}