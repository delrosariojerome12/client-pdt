import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const basePath = "screens/home";

export const homeRoutes = [
  {
    title: "WAREHOUSE MANAGEMENT SYSTEM",
    routePath: `${basePath}/warehouse`,
    children: [
      {
        title: "INBOUND",
        path: "inbound/inbound",
        icon: (
          <MaterialCommunityIcons
            name="home-import-outline"
            size={20}
            color="#808080" // Set color to gray
          />
        ),
      },
      {
        title: "OUTBOUND",
        path: "outbound/outbound",
        icon: (
          <MaterialCommunityIcons
            name="home-export-outline"
            size={20}
            color="#808080" // Set color to gray
          />
        ),
      },
    ],
    isDropdownOpen: false,
    icon: "warehouse",
  },
  {
    title: "TRANSPORT MANAGEMENT SYSTEM",
    routePath: `${basePath}/transport`,
    children: [
      {
        title: "TRANSACTION",
        path: "transaction/transaction",
        icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
      },
    ],
    isDropdownOpen: false,
    icon: "truck",
  },
  {
    title: "INVENTORY MANAGEMENT SYSTEM",
    routePath: `${basePath}/inventoryManagement`,
    children: [
      {
        title: "TRANSACTION",
        path: "transaction/transaction",
        icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "SUBCON",
        path: "subcon/subcon",
        icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "PYHSICAL COUNT",
        path: "physicalCount/physicalCount",
        icon: <MaterialIcons name="checklist-rtl" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "REPLENISHMENT",
        path: "replenishment/replenishment",
        // Set color to gray
        icon: (
          <MaterialCommunityIcons
            name="basket-fill"
            size={20}
            color="#808080"
          />
        ),
      },
    ],
    isDropdownOpen: false,
    icon: "sitemap",
  },
  {
    title: "INVENTORY",
    routePath: `${basePath}/inventory`,
    children: [
      {
        title: "INQUIRY",
        path: "inquiry/inquiry",
        icon: <FontAwesome name="search" size={20} color="#808080" />, // Set color to gray
      },
    ],
    isDropdownOpen: false,
    icon: "shopping-cart",
  },
];

export const drawerScreens = [
  // start warehouse
  {
    name: "index",
    title: "Home",
    isVisible: true,
    icon: "home",
  },
  {
    name: "warehouse/index",
    title: "WMS",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/inbound",
    title: "Inbound",
    isVisible: false,
  },
  {
    name: "warehouse/outbound/outbound",
    title: "Outbound",
    isVisible: false,
  },

  // end warehouse

  // start transport
  {
    name: "transport/index",
    title: "TMS",
    isVisible: false,
  },
  {
    name: "transport/transaction/transaction",
    title: "Transaction",
    isVisible: false,
  },
  // end transport

  // start ims
  {
    name: "inventoryManagement/index",
    title: "IMS",
    isVisible: false,
  },
  {
    name: "inventoryManagement/transaction/transaction",
    title: "Transcation",
    isVisible: false,
  },
  {
    name: "inventoryManagement/subcon/subcon",
    title: "SUBCON",
    isVisible: false,
  },
  {
    name: "inventoryManagement/physicalCount/physicalCount",
    title: "Physical Count",
    isVisible: false,
  },
  {
    name: "inventoryManagement/replenishment/replenishment",
    title: "Replenishment",
    isVisible: false,
  },
  // end ims

  //start inventory
  {
    name: "inventory/index",
    title: "Inventory",
    isVisible: false,
  },
  {
    name: "inventory/inquiry/inquiry",
    title: "Inquiry",
    isVisible: false,
  },

  // end inventory
];
