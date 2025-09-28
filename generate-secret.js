// Script para generar un secreto para NextAuth
const crypto = require('crypto');

// Generar un secreto aleatorio de 32 bytes
const secret = crypto.randomBytes(32).toString('hex');

console.log('=====================================');
console.log('NEXTAUTH_SECRET:');
console.log(secret);
console.log('=====================================');
console.log('Copia este valor y pégalo en tus variables de entorno de Vercel');
console.log('=====================================');