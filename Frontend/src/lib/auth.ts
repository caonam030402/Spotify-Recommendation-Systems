export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const setAccessTokenToLS = (access_token: string) =>
  localStorage.setItem('access_token', `Bearer ${access_token}`)
