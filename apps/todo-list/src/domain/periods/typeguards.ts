import { Period, PeriodList } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPeriodListValid = (periodList: any): periodList is PeriodList => {
  return periodList && Array.isArray(periodList);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isPeriodValid = (period: any): period is Period => {
  return (
    period &&
    typeof period.id === "number" &&
    typeof period.startTime === "string" &&
    typeof period.endTime === "string" &&
    typeof period.type === "string"
  );
}
