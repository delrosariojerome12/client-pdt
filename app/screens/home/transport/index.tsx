import {View} from "react-native";
import React, {useMemo} from "react";
import {useRouteHooks} from "../../../../src/hooks/routeHooks";
import {generalStyles} from "../../../../src/styles/styles";
import HomeNavButtons from "../../../../src/components/forms/buttons/HomeNavButtons";

const Transport = () => {
  const {getProperRoutes} = useRouteHooks("TRANSPORT MANAGEMENT SYSTEM");

  const routes = useMemo(() => {
    return getProperRoutes();
  }, [getProperRoutes]);

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

export default Transport;
