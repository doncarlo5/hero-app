import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

import fetchApi from "@/lib/api-handler";
import { supabase } from "@/lib/supabaseClient";
import { UserType } from "@/types/user.type";

type WrapperProps = {
  children: React.ReactNode;
};

interface IAuthContext {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogout: () => void;
  session: Session | null;
  contextBodyWeight: number;
  contextSetBodyWeight: (value: number) => void;
}

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  isLoading: true,
  session: null,
  handleLogout: () => {},
  contextBodyWeight: 0,
  contextSetBodyWeight: () => {},
} as IAuthContext);

const AuthContextWrapper = ({ children }: WrapperProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [contextBodyWeight, contextSetBodyWeight] = useState<number>(0);

  const getSession = async () => {
    try {
      const {
        data: { session },
        error: _error,
      } = await supabase.auth.getSession();
      setSession(session);
      if (_error) throw _error;
      setIsLoggedIn(session !== null);
      if (session) {
        const response = await fetchApi("/api/auth/get-user");
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();

    // If user is logged in with email/password
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const response = await fetchApi("/api/auth/get-user");
          setUser(response.user);
          setIsLoggedIn(session !== null);
          redirect("/main");
        } else {
          setIsLoggedIn(false);
          setUser(null);
          redirect("/");
        }
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      setSession(null);
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      redirect("/");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        handleLogout,
        session,
        contextBodyWeight,
        contextSetBodyWeight,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextWrapper;
