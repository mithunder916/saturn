// e.g. range = [-128, -40]; function assumes that the range that val comes from is 0 - 1
export function adjustToScale(val, range){
  return val * (range[1] - range[0]) + range[0];
}
