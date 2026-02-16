const isLocal = window.location.hostname === 'localhost';
export const API_URL = isLocal ? 'http://localhost:5000' : ''; // Relative path for Vercel deployment
