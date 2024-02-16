import React from "react";
import { NonIndexRouteObject } from "react-router-dom";
export interface CustomRouteObject extends NonIndexRouteObject {
  caseSensitive?: boolean;
  children?: CustomRouteObject[];
  element?: React.ReactNode;
  path?: string;
  key?: string;
  title?: string;
  name?: string;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  isMenu?: boolean;
  isLayout?: boolean;
  isRedirect?: boolean;
}

type IUseRoutes = (routerConfig: CustomRouteObject[]) => CustomRouteObject[];

type IFormatMenuData = (
  data?: CustomRouteObject[],
  basePath?: string
) => CustomRouteObject[];
type IFormatRouteData = (data?: CustomRouteObject[]) => CustomRouteObject[];
const formatMenuData: IFormatMenuData = (data, basePath) => {
  if (!(data && data.length > 0)) {
    return [];
  }

  return data
    .map((route) => {
      const path = route.path
        ? `${basePath || ""}/${route.path}`
        : `${basePath || ""}`;

      return {
        ...route,
        path,
        children: formatMenuData(route.children, path),
      };
    })
    .filter((route) => {
      return !route.isRedirect && route.isMenu;
    });
};
const formatRouteList: IFormatRouteData = (data) => {
  if (!(data && data.length > 0)) {
    return [];
  }

  return data.map((route) => {
    if (!route.isLayout) {
      if (route.isRedirect) {
        return {
          ...route,
        };
      }
      const RouteElement = route.element;
      if (!RouteElement) {
        delete route.element;
        return {
          ...route,
          children: formatRouteList(route.children),
        };
      } else {
        return {
          ...route,
          children: formatRouteList(route.children),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          element: RouteElement,
        };
      }
    } else {
      const menuList = formatMenuData(data[0].children);
      const RouteElement = route.element;
      return {
        ...route,
        children: formatRouteList(route.children),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        element: RouteElement,
      };
    }
  });
};

export const useRoute: IUseRoutes = (routerConfig: CustomRouteObject[]) => {
  return formatRouteList(routerConfig);
};
