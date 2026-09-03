const fs = require('fs');
let code = fs.readFileSync('src/components/AuthModal.tsx', 'utf8');

// 1. Remove state variable
code = code.replace(
  `  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);\n`,
  ``
);

// 2. Remove state reset
code = code.replace(
  `      setIsConfirmationRequired(false);\n`,
  ``
);

// 3. Revert handleSubmit success logic
const oldSubmitLogic = `        if (data.user && !data.session) {
          setIsConfirmationRequired(true);
          // Only show the screen, do not show the success banner
          setSuccess(null);
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

const newSubmitLogic = `        setSuccess(\`Bienvenue \${name.trim()} ! Votre compte est créé.\`);
        setTimeout(() => {
          onSuccess({
            name: name.trim(),
            email: email.trim()
          });
          onClose();
        }, 700);`;

code = code.replace(oldSubmitLogic, newSubmitLogic);

// 4. Revert JSX logic
const oldJsxLogic = `        {isConfirmationRequired ? (
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

const newJsxLogic = `        {isForgotPasswordView ? (`

code = code.replace(oldJsxLogic, newJsxLogic);

fs.writeFileSync('src/components/AuthModal.tsx', code);
console.log('Reverted AuthModal');
