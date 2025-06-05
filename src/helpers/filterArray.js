function filterArray(arr, excludeList) {
  return arr.filter((item) => !excludeList.includes(item));
}

export default filterArray;
