import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  getPTO,
  getWTO,
  getPUR,
  getWHS,
  getWTOOutboundValid,
  getSRTO,
  getPKValidate,
  getWPTOValid,
} from "../store/actions/warehouse/warehouseActions";
import {
  getCycleCount,
  getSLOCValid,
  getStockTransferValid,
} from "../store/actions/ims/transaction";
import {
  getStockTOPosting,
  getStockTOValid,
} from "../store/actions/ims/replenishment";
import { getphysicalRecord } from "../store/actions/ims/physicalCount";
import { getDTSValid, getDTSPosting } from "../store/actions/ims/subcon";
import { useAppDispatch } from "../store/store";

export interface RouteItem {
  title: string;
  routePath: string;
  children?: RouteItem[];
  isDropdownOpen: boolean;
  icon: string | JSX.Element;
  onLoad?: () => void; // Make onLoad optional
}

const basePath = "screens";

export const useHomeRoutes = () => {
  const dispatch = useAppDispatch();
  const homeRoutes = [
    {
      title: "HOME",
      routePath: `${basePath}`,
      children: [],
      isDropdownOpen: false,
      icon: "home",
    },
    {
      title: "WAREHOUSE MANAGEMENT SYSTEM",
      routePath: `${basePath}/warehouse`,
      children: [
        {
          title: "INBOUND",
          path: "inbound",
          children: [
            {
              title: "PURCHASE TRANSFER ORDER",
              path: "pto",
              onLoad: () => {
                dispatch(getPTO({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "PUTAWAY TO - PUR TRANSFER",
              path: "pur",
              onLoad: () => {
                dispatch(getPUR({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "WAREHOUSE TRANSFER ORDER",
              path: "wto",
              onLoad: () => {
                dispatch(getWTO({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "PUTAWAY TO - WHS TRANSFER",
              path: "whs",
              onLoad: () => {
                dispatch(getWHS({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "SALES RETURN TRANSFER ORDER",
              path: "srto",
              onLoad: () => {
                dispatch(getSRTO({ limit: 10, offset: 0 }));
              },
            },
          ],
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
          path: "outbound",
          children: [
            {
              title: "WAREHOUSE TRANSFER ORDER",
              path: "wto",
              onLoad: () => {
                dispatch(getWTOOutboundValid({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "WAVE PICK LIST",
              path: "wavepick",
              onLoad: () => {
                dispatch(getWPTOValid({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "SINGLE PICK LIST",
              path: "singlepick",
              onLoad: () => {
                dispatch(getPKValidate({ limit: 10, offset: 0 }));
              },
            },
          ],
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
          path: "transaction",
          children: [
            {
              title: "SHIPMENT DOCUMENT",
              path: "shipmentDocument",
            },
          ],
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
          path: "transaction",
          children: [
            {
              title: "CYCLE COUNT",
              path: "cycleCount",
              onLoad: () => {
                dispatch(getCycleCount({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "S.LOC TO S.LOC",
              path: "slocToSloc",
              onLoad: () => {
                dispatch(getSLOCValid({ limit: 10, offset: 0 }));
              },
            },
            {
              title: "STOCK TRANSFER (BIN TO BIN)",
              path: "stockTransfer",
              onLoad: () => {
                dispatch(getStockTransferValid({ limit: 10, offset: 0 }));
              },
            },
          ],
          icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
        },
        {
          title: "SUBCON",
          path: "subcon",
          children: [
            {
              title: "DELIVERY TO SUPPLIER",
              path: "deliveryToSupplier",
              onLoad: () => {
                dispatch(getDTSValid({ limit: 10, offset: 0 }));
              },
            },
          ],
          icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
        },
        {
          title: "PHYSICAL COUNT",
          path: "physicalCount",
          children: [
            {
              title: "PHYSICAL INVENTORY RECORD",
              path: "physicalInventory",
              onLoad: () => {
                dispatch(getphysicalRecord({ limit: 10, offset: 0 }));
              },
            },
          ],
          icon: (
            <MaterialIcons name="checklist-rtl" size={20} color="#808080" />
          ), // Set color to gray
        },
        {
          title: "REPLENISHMENT",
          path: "replenishment",
          children: [
            {
              title: "STOCK REPLENISHMENT TO",
              path: "stockReplenish",
              onLoad: () => {
                dispatch(getStockTOValid({ limit: 10, offset: 0 }));
              },
            },
          ],
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
          path: "inquiry",
          children: [
            {
              title: "BATCH NO.AND BIN LOCATION INQUIRY",
              path: "batchNOandLOC",
            },
          ],
          icon: <FontAwesome name="search" size={20} color="#808080" />, // Set color to gray
        },
      ],
      isDropdownOpen: false,
      icon: "luggage-cart",
    },
  ];
  return { homeRoutes };
};

export const homeRoutes = [
  {
    title: "HOME",
    routePath: `${basePath}`,
    children: [],
    isDropdownOpen: false,
    icon: "home",
  },
  {
    title: "WAREHOUSE MANAGEMENT SYSTEM",
    routePath: `${basePath}/warehouse`,
    children: [
      {
        title: "INBOUND",
        path: "inbound",
        children: [
          {
            title: "PURCHASE TRANSFER ORDER",
            path: "pto",
          },
          {
            title: "PUTAWAY TO - PUR TRANSFER",
            path: "pur",
          },
          {
            title: "WAREHOUSE TRANSFER ORDER",
            path: "wto",
          },
          {
            title: "PUTAWAY TO - WHS TRANSFER",
            path: "whs",
          },
          {
            title: "SALES RETURN TRANSFER ORDER",
            path: "srto",
          },
        ],
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
        path: "outbound",
        children: [
          {
            title: "WAREHOUSE TRANSFER ORDER",
            path: "wto",
          },
          {
            title: "WAVE PICK LIST",
            path: "wavepick",
          },
          {
            title: "SINGLE PICK LIST",
            path: "singlepick",
          },
        ],
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
        path: "transaction",
        children: [
          {
            title: "SHIPMENT DOCUMENT",
            path: "shipmentDocument",
          },
        ],
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
        path: "transaction",
        children: [
          {
            title: "CYCLE COUNT",
            path: "cycleCount",
          },
          {
            title: "S.LOC TO S.LOC",
            path: "slocToSloc",
          },
          {
            title: "STOCK TRANSFER (BIN TO BIN)",
            path: "stockTransfer",
          },
        ],
        icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "SUBCON",
        path: "subcon",
        children: [
          {
            title: "DELIVERY TO SUPPLIER",
            path: "deliveryToSupplier",
          },
        ],
        icon: <FontAwesome5 name="exchange-alt" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "PHYSICAL COUNT",
        path: "physicalCount",
        children: [
          {
            title: "PHYSICAL INVENTORY RECORD",
            path: "physicalInventory",
          },
        ],
        icon: <MaterialIcons name="checklist-rtl" size={20} color="#808080" />, // Set color to gray
      },
      {
        title: "REPLENISHMENT",
        path: "replenishment",
        children: [
          {
            title: "STOCK REPLENISHMENT TO",
            path: "stockReplenish",
          },
        ],
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
        path: "inquiry",
        children: [
          {
            title: "BATCH NO.AND BIN LOCATION INQUIRY",
            path: "batchNOandLOC",
          },
        ],
        icon: <FontAwesome name="search" size={20} color="#808080" />, // Set color to gray
      },
    ],
    isDropdownOpen: false,
    icon: "luggage-cart",
  },
];

// hide all the default screens
export const drawerScreens = [
  {
    name: "home/index",
    title: "",
    isVisible: false,
    icon: "home",
  },
  // start warehouse
  {
    name: "warehouse/index",
    title: "",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/index",
    title: "",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/pto",
    title: "Purchase Transfer Order",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/pur",
    title: "Putaway TO - PUR Transfer",
    isVisible: false,
  },

  {
    name: "warehouse/inbound/wto",
    title: "Warehouse Transfer Order",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/whs",
    title: "Putaway TO - WHS Transfer",
    isVisible: false,
  },
  {
    name: "warehouse/inbound/srto",
    title: "Sales Return Transfer Order",
    isVisible: false,
  },

  {
    name: "warehouse/outbound/index",
    title: "",
    isVisible: false,
  },
  {
    name: "warehouse/outbound/wto",
    title: "Warehouse Transfer Order",
    isVisible: false,
  },
  {
    name: "warehouse/outbound/wavepick",
    title: "Wave Pick List",
    isVisible: false,
  },
  {
    name: "warehouse/outbound/singlepick",
    title: "Single Pick List",
    isVisible: false,
  },
  // end warehouse

  // start transport
  {
    name: "transport/index",
    title: "",
    isVisible: false,
  },
  {
    name: "transport/transaction/index",
    title: "",
    isVisible: false,
  },
  {
    name: "transport/transaction/shipmentDocument",
    title: "Shipment Document",
    isVisible: false,
  },
  // end transport

  // start ims
  {
    name: "inventoryManagement/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventoryManagement/transaction/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventoryManagement/transaction/cycleCount",
    title: "Cycle Count",
    isVisible: false,
  },
  {
    name: "inventoryManagement/transaction/slocToSloc",
    title: "S.LOC to S.LOC",
    isVisible: false,
  },
  {
    name: "inventoryManagement/transaction/stockTransfer",
    title: "Stock Transfer (Bin to Bin)",
    isVisible: false,
  },
  {
    name: "inventoryManagement/subcon/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventoryManagement/subcon/deliveryToSupplier",
    title: "Delivery to Supplier TO",
    isVisible: false,
  },
  {
    name: "inventoryManagement/physicalCount/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventoryManagement/physicalCount/physicalInventory",
    title: "Physical Inventory Record",
    isVisible: false,
  },
  {
    name: "inventoryManagement/replenishment/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventoryManagement/replenishment/stockReplenish",
    title: "Stock Replenishment TO",
    isVisible: false,
  },
  // end ims

  //start inventory
  {
    name: "inventory/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventory/inquiry/index",
    title: "",
    isVisible: false,
  },
  {
    name: "inventory/inquiry/batchNOandLOC",
    title: "BIN Inquiry",
    isVisible: false,
  },

  // end inventory
];
