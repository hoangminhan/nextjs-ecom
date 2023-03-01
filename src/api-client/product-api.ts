import { ItemResponse } from './../types/common';
import { ListResponse, paramsUrl, shoeProperties } from "@/types"
import axiosClient from "./axios-client"

export const productApi = {
    getListProduct(params:paramsUrl):Promise<ListResponse<shoeProperties>>{
        const url ="/products/get-product"
        return axiosClient.get(url,{params})
    },
    getProductById: (productId:string):Promise<ItemResponse<shoeProperties>> => {
        const url = `/products/get-one-product?id=${productId}`;
        return axiosClient.get(url);
    },
    getProductNSX: (params:paramsUrl):Promise<ItemResponse<shoeProperties>> => {
        const url = "/products/nsx";
        return axiosClient.get(url, { params });
    },
    getProductsType: (params:paramsUrl):Promise<ListResponse<shoeProperties>> => {
        const url = "/products/type";
        return axiosClient.get(url, { params });
    },
}