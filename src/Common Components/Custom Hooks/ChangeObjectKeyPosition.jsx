// export default function ChangeObjectKeyPosition(obj, key, newIndex) {
//   if (obj !== undefined && obj !== null) {
//     const keys = Object.keys(obj);
//     const values = Object.values(obj);
//     const newKeys = [
//       ...keys.slice(0, newIndex),
//       key,
//       ...keys.slice(newIndex, keys.length),
//     ];
//     const newValues = [
//       ...values.slice(0, newIndex),
//       obj[key],
//       ...values.slice(newIndex, values.length),
//     ];
//     const result = {};
//     for (let i = 0; i < newKeys.length; i++) {
//       result[newKeys[i]] = newValues[i];
//     }
//     return result;
//   }
// }

export default function ChangeObjectKeyPosition(obj, key, newIndex) {
  if (obj === undefined || obj === null) {
    return obj;
  }
  const entries = Object.entries(obj);
  entries.splice(newIndex, 0, [key, obj[key]]);
  const result = Object.fromEntries(entries);
  return result;
}
