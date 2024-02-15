import {View, Text} from "react-native";
import React, {useMemo} from "react";
import {useRouteHooks} from "../../../../src/hooks/routeHooks";
import HomeNavButtons from "../../../../src/components/forms/buttons/HomeNavButtons";
import {generalStyles} from "../../../../src/styles/styles";

const Replenishment = () => {
  const {getGrandchildRoutes, getBasePath} = useRouteHooks(
    "INVENTORY MANAGEMENT SYSTEM",
    "REPLENISHMENT"
  );

  const routes = useMemo(() => {
    return getGrandchildRoutes();
  }, [getGrandchildRoutes]);

  const basePath = useMemo(() => {
    return getBasePath();
  }, [getBasePath]);

  return (
    <View style={generalStyles.container}>
      {routes?.children?.map((item, index) => {
        return (
          <HomeNavButtons
            key={index}
            title={item.title}
            routePath={`${basePath}/${routes.path}/${item.path}`}
          />
        );
      })}
    </View>
  );
};

export default Replenishment;
