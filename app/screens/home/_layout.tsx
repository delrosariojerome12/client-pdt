import {View, SafeAreaView} from "react-native";
import React, {useState, useEffect} from "react";
import {Drawer} from "expo-router/drawer";
import {FontAwesome} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {useAuthHooks} from "../../../src/hooks/authHooks";
import {useDrawerHooks} from "../../../src/hooks/drawerHooks";

const CustomDrawers = (props: any) => {
  const {renderCustomDrawers} = useDrawerHooks();

  const {handleLogout} = useAuthHooks();

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {renderCustomDrawers()}
      </DrawerContentScrollView>

      <View>
        <DrawerItem
          label={"Logout"}
          labelStyle={{fontSize: 18}}
          onPress={() => {
            handleLogout();
          }}
          icon={({size, color}) => (
            <FontAwesome name="sign-out" size={size} color={color} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeLayout = () => {
  const {renderDrawerScreens} = useDrawerHooks();

  return (
    <Drawer
      screenOptions={{drawerStyle: {gap: 10}}}
      drawerContent={(props) => <CustomDrawers {...props} />}
    >
      {renderDrawerScreens()}
    </Drawer>
  );
};

export default HomeLayout;
