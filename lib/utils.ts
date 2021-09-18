export const pipe =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x);

export const compose =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduceRight((v, f) => f(v), x);

export const isWithinRange = (range: number[], num: number): boolean => {
  const [min, max] = range;
  return num >= min && num <= max;
};

export const createNumberRange = (
  start: number,
  end: number,
  inclusive: boolean = true
): number[] => {
  return Array.from(
    { length: (inclusive ? end + 1 : end) - start },
    (_v, k) => k + start
  );
};

export type groupedList = {
  [key: string | number]: any[];
};

export const groupBy = (
  list: any[],
  getKey: (item: any) => string | number
): groupedList =>
  list.reduce((groupedList, currentItem) => {
    const group = getKey(currentItem);
    if (!groupedList[group]) groupedList[group] = [];
    groupedList[group].push(currentItem);
    return groupedList;
  }, {} as groupedList);
