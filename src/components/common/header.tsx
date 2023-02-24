import { commonApi } from "@/api-client";
import { imageApp } from "@/assets/images";
import Image from "next/image";
import React, { useEffect } from "react";
import { MenuHeader } from "../menu";

export interface IHeaderAppProps {}

export function HeaderApp(props: IHeaderAppProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[72px] z-[5] border-b bg-white px-4 py-2 shadow-md">
      <div className="h-full flex items-center justify-between">
        {/* logo */}
        <div className="grow-[1]">
          <MenuHeader />
        </div>
        <div className="mr-4">
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Image src={imageApp.searchImg} alt="" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        {/* profile */}
        <div>Profile</div>
      </div>
    </div>
  );
}
