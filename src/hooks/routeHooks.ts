import {homeRoutes} from "../routes/homeRoutes";

export const useRouteHooks = (title: string) => {
  const getProperRoutes = () => {
    const filterRoutes = homeRoutes.filter((route) => {
      if (route.title === title) {
        return route;
      }
    });

    return filterRoutes[0];
  };
  return {getProperRoutes};
};
