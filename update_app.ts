import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace localStorage for user profile and favorites with Supabase logic.

const replacement = `
  const [session, setSession] = useState<any>(null);
  
  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(DEFAULT_FAVORITE_IDS);
  
  // User profile state
  const [user, setUser] = useState<UserProfile>({
    name: 'Invité',
    title: 'Explorateur Culinaire',
    speciality: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    cookedCount: 0,
    favoriteSpicesCount: 0,
    isPremium: false,
    preferences: {
      spiciness: 'moyen',
      diet: [],
      cookingTimePreference: '30-45min',
      soundAlerts: true,
      keepScreenOn: true
    },
    email: ''
  });

  // Sync Supabase Auth session and data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserData(currentSession.user.id);
      } else {
        loadLocalFallback();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserData(currentSession.user.id);
      } else {
        loadLocalFallback();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadLocalFallback = () => {
    try {
      const storedFavorites = localStorage.getItem('marmite_favorites');
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    } catch {}
    try {
      const storedUser = localStorage.getItem('marmite_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {}
  };

  const fetchUserData = async (userId: string) => {
    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      setUser((prev) => ({
        ...prev,
        name: profile.name || prev.name,
        avatar: profile.avatar || prev.avatar,
        isPremium: profile.is_premium || false,
        cookedCount: profile.cooked_count || 0
      }));
    }

    // Fetch favorites
    const { data: userFavorites } = await supabase
      .from('user_favorites')
      .select('recipe_id')
      .eq('user_id', userId);

    if (userFavorites) {
      setFavorites(userFavorites.map(f => f.recipe_id));
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (recipeId: string) => {
    const isCurrentlyFavorite = favorites.includes(recipeId);
    
    // Update local state optimistically
    setFavorites((prev) =>
      isCurrentlyFavorite ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );

    if (session?.user) {
      // Sync with Supabase
      if (isCurrentlyFavorite) {
        await supabase
          .from('user_favorites')
          .delete()
          .match({ user_id: session.user.id, recipe_id: recipeId });
      } else {
        await supabase
          .from('user_favorites')
          .insert({ user_id: session.user.id, recipe_id: recipeId });
      }
    } else {
      // Sync with local storage
      const newFavorites = isCurrentlyFavorite ? favorites.filter(id => id !== recipeId) : [...favorites, recipeId];
      localStorage.setItem('marmite_favorites', JSON.stringify(newFavorites));
    }
  };

  // Profile updates
  const handleUpdateUser = async (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    if (session?.user) {
      const updates: any = {};
      if (updated.name !== undefined) updates.name = updated.name;
      if (updated.avatar !== undefined) updates.avatar = updated.avatar;
      
      if (Object.keys(updates).length > 0) {
        await supabase
          .from('profiles')
          .update(updates)
          .eq('id', session.user.id);
      }
    } else {
      localStorage.setItem('marmite_user', JSON.stringify({ ...user, ...updated }));
    }
  };

  const handleActivatePremium = async () => {
    setUser((prev) => ({ ...prev, isPremium: true }));
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ is_premium: true })
        .eq('id', session.user.id);
    } else {
      localStorage.setItem('marmite_user', JSON.stringify({ ...user, isPremium: true }));
    }
  };

  const handleFinishRecipe = async (recipe: Recipe) => {
    setIsCookingMode(false);
    setSelectedRecipe(null);
    
    let updatedHistory = cookingHistory;
    if (!cookingHistory.includes(recipe.id)) {
      updatedHistory = [recipe.id, ...cookingHistory];
      setCookingHistory(updatedHistory);
    }
    
    const newCookedCount = user.cookedCount + 1;
    setUser((prev) => ({
      ...prev,
      cookedCount: newCookedCount
    }));

    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ cooked_count: newCookedCount })
        .eq('id', session.user.id);
    } else {
      localStorage.setItem('marmite_user', JSON.stringify({ ...user, cookedCount: newCookedCount }));
    }
  };
`;
// I will use sed or manually replace using tool `edit_file`.

