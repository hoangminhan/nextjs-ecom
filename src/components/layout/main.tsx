import { LayoutProps } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { FooterApp, HeaderApp } from "../common";

export function MainLayout(props: LayoutProps) {
  useEffect(() => {
    console.log("mounting");
    return () => console.log("unmounting");
  }, []);
  const { children } = props;
  return (
    <div className="min-h-[100vh] flex flex-col px-4">
      <HeaderApp />

      <div className="grow-[1] mt-[70px]">{children}</div>
      <FooterApp />
    </div>
  );
}
