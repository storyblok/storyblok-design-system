export const MOBILE_WIDTH = 768

export const isMobileWidth = (): boolean => {
  return window.innerWidth < MOBILE_WIDTH
}
