export const getAuthToken = (): string | null => {
  return (
    localStorage.getItem("auth-token") || sessionStorage.getItem("auth-token")
  );
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};

export const clearAuthToken = () => {
  localStorage.removeItem("auth-token");
  sessionStorage.removeItem("auth-token");
  sessionStorage.removeItem("auth-session-active");
};
