export const isTokenExpired = (exp: number | null): boolean => {
  if (!exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);

  return exp <= currentTime;
};
