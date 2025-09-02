const pathNamesToHide = ['journal', 'interview', 'chats', 'curated-questions']

export function hideTabBar(pathname: string) {
  return pathNamesToHide.some((pathNameToHide) => pathname.includes(pathNameToHide))
}
