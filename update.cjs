const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add session state and recipes state
code = code.replace(
  "  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(() => {",
  `  const [session, setSession] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);

  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(DEFAULT_COOKING_CONDITIONS);`
);

// Remove the try-catch for cookingConditions in the old useState
code = code.replace(
  `  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(() => {
    try {
      const stored = localStorage.getItem('marmite_cooking_conditions');
      return stored ? JSON.parse(stored) : DEFAULT_COOKING_CONDITIONS;
    } catch {
      return DEFAULT_COOKING_CONDITIONS;
    }
  });`,
  `  const [session, setSession] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);

  const [cookingConditions, setCookingConditions] = useState<CookingConditions>(DEFAULT_COOKING_CONDITIONS);`
);

// Same for cookingHistory
code = code.replace(
  `  // Cooking history persisted in localStorage
  const [cookingHistory, setCookingHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('marmite_history');
      return stored ? JSON.parse(stored) : ['poulet-yassa', 'ndole-crevettes'];
    } catch {
      return ['poulet-yassa', 'ndole-crevettes'];
    }
  });`,
  `  // Cooking history
  const [cookingHistory, setCookingHistory] = useState<string[]>(['poulet-yassa', 'ndole-crevettes']);`
);

// Remove localStorage save effects
code = code.replace(
  `  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_history', JSON.stringify(cookingHistory));
    } catch {
      // Ignored
    }
  }, [cookingHistory]);

  // Save cooking conditions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marmite_cooking_conditions', JSON.stringify(cookingConditions));
    } catch {
      // Ignored
    }
  }, [cookingConditions]);`,
  ``
);

code = code.replace(
  `  // Save changes automatically if local (fallback when updating via side effects)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        localStorage.setItem('marmite_user', JSON.stringify(user));
      }
    });
  }, [user]);`,
  ``
);

// Update fetchUserData
const oldFetchUser = `      if (profile) {
        setUser((prev) => ({
          ...prev,
          name: profile.name || prev.name,
          avatar: profile.avatar || prev.avatar,
          isPremium: profile.is_premium || false,
          cookedCount: profile.cooked_count || 0
        }));
      }`;

const newFetchUser = `      if (profile) {
        setUser((prev) => ({
          ...prev,
          name: profile.name || prev.name,
          avatar: profile.avatar || prev.avatar,
          isPremium: profile.is_premium || false,
          cookedCount: profile.cooked_count || 0,
          preferences: profile.preferences || prev.preferences
        }));
        if (profile.cooking_conditions) setCookingConditions(profile.cooking_conditions);
        if (profile.cooking_history) setCookingHistory(profile.cooking_history);
      }`;
code = code.replace(oldFetchUser, newFetchUser);

// Update loadLocalFallback
code = code.replace(
  `  const loadLocalFallback = () => {`,
  `  const loadLocalFallback = () => {
    setSession(null);`
);

// Update session set
code = code.replace(
  `        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);`,
  `        setSession(session);
        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);`
);
// replace it again for onAuthStateChange
code = code.replace(
  `        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);`,
  `        setSession(session);
        setUser((prev) => ({
          ...prev,
          email: session.user.email || prev.email
        }));
        fetchUserData(session.user.id);`
);

// Fetch recipes
const syncAuthStr = `  // Sync Supabase Auth session and data`;
const fetchRecipesStr = `  // Fetch recipes
  const fetchRecipes = async () => {
    try {
      const { data } = await supabase.from('recipes').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        // Map data to match Recipe type if needed, assuming it matches here
        setRecipes(data as Recipe[]);
      } else {
        // Fallback to local if empty
        setRecipes(RECIPES);
      }
    } catch (e) {
      console.error('Error fetching recipes', e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Sync Supabase Auth session and data`;
code = code.replace(syncAuthStr, fetchRecipesStr);


// handleLaunchApp block
const oldLaunchApp = `  // Launch App from Landing Page with optional deep-link
  const handleLaunchApp = (
    targetTab: TabDestination = 'home',
    initialRecipe?: Recipe
  ) => {
    setViewMode('app');
    if (initialRecipe) {`;

const newLaunchApp = `  // Launch App from Landing Page with optional deep-link
  const handleLaunchApp = (
    targetTab: TabDestination = 'home',
    initialRecipe?: Recipe
  ) => {
    if (!session) {
      setGlobalAuthMode('login');
      setIsGlobalAuthOpen(true);
      return;
    }

    setViewMode('app');
    if (initialRecipe) {`;
code = code.replace(oldLaunchApp, newLaunchApp);

// handleUpdateUser (sync preferences)
const oldHandleUpdateUser = `      const updates: any = {};
      if (updated.name !== undefined) updates.name = updated.name;
      if (updated.avatar !== undefined) updates.avatar = updated.avatar;`;

const newHandleUpdateUser = `      const updates: any = {};
      if (updated.name !== undefined) updates.name = updated.name;
      if (updated.avatar !== undefined) updates.avatar = updated.avatar;
      if (updated.preferences !== undefined) updates.preferences = updated.preferences;`;
code = code.replace(oldHandleUpdateUser, newHandleUpdateUser);


// Save conditions hook
const oldHandleFinishRecipe = `    const newCookedCount = user.cookedCount + 1;
    setUser((prev) => ({
      ...prev,
      cookedCount: newCookedCount
    }));

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ cooked_count: newCookedCount })
        .eq('id', session.user.id);
    }`;

const newHandleFinishRecipe = `    const newCookedCount = user.cookedCount + 1;
    setUser((prev) => ({
      ...prev,
      cookedCount: newCookedCount
    }));

    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ 
          cooked_count: newCookedCount,
          cooking_history: updatedHistory
        })
        .eq('id', session.user.id);
    }`;
code = code.replace(oldHandleFinishRecipe, newHandleFinishRecipe);


// Cooking conditions
const oldHandleSaveConditions = `  const handleSaveConditions = (conds: CookingConditions) => {
    setCookingConditions(conds);
    setIsConditionsModalOpen(false);
  };`;
const newHandleSaveConditions = `  const handleSaveConditions = async (conds: CookingConditions) => {
    setCookingConditions(conds);
    setIsConditionsModalOpen(false);
    if (session?.user) {
      await supabase.from('profiles').update({ cooking_conditions: conds }).eq('id', session.user.id);
    }
  };`;
code = code.replace(oldHandleSaveConditions, newHandleSaveConditions);

const onLogoutOld = `                onLogout={() => {
                  setViewMode('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}`;
const onLogoutNew = `                onLogout={async () => {
                  await supabase.auth.signOut();
                  setViewMode('landing');
                  setSession(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}`;
code = code.replace(onLogoutOld, onLogoutNew);

code = code.replace("recipes={RECIPES}", "recipes={recipes}").replace("recipes={RECIPES}", "recipes={recipes}");

fs.writeFileSync('src/App.tsx', code);
