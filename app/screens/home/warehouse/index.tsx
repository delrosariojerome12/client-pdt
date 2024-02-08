import {View, Text} from "react-native";
import React, {useMemo} from "react";
import HomeNavButtons from "../../../../src/components/forms/buttons/HomeNavButtons";
import {useRouteHooks} from "../../../../src/hooks/routeHooks";
import {generalStyles} from "../../../../src/styles/styles";

const Warehouse = () => {
  const {getChildRoutes} = useRouteHooks("WAREHOUSE MANAGEMENT SYSTEM");

  const routes = useMemo(() => {
    return getChildRoutes();
  }, [getChildRoutes]);

  return (
    <View style={generalStyles.container}>
      {routes.children.map((item, index) => {
        return (
          <HomeNavButtons
            key={index}
            title={item.title}
            routePath={`${routes.routePath}/${item.path}`}
          />
        );
      })}
    </View>
  );
};

export default Warehouse;
