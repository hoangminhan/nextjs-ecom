import { ListResponse, paramsUrl, shoeProperties } from "@/types"
import axiosClient from "./axios-client"

export const productApi = {
    getListProduct(params:paramsUrl):Promise<ListResponse<shoeProperties>>{
        const url ="/products/get-product"
        return axiosClient.get(url,{params})
    },
    getProductById: (productId:string):Promise<ListResponse<shoeProperties>> => {
        const url = `/products/get-one-product?id=${productId}`;
        return axiosClient.get(url);
    },
    getProductsType: (params:paramsUrl):Promise<ListResponse<shoeProperties>> => {
        const url = "/products/type";
        return axiosClient.get(url, { params });
    },
}