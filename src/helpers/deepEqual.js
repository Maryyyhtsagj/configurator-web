function deepEqual(obj1, obj2) {
  // Check if they are strictly equal
  if (obj1 === obj2) return true;
  // If they are not both objects or arrays, they can't be equal
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  // Check if they are arrays and have the same length
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    // Recursively compare each element
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  // Compare objects by their keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // Recursively compare each key-value pair
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export default deepEqual;
