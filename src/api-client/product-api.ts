import { ListResponse, paramsUrl, shoeProperties } from "@/types"
import axiosClient from "./axios-client"

export const productApi = {
    getListProduct(params:paramsUrl):Promise<ListResponse<shoeProperties>>{
        console.log("get")
        const url ="/products/get-product"
        return axiosClient.get(url,{params})
    },
    getProductsType: (params:paramsUrl):Promise<ListResponse<shoeProperties>> => {
        const url = "/products/type";
        return axiosClient.get(url, { params });
    },
}