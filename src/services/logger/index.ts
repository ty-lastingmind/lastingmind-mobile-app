export function logInfo(message?: unknown, ...optionalParams: unknown[]) {
  console.log(message, ...optionalParams)
}

export function logError(message?: unknown, ...optionalParams: unknown[]) {
  console.error(message, ...optionalParams)
}
