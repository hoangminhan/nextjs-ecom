import { ListResponse, paramsUrl, shoeProperties } from "@/types"
import axiosClient from "./axios-client"

export const productApi = {
    getListProduct(params:paramsUrl):Promise<ListResponse<shoeProperties>>{
        const url ="products/get-product"
        return axiosClient.get(url,{params})
    }
}