export const convertCamelCase = (str: string): string => {
  const trimmedStr = str.trim();
  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1).toLowerCase();
};