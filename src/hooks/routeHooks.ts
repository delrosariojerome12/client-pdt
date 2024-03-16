// import {homeRoutes} from "../routes/homeRoutes";
import {useHomeRoutes} from "../routes/homeRoutes";

export const useRouteHooks = (title: string, childTitle?: string) => {
  const {homeRoutes} = useHomeRoutes();
  const getChildRoutes = () => {
    const childRoutes = homeRoutes.filter((route) => {
      if (route.title === title) {
        return route;
      }
    });

    return childRoutes[0];
  };

  const getGrandchildRoutes = () => {
    if (!childTitle) {
      throw new Error("Need child title");
    }
    const filterRoutes = homeRoutes.filter((route) => {
      if (route.title === title) {
        return route;
      }
    });

    const grandChildRoutes = filterRoutes[0].children.filter(
      (item) => childTitle === item.title
    );
    return grandChildRoutes[0];
  };

  const getBasePath = () => {
    const childRoutes = homeRoutes.filter((route) => {
      if (route.title === title) {
        return route;
      }
    });
    return childRoutes[0].routePath;
  };

  return {getChildRoutes, getGrandchildRoutes, getBasePath};
};
