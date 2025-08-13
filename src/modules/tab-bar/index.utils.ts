const pathNamesToHide = ['journal']

export function hideTabBar(pathname: string) {
  return pathNamesToHide.includes(pathname)
}
