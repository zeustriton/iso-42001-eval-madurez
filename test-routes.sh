#!/bin/bash

# Script para probar todas las rutas de la aplicación
echo "🔍 Testing all routes of the application..."
echo ""

# Array of routes to test
routes=(
  "/"
  "/versiones"
  "/evaluacion"
  "/evaluacion-v1.1"
  "/resultados"
  "/resultados-v1.1"
  "/cumplimiento-legal"
  "/api/health"
)

# Test each route
for route in "${routes[@]}"; do
  echo "📍 Testing route: $route"
  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route" 2>/dev/null || echo "000")
  
  if [ "$response" == "200" ]; then
    echo "✅ $route - OK ($response)"
  elif [ "$response" == "000" ]; then
    echo "❌ $route - Connection failed"
  else
    echo "⚠️  $route - Status: $response"
  fi
  echo ""
done

echo "🎯 Route testing completed!"