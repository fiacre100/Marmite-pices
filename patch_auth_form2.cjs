const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

const oldCode = `        if (data.user && !data.session) {
          setIsConfirmationRequired(true);
          setSuccess(\`Un email de confirmation a été envoyé à \${email}. Veuillez cliquer sur le lien pour activer votre compte.\`);
        }`;

const newCode = `        if (data.user && !data.session) {
          setIsConfirmationRequired(true);
          // Only show the screen, do not show the success banner
          setSuccess(null);
        }`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/components/AuthModal.tsx', code);
console.log('Done');
