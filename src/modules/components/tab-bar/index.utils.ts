const pathNamesToHide = ['journal', 'interview', 'chats', 'curated-questions', 'friends-family']

export function hideTabBar(pathname: string) {
  return pathNamesToHide.some((pathNameToHide) => pathname.includes(pathNameToHide))
}
