/**
 * Search params are held as an array of two elements arrays where member 0 is the key and member 1 is value
 * This function extracts the values from the array and returns an object with the key as the property name and the value as the property value
 * Where a key has multiple values, the value is an array of values
 *
 * @param {URLSearchParams} searchParams
 */
export function extractExistingParams(searchParams: URLSearchParams): {
  [key: string]: string[];
} {
  const entries = Array.from(searchParams.entries());

  return entries.reduce(
    (acc: { [key: string]: string[] }, [key, value]: [string, string]) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(value);
      return acc;
    },
    {},
  );
}
