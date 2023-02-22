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

      <div className="grow-[1]">
        <Link href="/blog" legacyBehavior>
          <a>Blog</a>
        </Link>
        <Link href="/" passHref>
          <p>Home</p>
        </Link>
        <Link href="/work" passHref>
          <p>Work</p>
        </Link>
        {children}
      </div>
      <FooterApp />
    </div>
  );
}
