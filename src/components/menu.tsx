import { ContextCustom } from "@/context";
import { Menu, MenuProps, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const StyledMenu = styled(Menu)`
  &.ant-menu-horizontal {
    border-bottom: none;
  }
`;

interface propertiesMenu {
  label: string;
  key: string;
  children: {
    label: string;
    key: string;
  };
}

const handleGetItemMenu = (listMenu: Record<string, unknown>) => {
  let results: any;
  Object.entries(listMenu).forEach((menu, index) => {
    let childrenMenu: any[];
    if (Array.isArray(menu[1])) {
      childrenMenu = menu[1].map((item, index) => {
        return {
          label: <p className="mb-0 text-[18px] capitalize">{item}</p>,
          key: item.replaceAll(" ", "-"),
        };
      });
      results = results?.length
        ? [
            ...results,
            {
              label: <p className="mb-0 text-[18px]">{menu[0]}</p>,
              key: menu[0],
              children: childrenMenu,
            },
          ]
        : [
            {
              label: <p className="mb-0 text-[18px]">{menu[0]}</p>,
              key: menu[0],
              children: childrenMenu,
            },
          ];
    }
  });
  return [
    { label: <p className="mb-0 text-[18px]">Home</p>, key: "Home" },
    ...results,
  ];
};

export function MenuHeader() {
  const router = useRouter();
  const [currentItemMenu, setCurrentItemMenu] = useState<any>(
    router?.query?.type || "Home"
  );

  // const { data, error, mutate } = useSWR("/menu", {
  //   revalidateOnFocus: false,
  //   /* The time in milliseconds that the request will be cached. */
  //   dedupingInterval: 60 * 60 * 1000,
  // });
  const { menuList: menuListNew } = useContext(ContextCustom);
  if (!Object.keys(menuListNew).length)
    return (
      <Skeleton
        title={{ width: "100%" }}
        paragraph={{ width: "100%", rows: 1 }}
        active
      />
    );
  const menuList: propertiesMenu[] = handleGetItemMenu(menuListNew);
  const items: MenuProps["items"] = menuList;
  const onClick: MenuProps["onClick"] = (itemMenu) => {
    setCurrentItemMenu(itemMenu.key);
    if (itemMenu.key === "Home") {
      router.push(`/`);
    } else {
      router.push(`/product/${itemMenu.key}`);
    }
  };
  return (
    <nav className="h-full">
      {Array.isArray(items) && (
        <StyledMenu
          onClick={onClick}
          selectedKeys={[currentItemMenu]}
          mode="horizontal"
          items={items}
        />
      )}
    </nav>
  );
}
