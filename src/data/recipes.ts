import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'poulet-yassa',
    title: 'Poulet Yassa au citron caramélisé',
    subtitle: 'Oignons confits fondants, moutarde de Dijon et citron vert acidulé cuits au feu doux.',
    description: 'Le grand classique de Casamance : des morceaux de volaille marinés une nuit entière dans les sucs de citron vert, l\'ail sauvage et le piment doux, puis saisis à la braise avant de mijoter dans un tapis d\'oignons caramélisés.',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    region: 'west-africa',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    isDailyIdea: true,
    isSignature: true,
    rating: 4.9,
    reviewsCount: 184,
    caloriesPerServing: 450,
    category: 'repas-rapide',
    tags: ['Poulet', 'Citron', 'Oignon', 'Mijoté', 'Sénégal'],
    badgeLabel: 'Plat Signature',
    chefSecret: {
      author: 'Chef Aminata Fall (Dakar)',
      text: 'Faites dorer les oignons sans couvercle au début pour concentrer leurs sucres naturels avant de déglacer au jus de marinade.'
    },
    ingredients: [
      { name: 'Cuisses de poulet fermier', quantity: 4, unit: 'pièces' },
      { name: 'Gros oignons doux émincés', quantity: 5, unit: 'pièces' },
      { name: 'Citrons verts pressés', quantity: 3, unit: 'pièces' },
      { name: 'Moutarde de Dijon forte', quantity: 2, unit: 'c. à soupe' },
      { name: 'Gousses d\'ail râpées', quantity: 4, unit: 'gousses' },
      { name: 'Huile d\'arachide ou tournesol', quantity: 3, unit: 'c. à soupe' },
      { name: 'Olives vertes dénoyautées', quantity: 100, unit: 'g' },
      { name: 'Piment lampion entier (facultatif)', quantity: 1, unit: 'pièce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinade de la volaille',
        text: 'Mélange le jus des citrons, la moutarde, l\'ail râpé et une pincée de sel. Masse généreusement le poulet et laisse reposer au frais 30 minutes minimum.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Froid',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Cuisses de poulet fermier', 'Citrons verts pressés', 'Moutarde de Dijon forte', 'Gousses d\'ail râpées']
      },
      {
        stepNumber: 2,
        title: 'Coloration vive du poulet',
        text: 'Dans une grande cocotte en fonte, saisis les morceaux de poulet à feu vif dans un filet d\'huile jusqu\'à obtenir une belle coloration dorée. Réserve sur une assiette.',
        durationMinutes: 8,
        timerSeconds: 480,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Huile d\'arachide ou tournesol']
      },
      {
        stepNumber: 3,
        title: 'Caramélisation lente des oignons',
        text: 'Verse l\'ensemble des oignons émincés dans la même cocotte avec le fond de marinade. Laisse suer et caraméliser doucement pendant 20 minutes.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Gros oignons doux émincés']
      },
      {
        stepNumber: 4,
        title: 'Mijotage final et olives',
        text: 'Replace le poulet au cœur des oignons, ajoute les olives et le piment entier sans le percer. Couvre et laisse frémir à tout petit feu pendant 15 minutes.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Olives vertes dénoyautées', 'Piment lampion entier (facultatif)']
      }
    ],
    sideDishes: [
      { name: 'Riz blanc brisé parfumé', description: 'Cuit à la vapeur pour imbiber les sucs de l\'oignon caramélisé', icon: '🍚' },
      { name: 'Bananes plantains frites', description: 'Pour une touche sucrée-salée irrésistible', icon: '🍌' }
    ],
    similarRecipeIds: ['thieboudienne', 'mafe-boeuf', 'poulet-dg']
  },
  {
    id: 'ndole-crevettes',
    title: 'Ndolé aux crevettes & bœuf braisé',
    subtitle: 'Feuilles de ndolé amères blanchies, pâte d\'arachides fraîches et gambas sautées.',
    description: 'Un grand classique de la gastronomie camerounaise : feuilles de ndolé amères soigneusement blanchies, pâte d\'arachides fraîches dorées, viande fondante et généreuses gambas croustillantes sautées à la minute.',
    country: 'Cameroun',
    countryFlag: '🇨🇲',
    region: 'africa',
    durationMinutes: 90,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    isSignature: true,
    rating: 4.9,
    reviewsCount: 142,
    caloriesPerServing: 485,
    category: 'plat-de-fete',
    tags: ['Ndolé', 'Crevettes', 'Bœuf', 'Arachide', 'Cameroun'],
    badgeLabel: 'Édition Prestige',
    chefSecret: {
      author: 'Le Secret du Chef Douala',
      text: 'Lavez les feuilles de ndolé avec une pincée de sel gemme pour en préserver la belle couleur vert émeraude et adoucir avec élégance l\'amertume naturelle.'
    },
    ingredients: [
      { name: 'Feuilles de ndolé fraîches lavées', quantity: 500, unit: 'g' },
      { name: 'Crevettes fraîches entières', quantity: 350, unit: 'g' },
      { name: 'Bœuf tendre coupé en cubes', quantity: 400, unit: 'g' },
      { name: 'Arachides blanches crues émondées', quantity: 250, unit: 'g' },
      { name: 'Gros oignons doux émincés', quantity: 2, unit: 'pièces' },
      { name: 'Gousses d\'ail & gingembre frais râpé', quantity: 3, unit: 'gousses' },
      { name: 'Huile douce de palme ou tournesol', quantity: 3, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Émulsion des arachides',
        text: 'Mixer très finement les arachides émondées avec un demi-verre d\'eau tiède pour obtenir une crème parfaitement soyeuse et sans grumeaux.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Préparation',
        image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Arachides blanches crues émondées']
      },
      {
        stepNumber: 2,
        title: 'Cuisson et réduction des oignons',
        text: 'Fais chauffer l\'huile dans ta cocotte. Ajoute les oignons finement émincés et laisse-les suer doucement pendant 8 minutes à feu moyen, jusqu\'à ce qu\'ils soient translucides et légèrement dorés.',
        durationMinutes: 8,
        timerSeconds: 480,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Gros oignons doux émincés', 'Huile douce de palme ou tournesol']
      },
      {
        stepNumber: 3,
        title: 'Cuisson fondante de la viande',
        text: 'Faire dorer le bœuf dans la cocotte avec l\'ail et le gingembre pendant 25 minutes jusqu\'à caramélisation parfumée.',
        durationMinutes: 25,
        timerSeconds: 1500,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Bœuf tendre coupé en cubes', 'Gousses d\'ail & gingembre frais râpé']
      },
      {
        stepNumber: 4,
        title: 'Intégration du ndolé et arachides',
        text: 'Incorporer la pâte d\'arachide et laisser mijoter 20 minutes à feu très doux. Ajouter les feuilles de ndolé pressées et poursuivre le frémissement 15 minutes.',
        durationMinutes: 35,
        timerSeconds: 2100,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Feuilles de ndolé fraîches lavées']
      },
      {
        stepNumber: 5,
        title: 'Finition aux crevettes sautées',
        text: 'Saisir les crevettes à feu vif dans un filet d\'huile avec une pointe d\'ail écrasé. Les disposer harmonieusement sur la marmite fumante juste avant de servir.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Crevettes fraîches entières']
      }
    ],
    sideDishes: [
      { name: 'Bananes plantains frites (Alloco / Dodo)', description: 'Douceur caramélisée en contraste avec l\'amertume', icon: '🍌' },
      { name: 'Miondo ou Bobolo cuit à la vapeur', description: 'Bâtons de manioc fermenté, la tradition pure de la côte', icon: '🌾' }
    ],
    similarRecipeIds: ['sauce-gombo', 'poisson-braise-kribi', 'mafe-boeuf']
  },
  {
    id: 'telibo-gboma-dessi',
    title: 'Télibô d\'igname & Sauce Gboma Dessi royale',
    subtitle: 'Pâte noire d\'igname séchée au soleil et sauce aux feuilles de gboma, crabe et poisson fumé.',
    description: 'Le fleuron des tablées du Sud et Centre Bénin : le Télibô (obtenu à partir de cossettes d\'igname séchées broyées) est fouetté en une pâte élastique, sombre et parfumée, servie brûlante avec la prestigieuse sauce Gboma aux légumes-feuilles étuvés et crustacés.',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 50,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    isDailyIdea: true,
    isSignature: true,
    rating: 4.9,
    reviewsCount: 124,
    caloriesPerServing: 470,
    category: 'traditionnel',
    tags: ['Bénin', 'Télibô', 'Gboma', 'Poisson fumé', 'Crabe', 'Traditionnel'],
    badgeLabel: 'Joyau du Bénin',
    budgetAdaptation: {
      ecoTip: 'Option éco : utilisez du poisson fumé local et du kpanman (peau de bœuf braisée) à la place des crabes frais.',
      festiveTip: 'Version royale : incorporez des crevettes fraîches entières décortiquées et des morceaux de mouton braisé.'
    },
    stoveAdaptationTips: {
      charbon: 'Sur foyer charbon traditionnel : gardez un feu vif pour faire bouillir l\'eau du télibô, puis déplacez la marmite au sol calée entre les pieds pour battre énergiquement avec la spatule.',
      gaz: 'Sur cuisinière à gaz : baissez à feu doux pendant le battage du télibô pour éviter que le fond ne brûle.',
      induction: 'Sur plaque induction : maintenir puissance 4 pour étuver la pâte sous couvercle 5 minutes après battage.'
    },
    chefSecret: {
      author: 'Maman Da Matha (Abomey)',
      text: 'Blanchissez toujours les feuilles de gboma avec une pincée de sel ou potasse naturelle pendant 2 minutes avant de les hacher pour fixer leur couleur verte et leur douceur.'
    },
    ingredients: [
      { name: 'Farine de cossettes d\'igname (Télibô)', quantity: 350, unit: 'g', ecoSubstitute: 'Farine de manioc ou gari blanc' },
      { name: 'Feuilles fraîches de Gboma (amarante sauvage)', quantity: 400, unit: 'g' },
      { name: 'Poissons fumés de rivière émiettés', quantity: 200, unit: 'g' },
      { name: 'Crabes de lagune nettoyés', quantity: 4, unit: 'pièces', ecoSubstitute: 'Peau de bœuf kpanman' },
      { name: 'Tomates fraîches et oignons rouges', quantity: 4, unit: 'pièces' },
      { name: 'Huile de palme rouge première pression', quantity: 3, unit: 'c. à soupe' },
      { name: 'Piment vert et ail écrasé', quantity: 2, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Blanchiment des feuilles de Gboma',
        phase: 'preparation',
        text: 'Plonger les feuilles de gboma lavées 2 minutes dans l\'eau bouillante salée. Égoutter, presser pour ôter l\'eau résiduelle et hacher finement.',
        detailedGuidance: 'Les feuilles doivent garder une teinte vert prairie éclatante. Ne les laissez pas noircir.',
        proTip: 'Plongez-les dans un bol d\'eau fraîche immédiatement après égouttage pour stopper la cuisson.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Feuilles fraîches de Gboma (amarante sauvage)']
      },
      {
        stepNumber: 2,
        title: 'Mijotage de la sauce Gboma Dessi',
        phase: 'mijotage',
        text: 'Chauffer l\'huile rouge, faire rissoler oignons, ail et tomates concassées. Ajouter crabes, poissons fumés et 200ml de bouillon. Laisser compoter 15 minutes avant d\'ajouter les feuilles.',
        detailedGuidance: 'L\'arôme fumé du poisson doit embaumer la cuisine et la sauce doit être liée et onctueuse.',
        proTip: 'Ne remuez pas vigoureusement pour ne pas casser la chair délicate du crabe.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu moyen',
        stoveGuidance: {
          charbon: 'Braises moyennes sous la marmite, fermer le couvercle avec quelques braises dessus.',
          gaz: 'Flamme moyenne, surveiller la réduction de la sauce.'
        },
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poissons fumés de rivière émiettés', 'Crabes de lagune nettoyés', 'Huile de palme rouge première pression']
      },
      {
        stepNumber: 3,
        title: 'Fouettage traditionnel du Télibô',
        phase: 'finition',
        text: 'Porter 750ml d\'eau à gros bouillons. Verser la farine d\'igname d\'un coup sec en pluie et fouetter énergiquement à la spatule contre les parois jusqu\'à formation d\'une pâte lisse, élastique et brillante.',
        detailedGuidance: 'La pâte passe du beige au noir profond caractéristique. Elle ne doit comporter aucun grumeau blanc.',
        proTip: 'Ajoutez une demi-tasse d\'eau bouillante sur les bords, couvrez 3 minutes pour parfaire la cuisson à la vapeur, puis rebattez une dernière fois.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Farine de cossettes d\'igname (Télibô)']
      }
    ],
    sideDishes: [
      { name: 'Piment frais écrasé au citron vert', description: 'Le piquant vif relève la douceur de l\'igname', icon: '🌶️' },
      { name: 'Eau fraîche de jarre en terre cuite', description: 'La tradition des repas béninois', icon: '🏺' }
    ],
    similarRecipeIds: ['sauce-amiwo', 'sauce-gombo', 'dakouin-poisson']
  },
  {
    id: 'atassi-dja-poisson',
    title: 'Atassi royal au riz & haricots (Watché)',
    subtitle: 'Riz et haricots rouges mijotés à la potasse, sauce piquante Dja et friture dorée.',
    description: 'Le roi de la street-food béninoise et des déjeuners de quartier : un mariage réconfortant de riz et de haricots rouges fondants aux reflets violacés, servi avec sa sauce tomate pimentée (Dja), des œufs durs frits et du poisson croustillant.',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    isSignature: true,
    rating: 4.9,
    reviewsCount: 156,
    caloriesPerServing: 480,
    category: 'traditionnel',
    tags: ['Bénin', 'Atassi', 'Watché', 'Riz', 'Haricots', 'Sauce Dja'],
    badgeLabel: 'Street-Food Culte',
    budgetAdaptation: {
      ecoTip: 'Option ultra-économique : servir avec des œufs durs frits dorés et du gari saupoudré, très rassasiant et savoureux.',
      festiveTip: 'Version fête : accompagner de brochettes de bœuf tchitchinga et de darnes de capitaine frais doré.'
    },
    stoveAdaptationTips: {
      charbon: 'Idéal sur braises douces : le riz et les haricots cuisent à l\'étouffée sans jamais coller.',
      gaz: 'Mettre à feu très doux une fois l\'eau absorbée pour laisser sécher les grains.',
      induction: 'Thermostat 2 sous couvercle pendant les 15 dernières minutes.'
    },
    chefSecret: {
      author: 'Tantie Justine (Cotonou, Saint-Michel)',
      text: 'Ajoutez une pincée de bicarbonate ou tige de sorgho séchée dès le début de la cuisson des haricots pour obtenir cette teinte violette gourmande et accélérer le fondant.'
    },
    ingredients: [
      { name: 'Riz cassé parfumé', quantity: 300, unit: 'g' },
      { name: 'Haricots rouges tendres ou niébé', quantity: 200, unit: 'g' },
      { name: 'Oignons rouges émincés pour la sauce Dja', quantity: 4, unit: 'pièces' },
      { name: 'Tomates fraîches concentrées et purée', quantity: 4, unit: 'c. à soupe' },
      { name: 'Poissons frais dorés ou maquereau frit', quantity: 4, unit: 'morceaux', ecoSubstitute: 'Œufs durs dorés' },
      { name: 'Huile végétale pour la sauce Dja', quantity: 4, unit: 'c. à soupe' },
      { name: 'Piment lampion rouge et gousses d\'ail', quantity: 2, unit: 'pièces' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cuisson fondante des haricots',
        phase: 'preparation',
        text: 'Cuire les haricots dans de l\'eau frémissante avec un demi-oignon jusqu\'à ce qu\'ils s\'écrasent facilement sous le doigt (environ 25 min).',
        detailedGuidance: 'L\'eau prend une couleur pourpre sombre intense.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Haricots rouges tendres ou niébé']
      },
      {
        stepNumber: 2,
        title: 'Incorporation du riz et absorption',
        phase: 'mijotage',
        text: 'Laver le riz et l\'ajouter directement dans la casserole de haricots avec le bouillon pourpre restant. Saler, couvrir hermétiquement et cuire à feu doux.',
        detailedGuidance: 'Chaque grain de riz doit être imprégné de la couleur et du parfum du haricot. La texture doit être souple et aérée.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu très doux',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Riz cassé parfumé']
      },
      {
        stepNumber: 3,
        title: 'Préparation de la sauce Dja caramélisée',
        phase: 'saisie',
        text: 'Faire frire une grande quantité d\'oignons dans l\'huile jusqu\'à dorure foncée. Ajouter la tomate concentrée et le piment écrasé. Laisser compoter jusqu\'à ce que l\'huile surnage.',
        detailedGuidance: 'La sauce Dja doit être rouge rubis, brillante et libérer une divine odeur d\'oignons frits.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Oignons rouges émincés pour la sauce Dja', 'Tomates fraîches concentrées et purée', 'Huile végétale pour la sauce Dja']
      }
    ],
    sideDishes: [
      { name: 'Gari blanc saupoudré', description: 'Le croquant indispensable sur l\'Atassi fumant', icon: '🌾' },
      { name: 'Œufs durs dorés à l\'huile de Dja', description: 'La tradition des étals de rue de Cotonou', icon: '🥚' }
    ],
    similarRecipeIds: ['sauce-amiwo', 'riz-au-gras', 'dakouin-poisson']
  },
  {
    id: 'sauce-amiwo',
    title: 'Sauce Amiwo & poulet doré',
    subtitle: 'Pâte rouge onctueuse au bouillon de tomate et maïs concassé béninois.',
    description: 'Emblème absolu des fêtes et dimanches béninois : la farine de maïs finement tamisée est cuite avec amour dans un bouillon ardent de tomates mûres, piments aromatiques, crevettes séchées et poulet fermier doré.',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 50,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
    isSignature: true,
    rating: 4.9,
    reviewsCount: 98,
    caloriesPerServing: 520,
    category: 'traditionnel',
    tags: ['Amiwo', 'Bénin', 'Poulet', 'Maïs', 'Tomate'],
    badgeLabel: 'Trésor du Bénin',
    budgetAdaptation: {
      ecoTip: 'Option éco : utilisez des pilons ou hauts de cuisse avec os très économiques, ou du poisson fumé émietté.',
      festiveTip: 'Version royale : incorporez des gésiers confits au piment et des crevettes royales dorées.'
    },
    stoveAdaptationTips: {
      charbon: 'Sur charbon : après incorporation de la farine, retirer 3/4 des braises et laisser la marmite sur la cendre chaude pour étuver sans brûler le fond.',
      gaz: 'Sur cuisinière à gaz : dès que la pâte épaissit, mettre le brûleur au ralenti absolu et couvrir hermétiquement.',
      induction: 'Sur plaque induction : maintenir thermostat 3 sous couvercle pour une vapeur dense.'
    },
    chefSecret: {
      author: 'Maman Sika (Cotonou)',
      text: 'Versez la farine de maïs en pluie très fine en fouettant vigoureusement au bâton pour obtenir une pâte lisse sans le moindre grumeau.'
    },
    ingredients: [
      { name: 'Poulet fermier coupé en morceaux', quantity: 1, unit: 'kg', ecoSubstitute: 'Pilons de poulet ou poisson fumé' },
      { name: 'Farine de maïs blanc ou jaune', quantity: 300, unit: 'g' },
      { name: 'Tomates fraîches bien mûres', quantity: 5, unit: 'pièces' },
      { name: 'Concentré de tomate purée', quantity: 2, unit: 'c. à soupe' },
      { name: 'Oignons rouges émincés', quantity: 3, unit: 'pièces' },
      { name: 'Poudre de crevettes séchées', quantity: 2, unit: 'c. à soupe' },
      { name: 'Huile rouge de palme purifiée', quantity: 3, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Assaisonnement et pochage du poulet',
        phase: 'preparation',
        text: 'Fais cuire le poulet avec un demi-oignon, du sel, de l\'ail et une louche d\'eau pour extraire un bouillon très parfumé. Réserve le bouillon et fais frire le poulet.',
        detailedGuidance: 'Le bouillon doit être d\'un rouge profond et embaumer le laurier et l\'ail. Le poulet doré doit être croustillant en surface.',
        proTip: 'Piquez la chair de la volaille à la fourchette pour que les aromates pénètrent au cœur des os.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poulet fermier coupé en morceaux', 'Oignons rouges émincés']
      },
      {
        stepNumber: 2,
        title: 'Mijotage de la sauce tomate au bouillon',
        phase: 'saisie',
        text: 'Fais revenir les oignons et la tomate concassée dans l\'huile rouge avec la poudre de crevette. Mouille avec le bouillon concentré de cuisson du poulet.',
        detailedGuidance: 'La tomate et les oignons doivent compoter jusqu\'à ce que de petites gouttelettes d\'huile rouge brillante remontent en surface.',
        proTip: 'Ne couvrez pas pour permettre à l\'acidité naturelle de la tomate de s\'évaporer.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Tomates fraîches bien mûres', 'Concentré de tomate purée', 'Poudre de crevettes séchées']
      },
      {
        stepNumber: 3,
        title: 'Montage & étuvage de l\'Amiwo',
        phase: 'mijotage',
        text: 'Incorpore la farine de maïs en pluie tout en remuant constamment jusqu\'à consistance souple et brillante. Laisse étuver 10 minutes sous un couvercle étanche.',
        detailedGuidance: 'La pâte doit se détacher naturellement des parois de la marmite quand on tourne à la spatule en bois.',
        proTip: 'Tapotez le dessus de la pâte avec le dos d\'une cuillère mouillée pour obtenir un glaçage brillant miroir.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu très doux',
        stoveGuidance: {
          charbon: 'Écarter la braise vive pour cuire sur la cendre douce.',
          gaz: 'Flamme au ralenti absolu.',
          induction: 'Puissance 2-3 sous couvercle.'
        },
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Farine de maïs blanc ou jaune']
      }
    ],
    sideDishes: [
      { name: 'Piment fardé maison (Moyo)', description: 'Tomates fraîches concassées, oignons crus et piment vert', icon: '🌶️' },
      { name: 'Abats et gésiers croustillants', description: 'Tradition des grandes réceptions de Ouidah', icon: '🍗' }
    ],
    similarRecipeIds: ['dakouin-poisson', 'telibo-gboma-dessi', 'atassi-dja-poisson']
  },
  {
    id: 'dakouin-poisson',
    title: 'Dakouin au court-bouillon de poisson',
    subtitle: 'Court-bouillon de poisson frais, piment vert et gari béninois.',
    description: 'Plat côtier emblématique du sud du Bénin, le Dakouin sublime les poissons nobles pêchés du jour dans un court-bouillon acidulé, lié ensuite avec la semoule de manioc (gari sohoui).',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 40,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 76,
    caloriesPerServing: 390,
    category: 'traditionnel',
    tags: ['Bénin', 'Poisson', 'Gari', 'Mer', 'Court-bouillon'],
    badgeLabel: 'Saveur Côtière',
    chefSecret: {
      author: 'Pêcheurs de Grand-Popo',
      text: 'Ne remuez jamais les darnes de poisson à la cuillère : imprimez plutôt un mouvement circulaire régulier à toute la cocotte pour garder la chair intacte.'
    },
    ingredients: [
      { name: 'Poissons entiers ou darnes (Mérou ou Bar)', quantity: 800, unit: 'g' },
      { name: 'Gari sohoui de première qualité', quantity: 250, unit: 'g' },
      { name: 'Tomates fraîches et oignons émincés', quantity: 4, unit: 'pièces' },
      { name: 'Piments verts frais', quantity: 2, unit: 'pièces' },
      { name: 'Citron vert et sel marin', quantity: 2, unit: 'pièces' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Préparation du bouillon marin',
        text: 'Porte à ébullition l\'eau avec tomates concassées, oignon, ail écrasé et jus de citron.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Tomates fraîches et oignons émincés', 'Citron vert et sel marin']
      },
      {
        stepNumber: 2,
        title: 'Pochage délicat du poisson',
        text: 'Dépose les tranches de poisson dans le bouillon frémissant. Laisse pocher 15 minutes sans brusquer.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poissons entiers ou darnes (Mérou ou Bar)', 'Piments verts frais']
      },
      {
        stepNumber: 3,
        title: 'Montage au gari',
        text: 'Dans un plat creux, imbibe la semoule de gari avec les louches de bouillon bouillant jusqu\'à gonflement mousseux.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Repos',
        image: 'https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Gari sohoui de première qualité']
      }
    ],
    sideDishes: [
      { name: 'Piment vert écrasé au sel de mer', description: 'Le condiment traditionnel des lagunes', icon: '🌶️' }
    ],
    similarRecipeIds: ['sauce-amiwo', 'yassa-poisson', 'sauce-gombo']
  },
  {
    id: 'mafe-boeuf',
    title: 'Mafé au bœuf fondant',
    subtitle: 'Sauce d\'arachide torréfiée onctueuse, mijotée longuement aux légumes racines.',
    description: 'L\'un des plus grands ambassadeurs de la cuisine ouest-africaine : une sauce veloutée à la pâte d\'arachide grillée, cuisinée avec des morceaux de bœuf qui s\'effilochent à la fourchette, des patates douces et du chou.',
    country: 'Mali',
    countryFlag: '🇲🇱',
    region: 'west-africa',
    durationMinutes: 75,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    isSignature: true,
    rating: 4.9,
    reviewsCount: 167,
    caloriesPerServing: 560,
    category: 'mijote',
    tags: ['Mali', 'Bœuf', 'Arachide', 'Patate douce', 'Mijoté'],
    badgeLabel: 'Inspiration du Moment',
    chefSecret: {
      author: 'Chef Djibril Cissé (Bamako)',
      text: 'Laissez l\'huile d\'arachide remonter naturellement en surface en fin de cuisson à feu doux : c\'est le signe indiscutable que la pâte est cuite à point.'
    },
    ingredients: [
      { name: 'Paleron ou gîte de bœuf en morceaux', quantity: 600, unit: 'g' },
      { name: 'Pâte d\'arachide pure non sucrée', quantity: 200, unit: 'g' },
      { name: 'Concentré de tomate', quantity: 3, unit: 'c. à soupe' },
      { name: 'Patates douces coupées en tronçons', quantity: 2, unit: 'pièces' },
      { name: 'Carottes fraîches épluchées', quantity: 2, unit: 'pièces' },
      { name: 'Oignons émincés', quantity: 2, unit: 'pièces' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Braisage de la viande',
        text: 'Fais rissoler les cubes de bœuf dans l\'huile jusqu\'à belle croûte dorée. Ajoute les oignons.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Paleron ou gîte de bœuf en morceaux', 'Oignons émincés']
      },
      {
        stepNumber: 2,
        title: 'Introduction de la pâte d\'arachide',
        text: 'Dilue la pâte d\'arachide dans un bol d\'eau tiède avec le concentré de tomate. Verse dans la cocotte et porte à ébullition.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Pâte d\'arachide pure non sucrée', 'Concentré de tomate']
      },
      {
        stepNumber: 3,
        title: 'Mijotage avec les légumes racines',
        text: 'Ajoute les carottes et patates douces. Couvre et laisse confire doucement pendant 45 minutes.',
        durationMinutes: 45,
        timerSeconds: 2700,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Patates douces coupées en tronçons', 'Carottes fraîches épluchées']
      }
    ],
    sideDishes: [
      { name: 'Riz blanc jasmin à la vapeur', description: 'Pour absorber la richesse de la sauce arachide', icon: '🍚' }
    ],
    similarRecipeIds: ['poulet-yassa', 'ndole-crevettes', 'thieboudienne']
  },
  {
    id: 'riz-jollof',
    title: 'Riz Jollof nigérian fumé braisé',
    subtitle: 'Le fameux goût fumé signature au poivron rouge doux et thym sauvage.',
    description: 'La fierté culinaire d\'Afrique de l\'Ouest : un riz à grain long cuit à l\'étouffée dans un coulis onctueux de tomates rôties, poivrons rouges, piment habanero et oignons, captant cette note fumée irrésistible de fond de marmite.',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    region: 'west-africa',
    durationMinutes: 40,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 215,
    caloriesPerServing: 420,
    category: 'repas-rapide',
    tags: ['Nigeria', 'Riz', 'Jollof', 'Fumé', 'Tomate'],
    badgeLabel: 'Culte & Populaire',
    chefSecret: {
      author: 'Chef Bola (Lagos)',
      text: 'Recouvrez hermétiquement votre marmite d\'une feuille de papier aluminium sous le couvercle pendant la dernière phase de cuisson : la vapeur dense crée le fumé inimitable.'
    },
    ingredients: [
      { name: 'Riz parfumé long grain rincé', quantity: 400, unit: 'g' },
      { name: 'Poivrons rouges doux rôtis', quantity: 3, unit: 'pièces' },
      { name: 'Tomates mûres en purée', quantity: 4, unit: 'pièces' },
      { name: 'Concentré de tomate purée', quantity: 2, unit: 'c. à soupe' },
      { name: 'Gros oignons émincés', quantity: 2, unit: 'pièces' },
      { name: 'Thym séché et feuilles de laurier', quantity: 1, unit: 'c. à soupe' },
      { name: 'Bouillon de volaille riche', quantity: 500, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mixage du coulis signature (Obé ata)',
        text: 'Mixer finement les poivrons rouges, les tomates et l\'ail jusqu\'à consistance lisse.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Préparation',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poivrons rouges doux rôtis', 'Tomates mûres en purée']
      },
      {
        stepNumber: 2,
        title: 'Friture du coulis et réduction',
        text: 'Dans une marmite chaude avec de l\'huile, fais revenir les oignons puis verse le coulis. Laisse réduire 15 minutes jusqu\'à séparation de l\'huile.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Concentré de tomate purée', 'Gros oignons émincés', 'Thym séché et feuilles de laurier']
      },
      {
        stepNumber: 3,
        title: 'Absorption et infusion fumée',
        text: 'Incorpore le riz et le bouillon bouillant. Couvre hermétiquement avec du papier cuisson et laisse cuire à feu très doux pendant 20 minutes.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu très doux',
        image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Riz parfumé long grain rincé', 'Bouillon de volaille riche']
      }
    ],
    sideDishes: [
      { name: 'Plantains frits croustillants (Dodo)', description: 'Le compagnon fidèle de tout Jollof réussi', icon: '🍌' },
      { name: 'Poulet rôti croustillant aux épices Suya', description: 'Parfumé à la poudre de kouloukou', icon: '🍗' }
    ],
    similarRecipeIds: ['riz-rouge-poulet', 'riz-au-gras', 'thieboudienne']
  },
  {
    id: 'poulet-dg',
    title: 'Poulet DG camerounais',
    subtitle: 'Directeur Général : poulet braisé, dés de plantains caramélisés et légumes croquants.',
    description: 'Né dans les maquis chics de Yaoundé pour régaler les "Directeurs Généraux", ce plat festif associe morceaux de poulet fermier doré, rondelles de plantains mûrs frits, haricots verts, carottes et aromates de forêt camerounaise.',
    country: 'Cameroun',
    countryFlag: '🇨🇲',
    region: 'africa',
    durationMinutes: 55,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 112,
    caloriesPerServing: 510,
    category: 'plat-de-fete',
    tags: ['Cameroun', 'Poulet', 'Plantain', 'Légumes', 'Festif'],
    badgeLabel: 'Prestige & Tradition',
    chefSecret: {
      author: 'Chef Mireille (Douala)',
      text: 'Ajoutez les rondelles de plantains frits seulement dans les 3 dernières minutes de mijotage pour qu\'elles absorbent la sauce sans perdre leur texture.'
    },
    ingredients: [
      { name: 'Poulet fermier découpé', quantity: 1, unit: 'kg' },
      { name: 'Bananes plantains mûres en rondelles', quantity: 3, unit: 'pièces' },
      { name: 'Carottes en biseaux', quantity: 2, unit: 'pièces' },
      { name: 'Haricots verts frais équeutés', quantity: 150, unit: 'g' },
      { name: 'Poivron vert et oignon émincés', quantity: 2, unit: 'pièces' },
      { name: 'Épices njangsa et poivre blanc de Penja', quantity: 1, unit: 'c. à café' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Assaisonnement et friture du poulet',
        text: 'Mariner le poulet avec ail, poivre de Penja et njangsa. Frire jusqu\'à belle dorure.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poulet fermier découpé', 'Épices njangsa et poivre blanc de Penja']
      },
      {
        stepNumber: 2,
        title: 'Friture des bananes plantains',
        text: 'Dorer les rondelles de plantain dans un bain d\'huile chaude jusqu\'à caramélisation ambrée. Égoutter.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Friture',
        image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Bananes plantains mûres en rondelles']
      },
      {
        stepNumber: 3,
        title: 'Mijotage convivial de la marmite',
        text: 'Faire suer les carottes, haricots et poivrons. Remettre le poulet, verser une louche de bouillon et terminer en incorporant les plantains.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Carottes en biseaux', 'Haricots verts frais équeutés', 'Poivron vert et oignon émincés']
      }
    ],
    sideDishes: [
      { name: 'Bâtons de manioc miondo', description: 'Pour saucer les jus concentrés de légumes', icon: '🌾' }
    ],
    similarRecipeIds: ['poulet-yassa', 'ndole-crevettes', 'mafe-boeuf']
  },
  {
    id: 'riz-au-gras',
    title: 'Riz au gras & pintade rôtie',
    subtitle: 'Riz parfumé mijoté au bouillon de légumes et pintade bien croustillante.',
    description: 'Une recette familiale réconfortante du Bénin : les grains de riz absorbent l\'essence d\'une pintade rôtie aux herbes fraîches, accompagnée de légumes du potager dorés au bouillon.',
    country: 'Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 89,
    caloriesPerServing: 460,
    category: 'traditionnel',
    tags: ['Bénin', 'Riz', 'Pintade', 'Légumes', 'Festif'],
    badgeLabel: 'Cuisine du Bénin',
    chefSecret: {
      author: 'Mamie Christine (Porto-Novo)',
      text: 'Ajoutez une noisette de beurre clarifié ou d\'huile rouge en toute fin de cuisson pour donner un éclat étincelant aux grains de riz.'
    },
    ingredients: [
      { name: 'Pintade fermière coupée en morceaux', quantity: 1, unit: 'pièce' },
      { name: 'Riz cassé parfumé', quantity: 400, unit: 'g' },
      { name: 'Tomates fraîches concassées', quantity: 3, unit: 'pièces' },
      { name: 'Poivrons verts et carottes', quantity: 2, unit: 'pièces' },
      { name: 'Oignons rouges hachés', quantity: 2, unit: 'pièces' },
      { name: 'Bouillon d\'épices béninoises', quantity: 500, unit: 'ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Dorure de la pintade',
        text: 'Fais dorer la pintade avec les oignons dans une cocotte en fonte jusqu\'à coloration rousse.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Pintade fermière coupée en morceaux', 'Oignons rouges hachés']
      },
      {
        stepNumber: 2,
        title: 'Cuisson du bouillon et légumes',
        text: 'Ajoute la tomate, les poivrons, les carottes et le bouillon. Laisse frémir 10 minutes.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Tomates fraîches concassées', 'Poivrons verts et carottes']
      },
      {
        stepNumber: 3,
        title: 'Cuisson du riz à couvert',
        text: 'Incorpore le riz lavé, réduis le feu au minimum, couvre hermétiquement et laisse cuire 20 minutes.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Riz cassé parfumé']
      }
    ],
    sideDishes: [
      { name: 'Salade d\'avocat aux échalotes', description: 'Fraîcheur vive pour équilibrer la richesse', icon: '🥑' }
    ],
    similarRecipeIds: ['sauce-amiwo', 'riz-jollof', 'poulet-dg']
  },
  {
    id: 'tajine-poulet',
    title: 'Tajine de poulet aux citrons confits & olives',
    subtitle: 'Poulet fondant aux épices douces, coriandre fraîche et citrons beldi.',
    description: 'L\'élégance du Maghreb : une cuisson lente en plat de terre cuite où le poulet s\'imprègne de gingembre, safran pur, citrons confits beldi et olives violettes.',
    country: 'Maroc',
    countryFlag: '🇲🇦',
    region: 'africa',
    durationMinutes: 60,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 139,
    caloriesPerServing: 430,
    category: 'mijote',
    tags: ['Maroc', 'Tajine', 'Poulet', 'Citron confit', 'Olives'],
    badgeLabel: 'Douceur du Maghreb',
    chefSecret: {
      author: 'Lalla Fatima (Fès)',
      text: 'Utilisez la pulpe du citron confit dans la marinade et gardez l\'écorce tranchée en lamelles fines pour la garniture finale.'
    },
    ingredients: [
      { name: 'Cuisses de poulet fermier', quantity: 4, unit: 'pièces' },
      { name: 'Citrons confits beldi', quantity: 2, unit: 'pièces' },
      { name: 'Olives violettes marocaines', quantity: 120, unit: 'g' },
      { name: 'Oignons jaunes émincés', quantity: 2, unit: 'pièces' },
      { name: 'Pistils de safran et gingembre moulu', quantity: 1, unit: 'c. à café' },
      { name: 'Bouquet de coriandre et persil frais', quantity: 1, unit: 'botte' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Charmoula et coloration',
        text: 'Frotter le poulet avec les épices, la coriandre hachée et l\'huile d\'olive. Faire revenir avec les oignons.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Cuisses de poulet fermier', 'Pistils de safran et gingembre moulu', 'Bouquet de coriandre et persil frais']
      },
      {
        stepNumber: 2,
        title: 'Mijotage sous le chapeau conique',
        text: 'Mouiller d\'un verre d\'eau, poser le couvercle conique du tajine et laisser mijoter 35 minutes.',
        durationMinutes: 35,
        timerSeconds: 2100,
        heatLevel: 'Feu très doux',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Oignons jaunes émincés']
      },
      {
        stepNumber: 3,
        title: 'Finition aux citrons confits et olives',
        text: 'Ajouter les écorces de citron confit et les olives. Réduire la sauce jusqu\'à consistance sirupeuse.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Citrons confits beldi', 'Olives violettes marocaines']
      }
    ],
    sideDishes: [
      { name: 'Pain kesra traditionnel', description: 'Galette de semoule tiède pour saucer la réduction', icon: '🥖' }
    ],
    similarRecipeIds: ['poulet-yassa', 'mafe-boeuf', 'poulet-dg']
  },
  {
    id: 'thieboudienne',
    title: 'Thiéboudienne rouge au mérou',
    subtitle: 'Riz brisé cuit au bouillon de tomate réduit, légumes racines et poisson frais braisé.',
    description: 'Monument du patrimoine immatériel sénégalais : le Ceebu Jën Penda Mbaye associe un beau morceau de mérou farci au rof (persil, ail, piment), mijoté avec chou, carotte, manioc et bissap amer.',
    country: 'Sénégal',
    countryFlag: '🇸🇳',
    region: 'west-africa',
    durationMinutes: 75,
    difficulty: 'Moyen',
    servings: 6,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    isSignature: true,
    rating: 4.9,
    reviewsCount: 228,
    caloriesPerServing: 540,
    category: 'plat-de-fete',
    tags: ['Sénégal', 'Thiéboudienne', 'Poisson', 'Riz brisé', 'Légumes'],
    badgeLabel: 'Incontournable de la Semaine',
    chefSecret: {
      author: 'Chef Ndèye (Saint-Louis)',
      text: 'Le secret réside dans le riz brisé deux fois (riz cassé deux fois) lavé plusieurs fois puis pré-cuit à la vapeur au-dessus de la marmite.'
    },
    ingredients: [
      { name: 'Darnes épaisses de mérou ou thiof', quantity: 800, unit: 'g' },
      { name: 'Riz brisé deux fois', quantity: 500, unit: 'g' },
      { name: 'Concentré de tomate', quantity: 3, unit: 'c. à soupe' },
      { name: 'Manioc, carottes et chou vert', quantity: 500, unit: 'g' },
      { name: 'Gueyeux et yet (coquillages séchés traditionnels)', quantity: 50, unit: 'g' },
      { name: 'Gombo et piment antillais', quantity: 4, unit: 'pièces' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Farce "Rof" et friture du poisson',
        text: 'Piler ail, persil, piment et sel. Farcir les chairs du poisson puis dorer dans l\'huile.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Darnes épaisses de mérou ou thiof']
      },
      {
        stepNumber: 2,
        title: 'Cuisson du bouillon rouge et légumes',
        text: 'Faire dorer le concentré de tomate avec le yet. Mouiller d\'eau, ajouter les légumes et laisser cuire 30 minutes.',
        durationMinutes: 30,
        timerSeconds: 1800,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Concentré de tomate', 'Manioc, carottes et chou vert']
      },
      {
        stepNumber: 3,
        title: 'Cuisson du riz dans le bouillon',
        text: 'Retirer les légumes et le poisson. Verser le riz brisé dans le bouillon parfumé. Couvrir et laisser gonfler 25 minutes.',
        durationMinutes: 25,
        timerSeconds: 1500,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Riz brisé deux fois']
      }
    ],
    sideDishes: [
      { name: 'Sauce Beugueudj (feuilles d\'oseille)', description: 'Acidité verte revigorante en accord parfait', icon: '🌿' }
    ],
    similarRecipeIds: ['poulet-yassa', 'riz-jollof', 'attieke-poisson']
  },
  {
    id: 'attieke-poisson',
    title: 'Attiéké au poisson braisé',
    subtitle: 'Semoule de manioc fermenté, dorade braisée aux épices et jus pimenté.',
    description: 'La merveille de la lagune ivoirienne : semoule de manioc légère comme un couscous, surmontée d\'une dorade grillée au feu de bois badigeonnée d\'épices kankankan, d\'oignons crus et tomates pimentées.',
    country: 'Côte d\'Ivoire',
    countryFlag: '🇨🇮',
    region: 'west-africa',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 195,
    caloriesPerServing: 440,
    category: 'repas-rapide',
    tags: ['Côte d\'Ivoire', 'Attiéké', 'Poisson braisé', 'Manioc', 'Alloco'],
    badgeLabel: 'Populaire & Convivial',
    chefSecret: {
      author: 'Tantie Akissi (Abidjan)',
      text: 'Aérez l\'attiéké entre vos paumes avec un filet d\'huile neutre et une pincée de sel avant de le chauffer à la vapeur pour une texture aérienne.'
    },
    ingredients: [
      { name: 'Dorade royale fraîche écaillée', quantity: 2, unit: 'pièces' },
      { name: 'Attiéké frais de Côte d\'Ivoire', quantity: 300, unit: 'g' },
      { name: 'Mélange d\'épices pour braisage', quantity: 2, unit: 'c. à soupe' },
      { name: 'Tomates fraîches et oignons émincés', quantity: 3, unit: 'pièces' },
      { name: 'Piment habanero pilé', quantity: 1, unit: 'pièce' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinade du poisson',
        text: 'Inciser la dorade en biseau, masser avec ail, gingembre, épices braisées et huile.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Préparation',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Dorade royale fraîche écaillée', 'Mélange d\'épices pour braisage']
      },
      {
        stepNumber: 2,
        title: 'Braisage croustillant',
        text: 'Griller au barbecue ou à la poêle grill très chaude 8 minutes par face jusqu\'à chair nacrée.',
        durationMinutes: 16,
        timerSeconds: 960,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Dorade royale fraîche écaillée']
      },
      {
        stepNumber: 3,
        title: 'Vapeur d\'attiéké et dressage',
        text: 'Chauffer l\'attiéké à la vapeur. Dresser avec le poisson, la brunoise de tomate-oignon et le piment.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Vapeur',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Attiéké frais de Côte d\'Ivoire', 'Tomates fraîches et oignons émincés']
      }
    ],
    sideDishes: [
      { name: 'Alloco croustillant', description: 'Bananes frites bien mûres dorées à point', icon: '🍌' }
    ],
    similarRecipeIds: ['thieboudienne', 'dakouin-poisson', 'poulet-dg']
  },
  {
    id: 'riz-rouge-poulet',
    title: 'Riz rouge à la tomate & poulet doré',
    subtitle: 'Un classique réconfortant où le riz s\'imprègne lentement des sucs de volaille caramélisée.',
    description: 'Une recette rapide et économique parfaite pour vider les placards : des cuisses de poulet dorées qui mijotent avec du riz parfumé, des oignons et de la pulpe de tomate concentrée.',
    country: 'Afrique de l\'Ouest',
    countryFlag: '🌍',
    region: 'west-africa',
    durationMinutes: 35,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: 84,
    caloriesPerServing: 420,
    category: 'repas-rapide',
    tags: ['Poulet', 'Riz', 'Tomate', 'Oignon', 'Frigo'],
    badgeLabel: '100% en stock',
    chefSecret: {
      author: 'L\'Atelier de cuisine',
      text: 'Faites bien revenir le concentré de tomate 3 minutes dans l\'huile avant d\'ajouter l\'eau pour enlever toute acidité et libérer la couleur rouge rubis.'
    },
    ingredients: [
      { name: 'Morceaux de poulet', quantity: 500, unit: 'g' },
      { name: 'Riz blanc', quantity: 300, unit: 'g' },
      { name: 'Tomates ou coulis', quantity: 3, unit: 'pièces' },
      { name: 'Oignons', quantity: 2, unit: 'pièces' },
      { name: 'Huile de cuisson', quantity: 2, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Saisir le poulet',
        text: 'Fais dorer le poulet salé dans l\'huile chaude avec les oignons émincés.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Morceaux de poulet', 'Oignons']
      },
      {
        stepNumber: 2,
        title: 'Ajout de la tomate et du riz',
        text: 'Verse les tomates concassées, ajoute le riz rincé et le double de volume en eau.',
        durationMinutes: 5,
        timerSeconds: 300,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Riz blanc', 'Tomates ou coulis']
      },
      {
        stepNumber: 3,
        title: 'Cuisson étuvée',
        text: 'Baisse le feu, couvre et laisse mijoter 20 minutes jusqu\'à absorption totale.',
        durationMinutes: 20,
        timerSeconds: 1200,
        heatLevel: 'Feu très doux',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        stepIngredients: []
      }
    ],
    sideDishes: [
      { name: 'Concombres croquants', description: 'Assaisonnés au jus de citron', icon: '🥒' }
    ],
    similarRecipeIds: ['riz-jollof', 'poulet-yassa', 'riz-au-gras']
  },
  {
    id: 'soupe-poulet-oignons',
    title: 'Soupe mijotée poulet, oignons et concassé',
    subtitle: 'Bouillon généreux infusé de tomates fraîches et d\'oignons réduits jusqu\'au fondant absolu.',
    description: 'Une soupe roborative et chaleureuse qui réchauffe le cœur. Les sucs de poulet infusent un bouillon doré garni d\'oignons fondants et de pulpe de tomates.',
    country: 'Afrique de l\'Ouest',
    countryFlag: '🌍',
    region: 'west-africa',
    durationMinutes: 40,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewsCount: 52,
    caloriesPerServing: 340,
    category: 'repas-rapide',
    tags: ['Poulet', 'Oignon', 'Tomate', 'Soupe', 'Frigo'],
    badgeLabel: '100% en stock',
    chefSecret: {
      author: 'L\'Atelier de cuisine',
      text: 'Laissez mijoter à feu très doux pour que le collagène de la volaille donne du velouté naturel au bouillon.'
    },
    ingredients: [
      { name: 'Poulet découpé', quantity: 400, unit: 'g' },
      { name: 'Gros oignons émincés', quantity: 3, unit: 'pièces' },
      { name: 'Tomates fraîches coupées en dés', quantity: 3, unit: 'pièces' },
      { name: 'Huile et aromates', quantity: 2, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Faire suer les oignons',
        text: 'Fais revenir les oignons dans l\'huile jusqu\'à transparence dorée.',
        durationMinutes: 8,
        timerSeconds: 480,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Gros oignons émincés']
      },
      {
        stepNumber: 2,
        title: 'Mijotage du bouillon',
        text: 'Ajoute le poulet, la tomate et 750ml d\'eau. Couvre et laisse frémir 30 minutes.',
        durationMinutes: 30,
        timerSeconds: 1800,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poulet découpé', 'Tomates fraîches coupées en dés']
      }
    ],
    sideDishes: [
      { name: 'Pain grillé ou riz blanc', description: 'Idéal pour tremper dans le bouillon parfumé', icon: '🍞' }
    ],
    similarRecipeIds: ['riz-rouge-poulet', 'poulet-yassa']
  },
  {
    id: 'poelee-express',
    title: 'Poêlée express tomate-oignon & poulet sauté',
    subtitle: 'Rapide, vibrant et riche en arômes. Il suffit d\'une gousse d\'ail pour lier toute la sauce.',
    description: 'Le plat express du soir par excellence quand le temps presse : des dés de poulet sautés à feu vif avec oignons croquants et tomates fondantes.',
    country: 'Afrique de l\'Ouest',
    countryFlag: '🌍',
    region: 'west-africa',
    durationMinutes: 25,
    difficulty: 'Facile',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 91,
    caloriesPerServing: 380,
    category: 'repas-rapide',
    tags: ['Poulet', 'Tomate', 'Oignon', 'Express', 'Frigo'],
    badgeLabel: 'Repas express du soir',
    chefSecret: {
      author: 'L\'Atelier de cuisine',
      text: 'Saisissez le poulet à feu très vif au départ pour emprisonner les sucs avant d\'incorporer les oignons et les tomates.'
    },
    ingredients: [
      { name: 'Filets de poulet en dés', quantity: 350, unit: 'g' },
      { name: 'Oignons émincés', quantity: 2, unit: 'pièces' },
      { name: 'Tomates fraîches en dés', quantity: 2, unit: 'pièces' },
      { name: 'Gousses d\'ail écrasées', quantity: 2, unit: 'gousses' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Saisie rapide du poulet',
        text: 'Poêle les dés de poulet 5 minutes à feu vif.',
        durationMinutes: 5,
        timerSeconds: 300,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Filets de poulet en dés']
      },
      {
        stepNumber: 2,
        title: 'Sauter avec oignons et tomates',
        text: 'Ajoute oignons, ail et tomates. Fais sauter 12 minutes à feu moyen.',
        durationMinutes: 12,
        timerSeconds: 720,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Oignons émincés', 'Tomates fraîches en dés', 'Gousses d\'ail écrasées']
      }
    ],
    sideDishes: [
      { name: 'Riz blanc ou semoule', description: 'Pour saucer la poêlée', icon: '🍚' }
    ],
    similarRecipeIds: ['poulet-yassa', 'riz-rouge-poulet']
  },
  {
    id: 'dovi-poulet',
    title: 'Dovi au poulet du Zimbabwe',
    subtitle: 'Mijoté réconfortant au beurre de cacahuète et légumes racines.',
    description: 'Une spécialité chaleureuse du Zimbabwe : poulet mijoté dans une sauce onctueuse d\'arachide avec épinards sauvages et carottes.',
    country: 'Zimbabwe',
    countryFlag: '🇿🇼',
    region: 'africa',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: 68,
    caloriesPerServing: 490,
    category: 'mijote',
    tags: ['Zimbabwe', 'Poulet', 'Arachide', 'Épinards'],
    badgeLabel: 'Nouveaux Horizons',
    chefSecret: {
      author: 'Chef Tendai (Harare)',
      text: 'Ajoutez les feuilles d\'épinard dans les 5 dernières minutes pour qu\'elles gardent leur fraîcheur vivante.'
    },
    ingredients: [
      { name: 'Poulet découpé', quantity: 600, unit: 'g' },
      { name: 'Beurre de cacahuète pur', quantity: 150, unit: 'g' },
      { name: 'Épinards frais', quantity: 200, unit: 'g' },
      { name: 'Oignons et ail', quantity: 2, unit: 'pièces' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cuisson du poulet',
        text: 'Faire dorer le poulet avec les aromates et oignons.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poulet découpé', 'Oignons et ail']
      },
      {
        stepNumber: 2,
        title: 'Mijotage à la cacahuète',
        text: 'Diluer le beurre d\'arachide dans le bouillon, verser et mijoter 25 minutes. Finir par les épinards.',
        durationMinutes: 25,
        timerSeconds: 1500,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Beurre de cacahuète pur', 'Épinards frais']
      }
    ],
    sideDishes: [
      { name: 'Sadza (bouillie de maïs)', description: 'L\'accompagnement national du Zimbabwe', icon: '🌽' }
    ],
    similarRecipeIds: ['mafe-boeuf', 'ndole-crevettes']
  },
  {
    id: 'bobotie-boeuf',
    title: 'Bobotie au bœuf épicé',
    subtitle: 'Gratin sud-africain au bœuf haché parfumé, raisins secs et crème d\'œufs.',
    description: 'Le chef-d\'œuvre du Cap : un gratin sucré-salé de viande hachée marinée au curry, chutney de mangue et raisins blonds, surmonté d\'un flan doré aux feuilles de laurier.',
    country: 'Afrique du Sud',
    countryFlag: '🇿🇦',
    region: 'africa',
    durationMinutes: 55,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 104,
    caloriesPerServing: 520,
    category: 'plat-de-fete',
    tags: ['Afrique du Sud', 'Bœuf', 'Curry', 'Gratin'],
    badgeLabel: 'À Découvrir',
    chefSecret: {
      author: 'Chef Johan (Le Cap)',
      text: 'Enfoncez 3 à 4 feuilles de laurier fraîches debout dans l\'appareil aux œufs avant d\'enfourner.'
    },
    ingredients: [
      { name: 'Bœuf haché maigre', quantity: 600, unit: 'g' },
      { name: 'Pain de mie trempé dans le lait', quantity: 2, unit: 'tranches' },
      { name: 'Curry doux et curcuma', quantity: 2, unit: 'c. à soupe' },
      { name: 'Chutney et raisins secs', quantity: 50, unit: 'g' },
      { name: 'Œufs et lait battus', quantity: 2, unit: 'œufs' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Assaisonnement de la viande',
        text: 'Faire revenir la viande avec oignons, curry, chutney et raisins.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Bœuf haché maigre', 'Curry doux et curcuma', 'Chutney et raisins secs']
      },
      {
        stepNumber: 2,
        title: 'Gratinage au four',
        text: 'Disposer la viande dans un plat, verser les œufs battus au lait et enfourner 35 minutes à 180°C.',
        durationMinutes: 35,
        timerSeconds: 2100,
        heatLevel: 'Four 180°C',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Œufs et lait battus']
      }
    ],
    sideDishes: [
      { name: 'Riz jaune au curcuma', description: 'Aux éclats d\'amandes effilées', icon: '🍚' }
    ],
    similarRecipeIds: ['mafe-boeuf', 'tajine-poulet']
  },
  {
    id: 'sauce-gombo',
    title: 'Sauce Gombo aux crabes & crevettes',
    subtitle: 'Sauce gluante veloutée aux crabes de lagune, crevettes et gombos frais.',
    description: 'Une soupe iodée envoûtante adorée au Bénin et en Côte d\'Ivoire : les gombos frais tranchés finement sont battus avec du bicarbonate ou de la potasse pour développer leur soyeux inimitable.',
    country: 'Côte d\'Ivoire & Bénin',
    countryFlag: '🇧🇯',
    region: 'benin',
    durationMinutes: 50,
    difficulty: 'Moyen',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 118,
    caloriesPerServing: 410,
    category: 'traditionnel',
    tags: ['Gombo', 'Crabe', 'Crevette', 'Bénin', 'Côte d\'Ivoire'],
    badgeLabel: 'Saveurs Iodées',
    chefSecret: {
      author: 'Mémé Viviane (Cotonou)',
      text: 'Battez le gombo au fouet en bois hors du feu pour obtenir un filant parfait sans le faire bouillir trop fort.'
    },
    ingredients: [
      { name: 'Gombos frais bien verts', quantity: 400, unit: 'g' },
      { name: 'Crabes de lagune nettoyés', quantity: 4, unit: 'pièces' },
      { name: 'Crevettes fraîches', quantity: 200, unit: 'g' },
      { name: 'Poisson fumé émietté', quantity: 150, unit: 'g' },
      { name: 'Huile de palme rouge', quantity: 2, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cuisson des crustacés',
        text: 'Pocher les crabes et le poisson fumé dans un bouillon aromatisé pendant 15 minutes.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Crabes de lagune nettoyés', 'Poisson fumé émietté']
      },
      {
        stepNumber: 2,
        title: 'Intégration du gombo',
        text: 'Hacher le gombo très fin, l\'incorporer au bouillon frémissant avec les crevettes et lier à l\'huile rouge.',
        durationMinutes: 15,
        timerSeconds: 900,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Gombos frais bien verts', 'Crevettes fraîches', 'Huile de palme rouge']
      }
    ],
    sideDishes: [
      { name: 'Pâte blanche (Akassa ou Pâte de maïs)', description: 'L\'accord absolu du gombo béninois', icon: '🥣' }
    ],
    similarRecipeIds: ['sauce-amiwo', 'dakouin-poisson', 'ndole-crevettes']
  },
  {
    id: 'poisson-braise-kribi',
    title: 'Poisson braisé saveurs Kribi',
    subtitle: 'Capitaine braisé à la braise, marinades aux graines de rondelle et pèbè.',
    description: 'Sur la plage de Kribi au Cameroun, ce poisson est badigeonné d\'une pâte d\'épices forestières locales (rondelle, pèbè, esese) et grillé lentement sur charbon de bois ardent.',
    country: 'Cameroun',
    countryFlag: '🇨🇲',
    region: 'africa',
    durationMinutes: 45,
    difficulty: 'Facile',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 88,
    caloriesPerServing: 390,
    category: 'repas-rapide',
    tags: ['Cameroun', 'Poisson braisé', 'Kribi', 'Épices de forêt'],
    badgeLabel: 'Braise & Fraîcheur',
    chefSecret: {
      author: 'Chef Ebogo (Kribi)',
      text: 'Torréfiez les graines de rondelle et de pèbè à sec sur une poêle avant de les écraser sur la pierre.'
    },
    ingredients: [
      { name: 'Capitaine ou Bar frais entier', quantity: 1, unit: 'kg' },
      { name: 'Pâte d\'épices de Kribi (pèbè, ail, gingembre)', quantity: 3, unit: 'c. à soupe' },
      { name: 'Citron vert et sel', quantity: 2, unit: 'pièces' },
      { name: 'Huile végétale pour arroser', quantity: 3, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinade profonde',
        text: 'Inciser profondément le poisson et garnir de la marinade parfumée. Repos 20 minutes.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Préparation',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Capitaine ou Bar frais entier', 'Pâte d\'épices de Kribi (pèbè, ail, gingembre)']
      },
      {
        stepNumber: 2,
        title: 'Grillade lente',
        text: 'Cuire sur braise ou sous grill en arrosant d\'huile et de marinade jusqu\'à chair nacrée.',
        durationMinutes: 25,
        timerSeconds: 1500,
        heatLevel: 'Braise / Grill',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Huile végétale pour arroser']
      }
    ],
    sideDishes: [
      { name: 'Miondo fumant', description: 'Bâtons de manioc tendres', icon: '🌾' },
      { name: 'Piment de table écrasé au citron', description: 'Piquant et vif', icon: '🍋' }
    ],
    similarRecipeIds: ['attieke-poisson', 'dakouin-poisson', 'ndole-crevettes']
  },
  {
    id: 'curry-madras-poulet',
    title: 'Curry crémeux Madras au lait de coco',
    subtitle: 'Poulet fondant aux épices douces, curcuma doré et lait de coco velouté.',
    description: 'Une escapade parfumée en Inde du Sud : les morceaux de poulet sont doucement infusés dans un mélange de curry toasté, graines de coriandre, gingembre frais et lait de coco onctueux.',
    country: 'Inde & Océan Indien',
    countryFlag: '🇮🇳',
    region: 'world',
    durationMinutes: 40,
    difficulty: 'Facile',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 142,
    caloriesPerServing: 480,
    category: 'mijote',
    tags: ['Inde', 'Curry', 'Poulet', 'Lait de coco', 'Monde'],
    badgeLabel: 'Évasion du Monde',
    chefSecret: {
      author: 'Chef Rajan (Madras)',
      text: 'Faites torréfier les poudres d\'épices 30 secondes dans l\'huile tiède avant d\'ajouter les oignons pour libérer toute leur puissance aromatique sans amertume.'
    },
    ingredients: [
      { name: 'Cuisses ou filets de poulet émincés', quantity: 600, unit: 'g' },
      { name: 'Lait de coco entier', quantity: 400, unit: 'ml' },
      { name: 'Poudre de curry Madras doux', quantity: 2, unit: 'c. à soupe' },
      { name: 'Oignons jaunes émincés', quantity: 2, unit: 'pièces' },
      { name: 'Gousses d\'ail et gingembre frais râpés', quantity: 2, unit: 'c. à soupe' },
      { name: 'Coriandre fraîche pour le dressage', quantity: 1, unit: 'botte' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Torréfaction des épices et dorure',
        text: 'Chauffer l\'huile, torréfier le curry, ajouter l\'oignon, l\'ail et le gingembre. Faire dorer le poulet.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Feu moyen',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Cuisses ou filets de poulet émincés', 'Poudre de curry Madras doux', 'Oignons jaunes émincés']
      },
      {
        stepNumber: 2,
        title: 'Mijotage onctueux au lait de coco',
        text: 'Verser le lait de coco, baisser le feu et laisser compoter 25 minutes jusqu\'à sauce veloutée.',
        durationMinutes: 25,
        timerSeconds: 1500,
        heatLevel: 'Feu doux',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Lait de coco entier']
      },
      {
        stepNumber: 3,
        title: 'Dressage parfumé',
        text: 'Parsemer généreusement de coriandre fraîche ciselée et d\'un filet de jus de citron vert.',
        durationMinutes: 5,
        timerSeconds: 300,
        heatLevel: 'Finition',
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Coriandre fraîche pour le dressage']
      }
    ],
    sideDishes: [
      { name: 'Riz basmati au cumin', description: 'Grains longs parfumés et légers', icon: '🍚' },
      { name: 'Naan chaud au beurre ou ail', description: 'Idéal pour napper la sauce curry', icon: '🫓' }
    ],
    similarRecipeIds: ['tajine-poulet', 'bobotie-boeuf', 'dovi-poulet']
  },
  {
    id: 'wok-boeuf-gingembre',
    title: 'Wok de bœuf fondant au gingembre & sésame',
    subtitle: 'Lamelles de bœuf saisies vivement aux légumes croquants et sauce soja parfumée.',
    description: 'L\'art de la saisie vive asiatique : des émincés de bœuf marinés à la sauce soja et huile de sésame grillé, sautés en quelques minutes avec poivrons croquants, oignons cébettes et gingembre frais.',
    country: 'Asie & Street Food',
    countryFlag: '🥢',
    region: 'world',
    durationMinutes: 25,
    difficulty: 'Facile',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 76,
    caloriesPerServing: 390,
    category: 'repas-rapide',
    tags: ['Asie', 'Wok', 'Bœuf', 'Gingembre', 'Express', 'Monde'],
    badgeLabel: 'Cuisines du Monde',
    chefSecret: {
      author: 'Chef Lin (Singapour)',
      text: 'Faites chauffer votre poêle ou wok jusqu\'à ce qu\'il fume légèrement avant de déposer le bœuf pour obtenir ce goût fumé caractéristique du wok hei.'
    },
    ingredients: [
      { name: 'Bœuf tendre en fines lamelles', quantity: 400, unit: 'g' },
      { name: 'Gingembre frais râpé', quantity: 2, unit: 'c. à soupe' },
      { name: 'Sauce soja et huile de sésame', quantity: 3, unit: 'c. à soupe' },
      { name: 'Poivrons en lanières et oignons', quantity: 2, unit: 'pièces' },
      { name: 'Graines de sésame torréfiées', quantity: 1, unit: 'c. à soupe' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Marinade express du bœuf',
        text: 'Mélanger les lamelles de bœuf avec sauce soja, huile de sésame et gingembre râpé. Repos 10 minutes.',
        durationMinutes: 10,
        timerSeconds: 600,
        heatLevel: 'Préparation',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Bœuf tendre en fines lamelles', 'Gingembre frais râpé', 'Sauce soja et huile de sésame']
      },
      {
        stepNumber: 2,
        title: 'Saisie ultra-vive au wok',
        text: 'Faire sauter les lamelles de bœuf 3 minutes à feu maximal. Retirer et faire sauter les légumes croquants 4 minutes.',
        durationMinutes: 7,
        timerSeconds: 420,
        heatLevel: 'Feu très vif',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Poivrons en lanières et oignons']
      },
      {
        stepNumber: 3,
        title: 'Mélange final et graines de sésame',
        text: 'Réunir viande et légumes, enrober des sucs de cuisson et parsemer de graines de sésame torréfiées.',
        durationMinutes: 3,
        timerSeconds: 180,
        heatLevel: 'Feu vif',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        stepIngredients: ['Graines de sésame torréfiées']
      }
    ],
    sideDishes: [
      { name: 'Nouilles sautées ou riz jasmin', description: 'Absorption parfaite des sucs caramélisés', icon: '🍜' }
    ],
    similarRecipeIds: ['poelee-express', 'poulet-dg']
  }
];

