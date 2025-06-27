import { useEffect, useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { FaGoogle } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

import { supabase } from "@/lib/supabaseClient"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useToast } from "../components/ui/use-toast"

const AuthPage = () => {
  const { toast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  })
  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        navigate("/")
      }
    }

    checkSession()
  }, [navigate])

  const handleLoginChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSignupChange = (e: any) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value })
  }

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginState.email,
        password: loginState.password,
      })
      if (error) throw error
      navigate("/")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.signUp({
        email: signupState.email,
        password: signupState.password,
        options: {
          data: {
            firstName: signupState.firstName,
            lastName: signupState.lastName,
          },
        },
      })
      if (error) throw error
      toast({
        title: "Inscription réussie!",
        description: "Vérifiez votre email pour confirmer votre compte.",
      })
      setSignupState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(loginState.email, {
        redirectTo: "https://hero-app.org/profile/reset-password",
      })
      if (error) throw error
      alert("Check your email for the password reset link.")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: any) => {
    setIsLoading(true)
    setError("")
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <main className="container mx-auto my-0 flex h-dvh max-w-lg flex-col ">
        <div className="pt-5 md:px-6">
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="">
                <div className="mt-5 text-left">
                  <h1 className="mb-10 text-3xl font-bold">Se connecter</h1>
                </div>
                <div className="my-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex w-full items-center justify-center gap-2"
                    onClick={() => handleOAuthSignIn("google")}
                  >
                    <FaGoogle className="ml-2" />
                    Connexion avec Google
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Ton adresse email"
                        value={loginState.email}
                        onChange={handleLoginChange}
                        required
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                        value={loginState.password}
                        onChange={handleLoginChange}
                        required
                        type={showPassword ? "text" : "password"}
                        autoComplete="on"
                      />
                    </div>
                  </div>

                  <div className="flex select-none items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        id="showPassword"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
                        Afficher le mot de passe
                      </label>
                    </div>
                    <Button
                      onClick={handleResetPassword}
                      variant={"link"}
                      className="m-0 p-0 text-gray-500 underline dark:text-gray-400"
                    >
                      Mot de passe oublié?
                    </Button>
                  </div>

                  {isLoading ? (
                    <Button disabled className="w-full">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Chargement
                    </Button>
                  ) : (
                    <Button className="w-full" type="submit">
                      Connexion
                    </Button>
                  )}
                  <Button
                    onClick={() => setIsLogin(false)}
                    variant={"link"}
                    className="m-0 w-full p-0 text-center text-gray-500 underline dark:text-gray-400"
                  >
                    Aucun compte? S'enregistrer
                  </Button>
                  {error && (
                    <Alert className="mt-1" variant="destructive">
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div className="mx-auto max-w-sm space-y-6 pb-5">
                <div className="mt-5 space-y-2 text-left">
                  <h1 className="text-3xl font-bold">S'inscrire</h1>
                  <Button
                    onClick={() => setIsLogin(true)}
                    variant={"link"}
                    className="m-0 p-0 text-gray-500 underline dark:text-gray-400"
                  >
                    Déjà inscrit? Se connecter
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        placeholder="Johnny"
                        value={signupState.firstName}
                        onChange={handleSignupChange}
                        required
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        placeholder="Bravo"
                        value={signupState.lastName}
                        onChange={handleSignupChange}
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="johnny.bravo@email.com"
                      value={signupState.email}
                      onChange={handleSignupChange}
                      required
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                      value={signupState.password}
                      onChange={handleSignupChange}
                      required
                      type={showPassword ? "text" : "password"}
                      autoComplete="on"
                    />
                  </div>
                  <div className="flex select-none items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox
                        id="showPassword"
                        checked={showPassword}
                        onCheckedChange={() => setShowPassword(!showPassword)}
                      />
                      <label
                        htmlFor="showPassword"
                        className="ml-2 block items-baseline text-sm text-gray-900 dark:text-gray-200"
                      >
                        Afficher le mot de passe
                      </label>
                    </div>
                  </div>
                  <div className="mt-10">
                    {isLoading ? (
                      <Button disabled className="w-full">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Chargement
                      </Button>
                    ) : (
                      <Button className="w-full" type="submit">
                        Inscription
                      </Button>
                    )}
                    {error && (
                      <Alert className="mt-1" variant="destructive">
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default AuthPage
