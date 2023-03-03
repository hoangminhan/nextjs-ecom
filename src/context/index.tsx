import { MyContextType } from "@/types";
import { createContext, useEffect, useState } from "react";

interface contextProps {
  children: React.ReactNode;
}

export const ContextCustom = createContext<MyContextType>({
  menuList: [],
  setMenuList: function (props: any): void {},
});
export const UseContextProvider = ({ children }: contextProps) => {
  const [menuList, setMenuList] = useState({});
  useEffect(() => {
    const menu = sessionStorage.getItem("MenuApp");
    if (menu) {
      setMenuList(JSON.parse(menu));
    }
  }, []);
  return (
    <ContextCustom.Provider
      value={{
        menuList,
        setMenuList,
      }}
    >
      {children}
    </ContextCustom.Provider>
  );
};
