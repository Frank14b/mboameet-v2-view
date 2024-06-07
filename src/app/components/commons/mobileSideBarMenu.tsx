"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  CogIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useMainContext } from "@/app/contexts/main";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { chatsPathUrl, marketplacePathUrl } from "@/app/lib/constants/app";
import SideBarMenuComponent from "@/app/components/commons/SideBarMenu";
import AsideBarMenuComponent from "@/app/components/commons/AsideBarMenu";

export function MobileSideBarMenuComponent({
  enable,
  isMarketPlace,
}: {
  enable?: boolean;
  isMarketPlace?: boolean;
}) {
  //
  const [floatingBtnClass, setFloatingBtnClass] = useState<string>("bottom-12 right-12");
  const [activeMenu, setActiveMenu] = React.useState<"left" | "right" | "">("");
  const { navigationChange } = useMainContext();
  const { push, pathname } = useCustomRouter();

  const closeMenu = () => setActiveMenu("");

  const openLink = useCallback(
    (link: string) => {
      push(link);
    },
    [push]
  );

  useEffect(() => {
    if (navigationChange == "start") {
      setActiveMenu("");
    }
  }, [navigationChange]);

  useEffect(() => {
    if (pathname.startsWith(`${chatsPathUrl}/`)) {
      setFloatingBtnClass("bottom-28 right-12") 
    }else{
      setFloatingBtnClass("bottom-12 right-12")
    }
  }, [pathname])

  return (
    <React.Fragment>
      <div
        className={`z-20 fixed ${floatingBtnClass} ${
          enable ? "" : "min-sm:hidden"
        }`}
      >
        <div className="absolute bottom-0 right-0">
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton
                placeholder={""}
                size="lg"
                className="rounded-full bg-pink-500"
              >
                <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent placeholder={""}>
              <SpeedDialAction
                placeholder={""}
                className="relative"
                onClick={() => openLink("/")}
              >
                <HomeIcon className="h-5 w-5" />
              </SpeedDialAction>
              <SpeedDialAction
                placeholder={""}
                className="relative"
                onClick={() => setActiveMenu("right")}
              >
                <CogIcon className="h-5 w-5" />
              </SpeedDialAction>
              <SpeedDialAction
                placeholder={""}
                className="relative"
                onClick={() => setActiveMenu("left")}
              >
                <ListBulletIcon className="h-5 w-5" />
              </SpeedDialAction>
              {isMarketPlace && (
                <>
                  <SpeedDialAction
                    placeholder={""}
                    className="relative"
                    onClick={() => openLink(`${marketplacePathUrl}/cart`)}
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </SpeedDialAction>
                </>
              )}
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>

      <Drawer
        placeholder={""}
        open={activeMenu != "" ? true : false}
        onClose={closeMenu}
        className="p-4 dark:bg-gray-900"
      >
        <div className="mb-6 flex items-center justify-between">
          {activeMenu == "left" && (
            <Typography
              placeholder={""}
              variant="h5"
              color="pink"
              className="pl-8"
            >
              MboaMeet
            </Typography>
          )}

          <IconButton
            placeholder={""}
            variant="text"
            color="blue-gray"
            onClick={() => setActiveMenu("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {activeMenu == "left" && (
          <SideBarMenuComponent>
            <></>
          </SideBarMenuComponent>
        )}

        {activeMenu == "right" && (
          <AsideBarMenuComponent>
            <></>
          </AsideBarMenuComponent>
        )}
      </Drawer>
    </React.Fragment>
  );
}
