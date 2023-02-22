import { responseMenu } from "@/types";
import axiosClient from "./axios-client";

export const commonApi = {
  getMenu():Promise<responseMenu> {
    const url = "menu";
    return axiosClient.get(url);
  },
};
