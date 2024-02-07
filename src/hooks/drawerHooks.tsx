import {useState, useEffect} from "react";
import {useRouter} from "expo-router";
import {homeRoutes, drawerScreens} from "../routes/homeRoutes";
import {Animated, View, Text} from "react-native";
import {Drawer} from "expo-router/drawer";
import {DrawerItem} from "@react-navigation/drawer";
import {FontAwesome5, FontAwesome} from "@expo/vector-icons";

interface customDrawers {
  title: string;
  routePath: string;
  children: {title: string; path: string; icon?: any}[];
  isDropdownOpen: boolean;
  icon: string;
}

export const useDrawerHooks = () => {
  const [customDrawers, setCustomDrawers] =
    useState<customDrawers[]>(homeRoutes);

  const router = useRouter();

  const handleDropDown = (index: number) => {
    const copyDrawers = [...customDrawers];

    copyDrawers[index].isDropdownOpen = !copyDrawers[index].isDropdownOpen;
    setCustomDrawers(copyDrawers);
  };

  const renderDrawerScreens = () => {
    return drawerScreens.map((drawer, index) => {
      if (drawer.icon) {
        return (
          <Drawer.Screen
            key={index}
            name={drawer.name}
            options={{
              headerTitle: drawer.title,
              drawerLabel: "Home",
              drawerItemStyle: {display: drawer.isVisible ? "flex" : "none"},
              drawerIcon: ({size, color}) => (
                <FontAwesome5 name={drawer.icon} color={color} size={size} />
              ),
              drawerLabelStyle: {fontSize: 18},
            }}
          />
        );
      }
      return (
        <Drawer.Screen
          key={index}
          name={drawer.name}
          options={{
            headerTitle: drawer.title,
            drawerItemStyle: {display: drawer.isVisible ? "flex" : "none"},
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
            key={index}
            label={({color}) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 165,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  {drawerItem.title}
                </Text>
                {drawerItem.isDropdownOpen ? (
                  <FontAwesome
                    name="chevron-up"
                    size={18}
                    color={color}
                    onPress={() => {
                      handleDropDown(index);
                    }}
                  />
                ) : (
                  <FontAwesome
                    name="chevron-down"
                    size={20}
                    color={color}
                    onPress={() => {
                      handleDropDown(index);
                    }}
                  />
                )}
              </View>
            )}
            labelStyle={{fontSize: 18}}
            onPress={() => {
              router.push(drawerItem.routePath);
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
                    key={index}
                    label={drawerItemChild.title}
                    labelStyle={{
                      fontSize: 12,
                    }}
                    onPress={() => {
                      router.push(
                        `${drawerItem.routePath}/${drawerItemChild.path}`
                      );
                    }}
                    icon={() => drawerItemChild.icon}
                    // icon={({size, color}) => (
                    //   <FontAwesome name="adjust" size={size} color={color} />
                    // )}
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
