function deepClone(arrOrObj) {
  return JSON.parse(JSON.stringify(arrOrObj));
}

export default deepClone;
