export const isApproximateMatch = (query: string, text: string): boolean => {
  const cleanQuery = query.toLowerCase().replace(/\s+/g, "");
  const cleanText = text.toLowerCase().replace(/\s+/g, "");

  if (cleanQuery.length === 0 || cleanText.length === 0) return false;

  let queryIndex = 0;
  let matchCount = 0;

  for (let i = 0; i < cleanText.length; i++) {
    if (cleanText[i] === cleanQuery[queryIndex]) {
      queryIndex++;
      matchCount++;
      if (queryIndex === cleanQuery.length) break;
    }
  }

  return matchCount / cleanQuery.length >= 0.9;
};
