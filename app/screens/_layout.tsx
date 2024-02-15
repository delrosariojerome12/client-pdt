import React from "react";
import {Stack} from "expo-router";
import {Drawer} from "expo-router/drawer";
import {useDrawerHooks} from "../../src/hooks/drawerHooks";
import {FontAwesome} from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {useAuthHooks} from "../../src/hooks/authHooks";
import {View, SafeAreaView} from "react-native";

// const ScreenLayout = () => {
//   return (
//     <Stack>
//       <Stack.Screen name="home" options={{headerShown: false}} />
//     </Stack>
//   );
// };

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

const ScreenLayout = () => {
  const {renderDrawerScreens} = useDrawerHooks();

  return (
    <Drawer
      screenOptions={{drawerStyle: {gap: 10}}}
      drawerContent={(props) => <CustomDrawers {...props} />}
    >
      {/* <Drawer.Screen
        name="home/index"
        options={{
          drawerItemStyle: {display: "none"},
          headerTitle: "HOME",
        }}
      /> */}
      {renderDrawerScreens()}
    </Drawer>
  );
};

export default ScreenLayout;
