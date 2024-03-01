import {useState, useEffect} from "react";
import {useRouter} from "expo-router";
import {homeRoutes, drawerScreens} from "../routes/homeRoutes";
import {View, Text, TouchableOpacity} from "react-native";
import {Drawer} from "expo-router/drawer";
import {DrawerItem} from "@react-navigation/drawer";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";
import {useAppSelector, useAppDispatch} from "../store/store";
import {
  handleRemovePreviousRoute,
  handlePreviousRoute,
  handleClearRoutes,
} from "../reducers/routerReducer";

interface customDrawers {
  title: string;
  routePath: string;
  children: {title: string; path: string; icon?: any; children: any[]}[];
  isDropdownOpen: boolean;
  icon: string;
}

export const useDrawerHooks = () => {
  const {previousRoutes} = useAppSelector((state) => state.router);

  const dispatch = useAppDispatch();

  const [customDrawers, setCustomDrawers] =
    useState<customDrawers[]>(homeRoutes);
  const [focusedItem, setFocusedItem] = useState<string>("HOME");

  const router = useRouter();

  const handleDropDown = (index: number) => {
    const copyDrawers = [...customDrawers];
    copyDrawers[index].isDropdownOpen = !copyDrawers[index].isDropdownOpen;
    setCustomDrawers(copyDrawers);
  };

  const renderArrows = (
    drawerItem: customDrawers,
    color: any,
    index: number
  ) => {
    if (drawerItem.children.length > 0) {
      return drawerItem.isDropdownOpen ? (
        <FontAwesome
          name="chevron-up"
          size={24}
          color={color}
          onPress={() => {
            handleDropDown(index);
          }}
        />
      ) : (
        <FontAwesome
          name="chevron-down"
          size={24}
          color={color}
          onPress={() => {
            handleDropDown(index);
          }}
        />
      );
    }
  };

  const renderDrawerScreens = () => {
    return drawerScreens.map((drawer, index) => {
      return (
        <Drawer.Screen
          key={index}
          name={drawer.name}
          options={{
            headerTitle: drawer.title,
            drawerItemStyle: {display: drawer.isVisible ? "flex" : "none"},
            headerRight: () => (
              <View style={{flexDirection: "row", gap: 10, marginRight: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#eee",
                    padding: 10,
                    borderRadius: 50 / 3,
                  }}
                  onPress={() => {
                    console.log(previousRoutes);
                    console.log(previousRoutes.length);

                    if (previousRoutes.length === 1) {
                      dispatch(
                        handleRemovePreviousRoute(
                          previousRoutes[previousRoutes.length - 1]
                        )
                      );
                      router.back();
                    } else {
                      if (previousRoutes.length !== 0) {
                        dispatch(
                          handleRemovePreviousRoute(
                            previousRoutes[previousRoutes.length - 1]
                          )
                        );
                        router.navigate(
                          previousRoutes[previousRoutes.length - 1]
                        );
                      }
                    }
                  }}
                >
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      );
    });
  };

  const renderCustomDrawers = () => {
    return customDrawers.map((drawerItem, index) => {
      return (
        <View key={index} style={{flex: 1}}>
          <DrawerItem
            focused={drawerItem.title === focusedItem ? true : false}
            key={index}
            label={({color}) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 165,
                  alignItems: "center",
                  height: 65,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  {drawerItem.title}
                </Text>
                {renderArrows(drawerItem, color, index)}
              </View>
            )}
            labelStyle={{fontSize: 18}}
            onPress={() => {
              const completeRoute = `${drawerItem.routePath}`;
              const parentPath = completeRoute.substring(
                0,
                completeRoute.lastIndexOf("/")
              );
              router.push(drawerItem.routePath);
              setFocusedItem(drawerItem.title);

              if (drawerItem.title === "HOME") {
                dispatch(handleClearRoutes());
                console.log(drawerItem.title);
                return;
              }
              dispatch(handlePreviousRoute(parentPath));
            }}
            icon={({size, color}) => (
              <FontAwesome5
                name={`${drawerItem.icon}`}
                size={size}
                color={color}
              />
            )}
          />
          <View style={{paddingLeft: 25}}>
            {drawerItem.isDropdownOpen &&
              drawerItem.children.map((drawerItemChild, index) => {
                return (
                  <DrawerItem
                    focused={
                      drawerItemChild.title === focusedItem ? true : false
                    }
                    key={index}
                    label={drawerItemChild.title}
                    labelStyle={{
                      fontSize: 12,
                    }}
                    onPress={() => {
                      const completeRoute = `${drawerItem.routePath}/${drawerItemChild.path}`;

                      const parentPath = completeRoute.substring(
                        0,
                        completeRoute.lastIndexOf("/")
                      );

                      console.log(parentPath);

                      dispatch(handlePreviousRoute("screens/home"));
                      dispatch(handlePreviousRoute(parentPath));

                      setFocusedItem(drawerItemChild.title);
                      router.push(
                        `${drawerItem.routePath}/${drawerItemChild.path}`
                      );
                    }}
                    icon={() => drawerItemChild.icon}
                  />
                );
              })}
          </View>
        </View>
      );
    });
  };

  return {
    customDrawers,
    handleDropDown,
    renderDrawerScreens,
    renderCustomDrawers,
  };
};
