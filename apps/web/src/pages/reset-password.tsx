import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

import { useToast } from "../components/ui/use-toast";

const ResetPassword = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic password validation
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast({
        title: "Mot de passe mis à jour!",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
      navigate("/login");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col">
        <div className="pt-5 md:px-6">
          <form onSubmit={handleUpdatePassword}>
            <div className="mt-5 text-left">
              <h1 className="mb-10 text-3xl font-bold">Nouveau mot de passe</h1>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <Input
                    id="password"
                    placeholder="Entrez votre nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirmez votre nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                  />
                </div>
              </div>

              {isLoading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Chargement
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Mettre à jour
                </Button>
              )}

              <Button
                onClick={() => navigate("/login")}
                variant={"link"}
                className="m-0 w-full p-0 text-center text-gray-500 underline dark:text-gray-400"
              >
                Retour à la connexion
              </Button>

              {error && (
                <Alert className="mt-1" variant="destructive">
                  <AlertTitle>Erreur</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
