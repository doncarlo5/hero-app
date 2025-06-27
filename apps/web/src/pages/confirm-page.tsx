
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ConfirmEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-0 flex h-dvh max-w-lg flex-col items-center justify-center p-5">
      <h1 className="mb-5 text-3xl font-bold">Confirmation de l'email</h1>
      <p className="mb-5 text-center text-gray-700">
        Merci de vous être inscrit sur Hero App! Un email de confirmation a été envoyé à votre adresse email. Veuillez suivre les instructions dans l'email pour confirmer votre compte.
      </p>
      <Button
        className="w-full"
        onClick={() => navigate("/")}
      >
        Retour à la page d'accueil
      </Button>
    </div>
  );
};

export default ConfirmEmail;
