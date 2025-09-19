export function parseToNumber(input: string): number | string {
  const parsed = parseFloat(input)
  return isNaN(parsed) ? '' : parsed
}
