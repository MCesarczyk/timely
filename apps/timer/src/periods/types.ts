import { ApiResponse } from "../common/types";

export interface Period {
  id: number;
  startTime: string;
  endTime: string;
  type: string;
  todoId: number | null;
}

export type PeriodList = Period[];

export interface PeriodListApiResponse extends ApiResponse {
  data: PeriodList;
}
