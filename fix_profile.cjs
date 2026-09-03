const fs = require('fs');
let code = fs.readFileSync('src/views/ProfileView.tsx', 'utf8');

// 1. Add isUploading state
code = code.replace(
  `  const [activeModal, setActiveModal] = useState<'preferences' | 'history' | 'settings' | 'logout' | null>(null);`,
  `  const [activeModal, setActiveModal] = useState<'preferences' | 'history' | 'settings' | 'logout' | null>(null);
  const [isUploading, setIsUploading] = useState(false);`
);

// 2. Add handleAvatarUpload function
const funcCode = `  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // History recipes`;

code = code.replace(
  `  // History recipes`,
  funcCode
);

fs.writeFileSync('src/views/ProfileView.tsx', code);
console.log('Fixed ProfileView.tsx');