export const COUNTRIES = [
  { id: 'benin', name: 'Bénin', flag: '🇧🇯', count: 18, specialties: 'Amiwo, Dakouin, Sauce graine', region: 'benin' },
  { id: 'senegal', name: 'Sénégal', flag: '🇸🇳', count: 24, specialties: 'Thiéboudienne, Yassa', region: 'west-africa' },
  { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬', count: 20, specialties: 'Jollof Rice, Suya', region: 'west-africa' },
  { id: 'cameroon', name: 'Cameroun', flag: '🇨🇲', count: 16, specialties: 'Ndolé, Poulet DG', region: 'africa' },
  { id: 'ivory-coast', name: 'Côte d\'Ivoire', flag: '🇨🇮', count: 19, specialties: 'Garba, Alloco, Attiéké', region: 'west-africa' },
  { id: 'mali', name: 'Mali', flag: '🇲🇱', count: 12, specialties: 'Mafé, Fakoye, Tiga dèguè', region: 'west-africa' },
  { id: 'morocco', name: 'Maroc', flag: '🇲🇦', count: 15, specialties: 'Tajines, Couscous royal', region: 'africa' },
  { id: 'world', name: 'Cuisines du Monde', flag: '✈️', count: 12, specialties: 'Currys, Woks, Tagines & Mijotés', region: 'world' }
];

export const DEFAULT_FAVORITE_IDS = [
  'poulet-yassa',
  'ndole-crevettes',
  'sauce-amiwo',
  'mafe-boeuf',
  'thieboudienne',
  'riz-jollof'
];

export const PANTRY_COMMON_INGREDIENTS = [
  'Poulet',
  'Tomate',
  'Oignon',
  'Riz',
  'Ail',
  'Huile d\'olive',
  'Piment doux',
  'Gingembre',
  'Manioc',
  'Banane plantain',
  'Arachide',
  'Poisson'
];
