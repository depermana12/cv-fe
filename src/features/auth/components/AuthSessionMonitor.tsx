import { useEffect } from "react";
import { useAuthStore } from "@app/store/authStore";

export const AuthSessionMonitor = () => {
  const { checkAuthValidity } = useAuthStore();

  useEffect(() => {
    // Check auth validity on app start and when focus returns
    const handleFocus = () => {
      checkAuthValidity();
    };

    const handleBeforeUnload = () => {
      // If not remember me, clear session storage on tab close
      const { rememberMe } = useAuthStore.getState();
      if (!rememberMe) {
        sessionStorage.removeItem("auth-session-active");
      }
    };

    checkAuthValidity();

    // Add event listeners to return tab and close tab
    window.addEventListener("focus", handleFocus);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [checkAuthValidity]);

  return null;
};
