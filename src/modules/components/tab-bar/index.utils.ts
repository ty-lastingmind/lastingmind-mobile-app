const pathNamesToHide = ['journal', 'interview', 'chats']

export function hideTabBar(pathname: string) {
  return pathNamesToHide.some((pathNameToHide) => pathname.includes(pathNameToHide))
}
