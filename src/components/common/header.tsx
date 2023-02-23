import { commonApi } from "@/api-client";
import React, { useEffect } from "react";
import NoSSR from "react-no-ssr";

import { Menu } from "../menu";

export interface IHeaderAppProps {}

export function HeaderApp(props: IHeaderAppProps) {
  return (
    <div>
      <div>
        <NoSSR>
          <Menu />
        </NoSSR>
      </div>
    </div>
  );
}
