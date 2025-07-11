export function validateRange (
  searchParams: URLSearchParams, fromName: string, toName: string, fromValue: number, toValue: number
): [number, number] {
  let selectedFrom = Number(searchParams.get(fromName)) || fromValue;
  let selectedTo = Number(searchParams.get(toName)) || toValue;
  if (selectedFrom > selectedTo || selectedFrom < fromValue) selectedFrom = fromValue;
  if (selectedTo < selectedFrom || selectedTo > toValue) selectedTo = toValue;
  return [selectedFrom, selectedTo];
}