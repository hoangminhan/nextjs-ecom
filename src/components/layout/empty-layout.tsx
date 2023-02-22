import { LayoutProps } from "@/types";
import * as React from "react";

export interface IEmptyLayoutProps {}

export function EmptyLayout(props: LayoutProps) {
  const { children } = props;
  return <div>{children}</div>;
}
