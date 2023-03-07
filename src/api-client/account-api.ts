import { userInfo } from "@/types";
import axiosClient from "./axios-client";

export const apiAccount = {
    login: (dataBody:userInfo) => {
        const url = "user/login";
        return axiosClient.post(url, dataBody);
    },
    getProfile: () => {
        const url = "user/profile";
        return axiosClient.get(url);
    },
    logout: () => {
        const url = "user/logout";
        return axiosClient.post(url);
    },
    register: (dataBody:userInfo) => {
        const url = "user/registers";
        return axiosClient.post(url, dataBody);
    },
    googleLogin: (tokenId:string) => {
        const url = "user/google-login";
        return axiosClient.post(url, tokenId);
    },
    changePassword: (password:string) => {
        const url = "user/change-password";
        return axiosClient.post(url, password);
    },
};