"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h1>
              <p className="text-gray-600 mb-4">
                Ha ocurrido un error inesperado.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <p className="text-sm text-red-600 mb-4 font-mono">
                  {error.message}
                </p>
              )}
              <div className="space-y-3">
                <Button onClick={() => reset()} className="w-full">
                  Intentar nuevamente
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}