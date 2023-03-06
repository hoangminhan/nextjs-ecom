import { MyContextType } from "@/types";
import { createContext, useEffect, useState } from "react";

interface contextProps {
  children: React.ReactNode;
}

export const ContextCustom = createContext<MyContextType>({
  menuList: [],
  setMenuList: function (props: any): void {},
  currentModal: [],
  setCurrentModal: function (props: any): void {},
});
export const UseContextProvider = ({ children }: contextProps) => {
  const [menuList, setMenuList] = useState({});
  const [currentModal, setCurrentModal] = useState("modal-type-product");
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
        currentModal,
        setCurrentModal,
      }}
    >
      {children}
    </ContextCustom.Provider>
  );
};
