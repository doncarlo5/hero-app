"use client";

import { useContext } from "react";

import { AuthContext } from "./context-wrapper";

export default function useAuth() {
  return useContext(AuthContext);
}
