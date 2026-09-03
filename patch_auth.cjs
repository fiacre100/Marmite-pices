const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

const oldCode = `        if (signupError) throw signupError;

        setSuccess(\`Bienvenue \${name.trim()} ! Votre compte est créé.\`);
        setTimeout(() => {
          onSuccess({
            name: name.trim(),
            email: email.trim()
          });
          onClose();
        }, 700);`;

const newCode = `        if (signupError) throw signupError;

        if (data.user && !data.session) {
          setSuccess(\`Un email de confirmation a été envoyé à \${email}. Veuillez cliquer sur le lien pour activer votre compte.\`);
        } else {
          setSuccess(\`Bienvenue \${name.trim()} ! Votre compte est créé.\`);
          setTimeout(() => {
            onSuccess({
              name: name.trim(),
              email: email.trim()
            });
            onClose();
          }, 700);
        }`;

if (code.includes(oldCode)) {
  fs.writeFileSync('src/components/AuthModal.tsx', code.replace(oldCode, newCode));
  console.log('Patched AuthModal.tsx');
} else {
  console.log('Could not find code to replace.');
}
