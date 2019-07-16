export default {};
export function filter(arr, filterObj) {
  const filterEntries = Object.entries(filterObj).filter(
    _ => ![undefined, null, ''].includes(_[1])
  );
  return arr.filter(_ => filterEntries.every(([k, v]) => _[k] === v));
}
