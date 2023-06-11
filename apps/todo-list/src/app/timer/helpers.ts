export const compileTimeDisplayHelper = (date: Date) => [
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

export const ensureTwoDigitDateHelper = (number: number) =>
  number < 10 ? `0${number}` : number;

export const buildTimeStringHelper = (time: number[]): string =>
  time.map((time) => ensureTwoDigitDateHelper(time)).join(':');
