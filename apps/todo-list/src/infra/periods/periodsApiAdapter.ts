import axios from "axios";
import { API_URLS } from "./periodsApiUrls";
import { Period } from "domain/periods/types";

export const restApi = {
  getPeriods: async () => {
    const response = await axios.get(API_URLS.getPeriods);
    const periods = await response.data;
    return periods;
  },

  getPeriod: async (id: string) => {
    const response = await axios.get(API_URLS.getPeriod.replace(':periodId', id));
    const period = await response.data;
    return period;
  },

  createPeriod: async (period: Period) => {
    const response = await axios.post(API_URLS.createPeriod, period);
    const createdPeriod = await response.data;
    return createdPeriod;
  },

  updatePeriod: async (period: Period) => {
    const response = await axios.put(API_URLS.updatePeriod.replace(':periodId', String(period.id)), period);
    const updatedPeriod = await response.data;
    return updatedPeriod;
  },

  deletePeriod: async (id: string) => {
    const response = await axios.delete(API_URLS.deletePeriod.replace(':periodId', id));
    const deletedPeriod = await response.data;
    return deletedPeriod;
  },
};
