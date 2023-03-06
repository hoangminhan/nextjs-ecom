import { NextPage } from "next";
import { AppProps } from "next/app";
import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

export interface LayoutProps {
  children: ReactNode;
}
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement
  }
// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   Layout?: (props: LayoutProps) => ReactElement;
// };
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;

};
export interface shoeProperties {
  numReviews: number;
  rating: number;
  color: any[];
  poster: any[];
  createdAt: string;
  _id: string;
  name: string;
  price: number;
  sex: string;
  collections: string;
  productType: string;
  description: string;
  key: string;
  NSX: string;
  size: [35 | 36 | 37 | 38 | 39 | 40 | 41 | 42];
}
export interface paramsUrl {
  limit?:number,
  [key:string]:any

}
export interface ListResponse<T> {
  product?: T[];
  data:T[];
  status?:number
  start:number
  end:number
  limit:number
  length: number
}
export interface ItemResponse<T> {
  product?: T;
  data?:T;
  status?:number
  start:number
  end:number
  limit:number
  length: number
}
export interface responseMenu {
  Adidas: any[];
  Converse: any[];
  NewBalance: any[];
  Nike: any[];
  Puma: any[];
  Vans: any[];
}
export interface MyContextType {
  menuList:any,
  setMenuList:(props:any)=>void
  currentModal:any,
  setCurrentModal:(props:any)=>void
}
