export function getFileExtension(fileUri: string, defaultValue = 'm4a') {
  const uriParts = fileUri.split('.')
  return uriParts.length > 1 ? uriParts[uriParts.length - 1] : defaultValue
}
