import {View, Text} from "react-native";
import React, {useMemo} from "react";
import {useRouteHooks} from "../../../../src/hooks/routeHooks";
import HomeNavButtons from "../../../../src/components/forms/buttons/HomeNavButtons";
import {generalStyles} from "../../../../src/styles/styles";

const Outbound = () => {
  const {getGrandchildRoutes, getBasePath} = useRouteHooks(
    "WAREHOUSE MANAGEMENT SYSTEM",
    "OUTBOUND"
  );

  const routes = useMemo(() => {
    return getGrandchildRoutes();
  }, [getGrandchildRoutes]);

  const basePath = useMemo(() => {
    return getBasePath();
  }, [getBasePath]);

  return (
    <View style={generalStyles.wideContainer}>
      {routes?.children?.map((routeItem, index) => {
        let item: {
          title: string;
          path: string;
          onLoad?: () => void;
        } = routeItem as {
          title: string;
          path: string;
          onLoad?: () => void;
        };
        return (
          <HomeNavButtons
            key={index}
            title={item.title}
            routePath={`${basePath}/${routes.path}/${item.path}`}
            onLoad={item.onLoad}
          />
        );
      })}
    </View>
  );
};

export default Outbound;
