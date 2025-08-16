/**
 * Configuration pour le développement local
 * Ce fichier contient des utilitaires pour contourner les problèmes CORS en développement
 */

// Instructions pour résoudre le problème CORS côté backend
export const CORS_INSTRUCTIONS = `
🚨 PROBLÈME CORS DÉTECTÉ

Le serveur backend renvoie plusieurs valeurs pour 'Access-Control-Allow-Origin'.

SOLUTIONS:

1. CÔTÉ BACKEND (RECOMMANDÉ):
   - Vérifiez la configuration CORS dans votre serveur
   - Assurez-vous qu'un seul middleware CORS est utilisé
   - Configuration correcte pour Express.js:
   
   app.use(cors({
     origin: process.env.NODE_ENV === 'development' 
       ? ['http://localhost:3000'] 
       : ['https://your-domain.com'],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));

2. CÔTÉ FRONTEND (TEMPORAIRE):
   - Nous utilisons maintenant les routes API Next.js comme proxy
   - Cela évite complètement le problème CORS

3. POUR LE DÉVELOPPEMENT:
   - Utilisez un proxy comme "cors-anywhere" ou
   - Désactivez temporairement la sécurité CORS dans votre navigateur
   
STATUT: ✅ Contournement implémenté avec les routes API Next.js
`;

/**
 * Fonction pour détecter et signaler les problèmes CORS
 */
export const checkCORSIssue = (error: Error | unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('CORS') || message.includes('cors')) {
        console.warn(CORS_INSTRUCTIONS);
        return true;
    }
    return false;
};

/**
 * Headers par défaut pour les requêtes en développement
 */
export const DEV_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

/**
 * Fonction utilitaire pour les appels API en développement
 */
export const devFetch = async (url: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...DEV_HEADERS,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return response;
    } catch (error) {
        checkCORSIssue(error);
        throw error;
    }
};
