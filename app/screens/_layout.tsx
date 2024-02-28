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
import {Text} from "react-native";
import {useAppSelector} from "../../src/store/store";
import {format, textFormat} from "../../src/styles/styles";
import {FontAwesome5} from "@expo/vector-icons";

const CustomDrawers = (props: any) => {
  const {
    user: {userDetails},
  } = useAppSelector((state) => state.auth);
  const {renderCustomDrawers} = useDrawerHooks();

  const {handleLogout} = useAuthHooks();

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={format.rowBoxType}>
          <FontAwesome name="user" size={24} color="gray" />
          <Text style={textFormat.boldBigText}>User:</Text>
          <Text style={textFormat.boldBigText}>{userDetails?.usrname}</Text>
        </View>
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
