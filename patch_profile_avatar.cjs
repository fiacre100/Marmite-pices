const fs = require('fs');
let code = fs.readFileSync('src/views/ProfileView.tsx', 'utf8');

// 1. Add supabase import
code = code.replace(
  `import { UserProfile, Recipe } from '../types';`,
  `import { UserProfile, Recipe } from '../types';
import { supabase } from '../lib/supabase';
import { Camera, Loader2 } from 'lucide-react';`
);

// 2. Add state variables for uploading
code = code.replace(
  `  const [activeModal, setActiveModal] = useState<'settings' | 'history' | 'logout' | null>(null);`,
  `  const [activeModal, setActiveModal] = useState<'settings' | 'history' | 'logout' | null>(null);
  const [isUploading, setIsUploading] = useState(false);`
);

// 3. Add handleAvatarUpload logic
const newUploadLogic = `  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = \`\${Math.random()}.\${fileExt}\`;
      const filePath = \`avatars/\${fileName}\`;

      setIsUploading(true);

      // Verify the session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert("Vous devez être connecté pour changer d'avatar.");
        setIsUploading(false);
        return;
      }

      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      // Update local and global state
      onUpdateUser({ avatar: data.publicUrl });
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      alert(\`Erreur lors du téléchargement de l'avatar: \${error.message}\`);
    } finally {
      setIsUploading(false);
    }
  };

  const completedRecipes = recipes.filter((r) => cookingHistory.includes(r.id));`;

code = code.replace(
  `  const completedRecipes = recipes.filter((r) => cookingHistory.includes(r.id));`,
  newUploadLogic
);

// 4. Update the Avatar JSX
const oldAvatarJsx = `        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#EBE5DC] shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#6B7F5E] rounded-full ring-2 ring-white" />
          </div>`;

const newAvatarJsx = `        <div className="flex items-center gap-4">
          <label className="relative cursor-pointer group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarUpload} 
              disabled={isUploading}
            />
            <img
              src={user.avatar}
              alt={user.name}
              className={\`w-16 h-16 rounded-full object-cover border-2 border-[#EBE5DC] shadow-sm transition-opacity \${isUploading ? 'opacity-50' : 'group-hover:opacity-80'}\`}
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#6B7F5E] rounded-full ring-2 ring-white" />
            
            {/* Overlay for uploading or hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Camera className="w-5 h-5 text-white" />
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full">
                <Loader2 className="w-5 h-5 text-[#C85A32] animate-spin" />
              </div>
            )}
          </label>`;

code = code.replace(oldAvatarJsx, newAvatarJsx);

fs.writeFileSync('src/views/ProfileView.tsx', code);
console.log('Patched ProfileView.tsx');
