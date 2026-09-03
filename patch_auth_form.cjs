const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

// I'll define a new state variable: const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);
code = code.replace(
  `const [success, setSuccess] = useState<string | null>(null);`,
  `const [success, setSuccess] = useState<string | null>(null);
  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);`
);

code = code.replace(
  `setSuccess(null);
      setIsForgotPasswordView(false);`,
  `setSuccess(null);
      setIsConfirmationRequired(false);
      setIsForgotPasswordView(false);`
);

code = code.replace(
  `if (data.user && !data.session) {
          setSuccess(\`Un email de confirmation a été envoyé à \${email}. Veuillez cliquer sur le lien pour activer votre compte.\`);
        }`,
  `if (data.user && !data.session) {
          setIsConfirmationRequired(true);
          setSuccess(\`Un email de confirmation a été envoyé à \${email}. Veuillez cliquer sur le lien pour activer votre compte.\`);
        }`
);

// We need to hide the form when isConfirmationRequired is true.
// The form is currently rendered inside: `{!isForgotPasswordView ? ( <form>... ) : ( ... )}`
code = code.replace(
  `{isForgotPasswordView ? (`,
  `{isConfirmationRequired ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-[#EBF0E6] text-[#6B7F5E] flex items-center justify-center mx-auto mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#1C1A18]">Consultez votre boîte mail</p>
            <p className="text-xs text-[#736D66] px-4">
              Pour des raisons de sécurité, vous devez confirmer votre adresse email avant d'accéder à l'application.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full h-11 rounded-full border-2 border-[#EBE5DC] text-[#1C1A18] font-bold text-xs mt-4 hover:bg-[#FAF6F0]"
            >
              Fermer et retourner à l'accueil
            </button>
          </div>
        ) : isForgotPasswordView ? (`
);

fs.writeFileSync('src/components/AuthModal.tsx', code);
console.log('Done');
