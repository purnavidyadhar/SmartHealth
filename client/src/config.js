const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
console.log('Environment:', isLocal ? 'Local' : 'Production', 'API_URL:', isLocal ? 'http://localhost:5000' : 'Relative');
export const API_URL = isLocal ? 'http://localhost:5000' : ''; // Relative path for Vercel deployment
