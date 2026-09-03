import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/generate-recipe', async (req, res) => {
    try {
      const { ingredients, preferences, cookingConditions } = req.body;

      const prompt = `
Tu es un chef cuisinier expert en cuisine africaine (notamment du Bénin et de l'Afrique de l'Ouest).
Crée une recette inspirée de ces ingrédients que j'ai dans mon frigo : ${ingredients.join(', ')}.
Mes conditions de cuisson : ${JSON.stringify(cookingConditions)}.
Mes préférences : ${JSON.stringify(preferences)}.

Renvoie-moi UNIQUEMENT un objet JSON valide qui respecte scrupuleusement l'interface TypeScript suivante (pas de markdown, pas de texte avant ou après, juste le JSON) :

interface Recipe {
  id: string; // génère un id unique comme "poulet-yassa-ai"
  title: string;
  subtitle: string;
  description: string;
  country: string;
  countryFlag: string;
  region: 'benin' | 'west-africa' | 'africa' | 'world';
  durationMinutes: number;
  difficulty: 'Facile' | 'Moyen' | 'Expert';
  servings: number;
  image: string; // mets une url générique d'image unsplash, par ex: https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=800&q=80
  rating: number;
  reviewsCount: number;
  caloriesPerServing: number;
  category: 'repas-rapide' | 'plat-de-fete' | 'mijote' | 'traditionnel';
  tags: string[];
  ingredients: { name: string; quantity: number; unit: string; note?: string; }[];
  steps: { stepNumber: number; title: string; text: string; image: string; stepIngredients: string[]; }[];
  chefSecret: { author: string; text: string; };
  sideDishes: { name: string; description: string; icon: string; }[];
  similarRecipeIds: string[];
}
`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });
      
      const recipe = JSON.parse(response.text || '{}');
      // add id if not present
      if (!recipe.id) recipe.id = "recipe-" + Math.random().toString(36).substr(2, 9);
      if (!recipe.image) recipe.image = 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=800&q=80';

      res.json(recipe);
    } catch (error: any) {
      console.error('Error generating recipe:', error);
      res.status(500).json({ error: 'Failed to generate recipe' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
