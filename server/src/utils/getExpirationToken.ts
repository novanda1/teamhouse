export const getExpirationToken = (expireIn: number): Date => {
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + expireIn);

  return expiration;
};
