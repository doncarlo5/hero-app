"use client";

import { Session } from "@supabase/supabase-js";
import React, { createContext, useEffect, useMemo, useState } from "react";

import fetchApi from "@/lib/api-handler";
import { supabase } from "@/lib/supabase-client";
import { UserType } from "@/types/user.type";

interface IAuthContext {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
  session: Session | null;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  isLoading: true,
  handleLogout: async () => {},
  session: null,
});

export default function AuthContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoggedIn(session !== null);
      if (session) {
        document.cookie = `auth-token=${session.access_token}; path=/`;
        const response = await fetchApi("/api/auth/verify");
        setUser(response.user);
      } else {
        document.cookie = "auth-token=; Max-Age=0; path=/";
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
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setIsLoggedIn(session !== null);
        if (session) {
          document.cookie = `auth-token=${session.access_token}; path=/`;
          try {
            const response = await fetchApi("/api/auth/verify");
            setUser(response.user);
          } catch {
            setUser(null);
          }
        } else {
          document.cookie = "auth-token=; Max-Age=0; path=/";
          setUser(null);
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      setSession(null);
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      document.cookie = "auth-token=; Max-Age=0; path=/";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, setUser, isLoggedIn, isLoading, handleLogout, session }),
    [user, isLoggedIn, isLoading, handleLogout, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
