import * as React from "react";
import useSWR from "swr";

export interface MenuProps {}

export function Menu(props: MenuProps) {
  const { data, error, mutate } = useSWR("/menu", {
    revalidateOnFocus: false,
    /* The time in milliseconds that the request will be cached. */
    dedupingInterval: 60 * 60 * 1000,
  });
  console.log({ data });
  if (data) {
  }

  return <div>menu</div>;
}
