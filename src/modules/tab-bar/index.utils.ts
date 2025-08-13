const pathNamesToHide = ['journal', 'interview']

export function hideTabBar(pathname: string) {
  return pathNamesToHide.some((pathNameToHide) => pathname.includes(pathNameToHide))
}
