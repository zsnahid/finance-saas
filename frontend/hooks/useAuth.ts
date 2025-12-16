import { AuthContext } from "@/contexts/auth.context";
import { useContext } from "react";

export function useAuth() {
  // TODO: Based on the presence of the access_token cookie, set isAuthenticated to true or false, redirecting as necessary and send unauthenticated users to the login page.

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
