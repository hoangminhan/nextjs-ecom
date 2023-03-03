import { responseMenu } from "@/types";
import axiosClient from "./axios-client";

export const commonApi = {
  getMenu():Promise<any> {
    const url = "menu";
    return axiosClient.get(url);
  },
};
